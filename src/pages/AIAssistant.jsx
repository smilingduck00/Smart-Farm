import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  AIIcon, 
  SendIcon, 
  LeafIcon,
  SunIcon,
  DropIcon,
  WheatIcon,
  ChartIcon,
  InfoIcon,
  ImageIcon,
  UploadIcon
} from '../components/Icons';
import { askAI, askAIImage } from '../services/aiClient';

const AIAssistant = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' or 'image'
  
  // Chat state
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: t('aiAssistant.initialMessage'),
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);
  const abortControllerRef = useRef(null);
  const latestMessagesRef = useRef(messages);

  // Image scan state
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(null);
  const fileInputRef = useRef(null);
  const imageAbortControllerRef = useRef(null);

  const quickQuestions = [
    { icon: LeafIcon, text: t('aiAssistant.quickQuestions.diseases') },
    { icon: SunIcon, text: t('aiAssistant.quickQuestions.weather') },
    { icon: DropIcon, text: t('aiAssistant.quickQuestions.irrigation') },
    { icon: WheatIcon, text: t('aiAssistant.quickQuestions.seasonal') },
    { icon: ChartIcon, text: t('aiAssistant.quickQuestions.productivity') },
  ];

  const scrollToBottom = useCallback(() => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [messages, scrollToBottom]);

  useEffect(() => {
    latestMessagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (imageAbortControllerRef.current) {
        imageAbortControllerRef.current.abort();
      }
    };
  }, []);

  const buildPrompt = useCallback((conversation) => {
    // Sistem mesajını daha detaylı ve bağlam koruyan şekilde oluştur
    const systemMessage = {
      role: 'system',
      content: `Sən EcoGrow platformasının AI köməkçisisən. 

Əsas vəzifələrin:
- İstifadəçilərin suallarına düzgün, məntiqi və faydalı cavablar vermək
- Yalnız kənd təsərrüfatı, fermerlik, aqro texnologiyalar, hava, bazar məlumatları mövzularında kömək etmək
- İstifadəçinin sualını düzgün başa düşmək və ona uyğun cavab vermək
- Konuşma geçmişini dikkate alarak bağlamı korumak
- Əgər sual aydın deyilsə, aydınlaşdırmaq istəmək
- Qeyri-müəyyən və ya uyğunsuz cavablar verməmək

Cavabların xüsusiyyətləri:
- Azərbaycan dilində
- Qısa, dəqiq və praktik
- Məntiqi və ardıcıl
- İstifadəçinin sualına birbaşa cavab
- Konuşma geçmişindeki bilgileri kullanarak bağlamı koru

Vacib: İstifadəçinin sualını düzgün oxu, konuşma geçmişini dikkate al və ona uyğun cavab ver. Əgər sual aydın deyilsə, aydınlaşdırmaq istə.`,
    };

    // Konuşma geçmişini düzgün formatla - sadece son mesajları değil, tüm geçmişi gönder
    const conversationMessages = conversation.map((message) => ({
      role: message.type === 'user' ? 'user' : 'assistant',
      content: message.content,
    }));

    return [systemMessage, ...conversationMessages];
  }, []);

  const sendMessage = useCallback(
    async (messageText) => {
      const trimmed = messageText.trim();
      if (!trimmed || isTyping) return;

      const userMessage = {
        id: Date.now(),
        type: 'user',
        content: trimmed,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputValue('');
      setIsTyping(true);
      setError(null);

      if (inputRef.current) {
        inputRef.current.focus();
      }

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        // Tüm konuşma geçmişini al (başlangıç mesajı dahil)
        const conversation = [...latestMessagesRef.current, userMessage];
        // Sistem mesajı dahil tüm mesajları gönder
        const promptMessages = buildPrompt(conversation);
        
        console.log('Sending messages to AI:', promptMessages.length, 'messages');
        
        const aiContent = await askAI({
          messages: promptMessages,
          signal: controller.signal,
        });

        const aiResponse = {
          id: Date.now() + 1,
          type: 'bot',
          content: aiContent,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiResponse]);
      } catch (err) {
        if (err.name === 'AbortError') return;

        setError(err.message);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 2,
            type: 'bot',
            content: 'Üzr istəyirəm, hazırda cavab verə bilmədim. ' + err.message,
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    },
    [isTyping, buildPrompt]
  );

  const handleSend = useCallback(() => {
    sendMessage(inputValue);
  }, [inputValue, sendMessage]);

  const handleQuickQuestion = useCallback((question) => {
    sendMessage(question);
  }, [sendMessage]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  // Image scan handlers
  const handleImageSelect = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setImageError('Zəhmət olmasa şəkil faylı seçin.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setImageError('Şəkil ölçüsü 10MB-dan böyük ola bilməz.');
      return;
    }

    setSelectedImage(file);
    setImageError(null);
    setResponse(null);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleRemoveImage = useCallback(() => {
    setSelectedImage(null);
    setImagePreview(null);
    setResponse(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const handleImageSubmit = useCallback(async () => {
    if (!selectedImage) {
      setImageError('Zəhmət olmasa şəkil yükləyin.');
      return;
    }

    if (!question.trim()) {
      setImageError('Zəhmət olmasa sualınızı yazın.');
      return;
    }

    setIsLoading(true);
    setImageError(null);
    setResponse(null);

    if (imageAbortControllerRef.current) {
      imageAbortControllerRef.current.abort();
    }

    const controller = new AbortController();
    imageAbortControllerRef.current = controller;

    try {
      const answer = await askAIImage({
        image: selectedImage,
        question: question.trim(),
        signal: controller.signal,
      });

      setResponse(answer);
    } catch (err) {
      if (err.name === 'AbortError') return;
      setImageError(err.message || 'Xəta baş verdi. Zəhmət olmasa yenidən sınayın.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedImage, question]);

  const handleImageKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleImageSubmit();
    }
  }, [handleImageSubmit]);

  return (
    <div className="min-h-screen pt-16 lg:pt-20 pb-4 lg:pb-8">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-8 h-[calc(100vh-5rem)] lg:h-[calc(100vh-7rem)]">
        <div className="bg-white/80 dark:bg-dark-800/80 backdrop-blur-lg rounded-2xl lg:rounded-3xl shadow-xl border border-white/50 dark:border-dark-700/50 h-full flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 lg:p-6 border-b border-gray-100 dark:border-dark-700 flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3 lg:space-x-4">
                <div className="w-10 h-10 lg:w-14 lg:h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                  <AIIcon className="w-5 h-5 lg:w-8 lg:h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-base lg:text-xl font-display font-bold text-gray-800 dark:text-white">
                    AI Köməkçi
                  </h1>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">Aktiv</span>
                  </div>
                </div>
              </div>
              
              <div className="hidden sm:flex items-center space-x-2 text-xs lg:text-sm text-gray-500 dark:text-gray-400">
                <InfoIcon className="w-3 h-3 lg:w-4 lg:h-4" />
                <span>AI köməkçi və şəkil analizi</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                  activeTab === 'chat'
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                    : 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600'
                }`}
              >
                Sual-Cavab
              </button>
              <button
                onClick={() => setActiveTab('image')}
                className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                  activeTab === 'image'
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                    : 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600'
                }`}
              >
                Şəkil Analizi
              </button>
            </div>
          </div>

          {/* Chat Tab Content */}
          {activeTab === 'chat' && (
            <>
              {/* Messages Area */}
              <div 
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4 lg:space-y-6 scroll-smooth"
              >
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 lg:space-x-3 max-w-[90%] lg:max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      {message.type === 'bot' && (
                        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0">
                          <AIIcon className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                        </div>
                      )}
                      
                      <div className={`rounded-2xl p-3 lg:p-4 ${
                        message.type === 'user' 
                          ? 'bg-primary-600 text-white rounded-tr-sm' 
                          : 'bg-gray-100 dark:bg-dark-700 text-gray-800 dark:text-gray-100 rounded-tl-sm'
                      }`}>
                        <div className="text-xs lg:text-sm leading-relaxed whitespace-pre-wrap">
                          {message.content}
                        </div>
                        <div className={`text-[10px] lg:text-xs mt-2 ${message.type === 'user' ? 'text-primary-200' : 'text-gray-400 dark:text-gray-500'}`}>
                          {message.timestamp.toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start space-x-2 lg:space-x-3"
                  >
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg lg:rounded-xl flex items-center justify-center">
                      <AIIcon className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                    </div>
                    <div className="bg-gray-100 dark:bg-dark-700 rounded-2xl rounded-tl-sm p-3 lg:p-4">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Quick Questions */}
              <div className="px-3 lg:px-6 py-2 lg:py-3 border-t border-gray-100 dark:border-dark-700 flex-shrink-0 bg-white/50 dark:bg-dark-800/50">
                <div className="flex flex-wrap gap-1.5 lg:gap-2">
                  {quickQuestions.map((q, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(q.text)}
                      disabled={isTyping}
                      className="inline-flex items-center px-2 py-1 lg:px-3 lg:py-1.5 bg-gray-100 dark:bg-dark-700 hover:bg-primary-100 dark:hover:bg-primary-900/30 text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 rounded-lg text-[10px] lg:text-sm transition-colors duration-200 disabled:opacity-50"
                    >
                      <q.icon className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                      {q.text}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="p-3 lg:p-4 border-t border-gray-100 dark:border-dark-700 bg-gray-50/50 dark:bg-dark-900/50 flex-shrink-0">
                <div className="flex items-end space-x-2 lg:space-x-3">
                  <div className="flex-1">
                    {error && (
                      <p className="text-sm text-red-500 mb-2">
                        {error}
                      </p>
                    )}
                    <textarea
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Sualınızı yazın..."
                      rows={1}
                      disabled={isTyping}
                      className="w-full px-3 py-2 lg:px-4 lg:py-3 rounded-xl border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 outline-none resize-none disabled:opacity-50 text-sm lg:text-base"
                      style={{ minHeight: '42px', maxHeight: '100px' }}
                    />
                  </div>
                  <button
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isTyping}
                    className="p-2 lg:p-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex-shrink-0"
                  >
                    <SendIcon className="w-5 h-5 lg:w-6 lg:h-6" />
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Image Scan Tab Content */}
          {activeTab === 'image' && (
            <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4 lg:space-y-6">
              {/* Image Upload Section */}
              <div className="space-y-3 lg:space-y-4">
                <label className="block text-sm lg:text-base font-semibold text-gray-700 dark:text-gray-300">
                  Şəkil Yükləyin
                </label>
                
                {!imagePreview ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 dark:border-dark-600 rounded-xl p-8 lg:p-12 text-center cursor-pointer hover:border-primary-500 dark:hover:border-primary-500 transition-colors duration-300 bg-gray-50 dark:bg-dark-900/50"
                  >
                    <UploadIcon className="w-12 h-12 lg:w-16 lg:h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                    <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 mb-2">
                      Şəkil faylını buraya sürükləyin və ya klikləyin
                    </p>
                    <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-500">
                      PNG, JPG, WEBP (maksimum 10MB)
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="relative">
                    <div className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-dark-600">
                      <img
                        src={imagePreview}
                        alt="Yüklənmiş şəkil"
                        className="w-full h-auto max-h-96 object-contain"
                      />
                      <button
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg"
                        aria-label="Şəkli sil"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-3 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                    >
                      Başqa şəkil seç
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                  </div>
                )}
              </div>

              {/* Question Input Section */}
              <div className="space-y-3 lg:space-y-4">
                <label className="block text-sm lg:text-base font-semibold text-gray-700 dark:text-gray-300">
                  Sualınızı yazın
                </label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={handleImageKeyDown}
                  placeholder="Məsələn: Bu bitkidə hansı xəstəlik var? Bu məhsulun keyfiyyəti necədir?"
                  rows={4}
                  disabled={isLoading || !selectedImage}
                  className="w-full px-3 py-2 lg:px-4 lg:py-3 rounded-xl border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 outline-none resize-none disabled:opacity-50 text-sm lg:text-base"
                />
              </div>

              {/* Error Display */}
              {imageError && (
                <div className="p-3 lg:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                  <p className="text-sm lg:text-base text-red-600 dark:text-red-400">{imageError}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleImageSubmit}
                disabled={!selectedImage || !question.trim() || isLoading}
                className="w-full p-3 lg:p-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2 text-sm lg:text-base"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analiz edilir...</span>
                  </>
                ) : (
                  <>
                    <AIIcon className="w-5 h-5 lg:w-6 lg:h-6" />
                    <span>Analiz Et</span>
                    <SendIcon className="w-5 h-5 lg:w-6 lg:h-6" />
                  </>
                )}
              </button>

              {/* Response Section */}
              {response && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 lg:p-6 bg-gradient-to-br from-primary-50 to-sky-50 dark:from-primary-900/20 dark:to-sky-900/20 rounded-xl border border-primary-200 dark:border-primary-800"
                >
                  <div className="flex items-start space-x-3 lg:space-x-4">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0">
                      <AIIcon className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm lg:text-base font-semibold text-gray-800 dark:text-white mb-2">
                        AI Analiz Nəticəsi
                      </h3>
                      <div className="text-sm lg:text-base text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {response}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(AIAssistant);

