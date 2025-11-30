import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { SpeakerIcon, SpeakerMutedIcon, PlayIcon, PauseIcon, StopIcon } from './Icons';

const ScreenReader = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);
  const [voice, setVoice] = useState(null);
  const [voices, setVoices] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  
  const synthRef = useRef(null);
  const utteranceRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
      
      // Load voices
      const loadVoices = () => {
        const availableVoices = synthRef.current.getVoices();
        setVoices(availableVoices);
        
        // Try to find Azerbaijani or Turkish voice, otherwise use default
        const preferredVoice = availableVoices.find(
          v => v.lang.includes('az') || v.lang.includes('tr') || v.lang.includes('en')
        ) || availableVoices[0];
        
        if (preferredVoice) {
          setVoice(preferredVoice);
        }
      };

      loadVoices();
      
      // Some browsers load voices asynchronously
      if (synthRef.current.onvoiceschanged !== undefined) {
        synthRef.current.onvoiceschanged = loadVoices;
      }

      // Load saved preferences
      const savedRate = parseFloat(localStorage.getItem('screen-reader-rate')) || 1;
      const savedPitch = parseFloat(localStorage.getItem('screen-reader-pitch')) || 1;
      const savedVolume = parseFloat(localStorage.getItem('screen-reader-volume')) || 1;
      const savedEnabled = localStorage.getItem('screen-reader-enabled') === 'true';
      
      setRate(savedRate);
      setPitch(savedPitch);
      setVolume(savedVolume);
      setIsEnabled(savedEnabled);
    } else {
      // Browser doesn't support speech synthesis
      setAnnouncements(prev => [...prev, {
        id: Date.now(),
        message: 'Brauzeriniz səs sintezi dəstəkləmir',
        type: 'error'
      }]);
    }

    return () => {
      // Cleanup on unmount
      if (synthRef.current && synthRef.current.speaking) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Announce page changes
  useEffect(() => {
    if (isEnabled && synthRef.current) {
      const pageName = getPageName(location.pathname);
      announce(`Səhifə dəyişdi: ${pageName}`);
    }
  }, [location.pathname, isEnabled]);

  const getPageName = (pathname) => {
    const pageNames = {
      '/': 'Ana Səhifə',
      '/services': 'Xidmətlər',
      '/ai-assistant': 'AI Köməkçi',
      '/weather': 'Hava',
      '/market': 'Bazar',
      '/grants': 'Qrantlar',
      '/training': 'Təlimlər',
      '/contact': 'Əlaqə',
      '/giris': 'Giriş',
      '/qeydiyyat': 'Qeydiyyat',
      '/alici/bazar': 'Fermer Bazarı'
    };
    return pageNames[pathname] || 'Naməlum səhifə';
  };

  const speak = (text, options = {}) => {
    if (!synthRef.current || !isEnabled) return;

    // Cancel any ongoing speech
    if (synthRef.current.speaking) {
      synthRef.current.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set voice properties
    utterance.rate = options.rate || rate;
    utterance.pitch = options.pitch || pitch;
    utterance.volume = options.volume || volume;
    utterance.lang = voice?.lang || 'az-AZ';
    
    if (voice) {
      utterance.voice = voice;
    }

    // Event handlers
    utterance.onstart = () => {
      setIsReading(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsReading(false);
      setIsPaused(false);
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsReading(false);
      setIsPaused(false);
      announce('Səs oxumasında xəta baş verdi', 'error');
    };

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
  };

  const announce = (message, type = 'info') => {
    if (!isEnabled && type !== 'error') return;
    
    const announcementId = Date.now();
    setAnnouncements(prev => [...prev, {
      id: announcementId,
      message,
      type
    }]);

    // Remove announcement after 5 seconds
    setTimeout(() => {
      setAnnouncements(prev => prev.filter(a => a.id !== announcementId));
    }, 5000);

    if (isEnabled) {
      speak(message);
    }
  };

  const readPageContent = () => {
    if (!isEnabled) {
      announce('Ekran oxuyucusu aktiv deyil. Zəhmət olmasa, əvvəlcə aktivləşdirin.', 'error');
      return;
    }

    // Get main content
    const mainContent = document.querySelector('main');
    if (!mainContent) {
      announce('Səhifə məzmunu tapılmadı', 'error');
      return;
    }

    // Extract text content (remove script and style tags)
    const textContent = mainContent.innerText || mainContent.textContent || '';
    const cleanText = textContent
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 5000); // Limit to 5000 characters

    if (cleanText.length === 0) {
      announce('Oxunacaq məzmun tapılmadı', 'error');
      return;
    }

    speak(cleanText);
  };

  const readSelectedText = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (selectedText.length === 0) {
      announce('Heç bir mətn seçilməyib', 'error');
      return;
    }

    speak(selectedText);
  };

  const pauseReading = () => {
    if (synthRef.current && synthRef.current.speaking && !synthRef.current.paused) {
      synthRef.current.pause();
      setIsPaused(true);
    }
  };

  const resumeReading = () => {
    if (synthRef.current && synthRef.current.paused) {
      synthRef.current.resume();
      setIsPaused(false);
    }
  };

  const stopReading = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsReading(false);
      setIsPaused(false);
    }
  };

  const toggleScreenReader = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    localStorage.setItem('screen-reader-enabled', newState.toString());
    
    if (newState) {
      // Use a temporary state to announce
      setTimeout(() => {
        speak('Ekran oxuyucusu aktivləşdirildi');
      }, 100);
    } else {
      stopReading();
    }
  };

  const handleRateChange = (newRate) => {
    setRate(newRate);
    localStorage.setItem('screen-reader-rate', newRate.toString());
    if (isReading) {
      stopReading();
      // Resume with new rate if there was active reading
    }
  };

  const handlePitchChange = (newPitch) => {
    setPitch(newPitch);
    localStorage.setItem('screen-reader-pitch', newPitch.toString());
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    localStorage.setItem('screen-reader-volume', newVolume.toString());
  };

  const handleVoiceChange = (voiceName) => {
    const selectedVoice = voices.find(v => v.name === voiceName);
    if (selectedVoice) {
      setVoice(selectedVoice);
      localStorage.setItem('screen-reader-voice', voiceName);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Alt + S to toggle screen reader
      if (e.altKey && e.key === 's') {
        e.preventDefault();
        toggleScreenReader();
      }
      
      // Alt + R to read page (when enabled)
      if (isEnabled && e.altKey && e.key === 'r') {
        e.preventDefault();
        readPageContent();
      }
      
      // Alt + Space to pause/resume
      if (isEnabled && e.altKey && e.key === ' ') {
        e.preventDefault();
        if (isPaused) {
          resumeReading();
        } else if (isReading) {
          pauseReading();
        }
      }
      
      // Alt + X to stop
      if (isEnabled && e.altKey && e.key === 'x') {
        e.preventDefault();
        stopReading();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isEnabled, isReading, isPaused]);

  if (!('speechSynthesis' in window)) {
    return null; // Don't show component if browser doesn't support it
  }

  return (
    <>
      {/* Screen Reader Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-32 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800 ${
          isEnabled
            ? 'bg-primary-600 hover:bg-primary-700 text-white'
            : 'bg-gray-500 hover:bg-gray-600 text-white'
        }`}
        aria-label={isEnabled ? 'Ekran oxuyucusu aktiv' : 'Ekran oxuyucusu deaktiv'}
        aria-expanded={isOpen}
        aria-controls="screen-reader-panel"
        title="Ekran Oxuyucusu (Alt+S)"
      >
        {isEnabled ? (
          <SpeakerIcon className="w-6 h-6" />
        ) : (
          <SpeakerMutedIcon className="w-6 h-6" />
        )}
        {isReading && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
        )}
      </button>

      {/* Screen Reader Panel */}
      {isOpen && (
        <div
          id="screen-reader-panel"
          className="fixed bottom-48 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-white dark:bg-dark-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-dark-700 p-6 max-h-[70vh] overflow-y-auto"
          role="dialog"
          aria-labelledby="screen-reader-title"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 id="screen-reader-title" className="text-lg font-bold text-gray-800 dark:text-white">
              Ekran Oxuyucusu
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Paneli bağla"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            {/* Enable/Disable Toggle */}
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
              <div>
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">
                  Ekran Oxuyucusu
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Alt+S ilə aktivləşdirin/deaktivləşdirin
                </p>
              </div>
              <button
                onClick={toggleScreenReader}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isEnabled ? 'bg-primary-600' : 'bg-gray-300 dark:bg-dark-600'
                }`}
                role="switch"
                aria-checked={isEnabled}
                aria-label="Ekran oxuyucusunu aktivləşdir"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {isEnabled && (
              <>
                {/* Control Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={readPageContent}
                    className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors text-sm"
                    aria-label="Səhifəni oxu (Alt+R)"
                  >
                    <PlayIcon className="w-4 h-4 inline mr-2" />
                    Səhifəni Oxu
                  </button>
                  <button
                    onClick={readSelectedText}
                    className="flex-1 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors text-sm"
                    aria-label="Seçilmiş mətni oxu"
                  >
                    Seçilmişi Oxu
                  </button>
                </div>

                <div className="flex gap-2">
                  {isReading && !isPaused ? (
                    <button
                      onClick={pauseReading}
                      className="flex-1 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors text-sm"
                      aria-label="Duraklat (Alt+Space)"
                    >
                      <PauseIcon className="w-4 h-4 inline mr-2" />
                      Duraklat
                    </button>
                  ) : isPaused ? (
                    <button
                      onClick={resumeReading}
                      className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors text-sm"
                      aria-label="Davam et (Alt+Space)"
                    >
                      <PlayIcon className="w-4 h-4 inline mr-2" />
                      Davam Et
                    </button>
                  ) : null}
                  
                  {isReading && (
                    <button
                      onClick={stopReading}
                      className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors text-sm"
                      aria-label="Dayandır (Alt+X)"
                    >
                      <StopIcon className="w-4 h-4 inline mr-2" />
                      Dayandır
                    </button>
                  )}
                </div>

                {/* Voice Selection */}
                {voices.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Səs
                    </label>
                    <select
                      value={voice?.name || ''}
                      onChange={(e) => handleVoiceChange(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-700 text-gray-800 dark:text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      {voices.map((v) => (
                        <option key={v.name} value={v.name}>
                          {v.name} ({v.lang})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Rate Control */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Sürət: {rate.toFixed(1)}x
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={rate}
                    onChange={(e) => handleRateChange(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-dark-600 rounded-lg appearance-none cursor-pointer accent-primary-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>0.5x</span>
                    <span>1.0x</span>
                    <span>2.0x</span>
                  </div>
                </div>

                {/* Pitch Control */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Ton: {pitch.toFixed(1)}
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={pitch}
                    onChange={(e) => handlePitchChange(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-dark-600 rounded-lg appearance-none cursor-pointer accent-primary-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>Aşağı</span>
                    <span>Normal</span>
                    <span>Yüksək</span>
                  </div>
                </div>

                {/* Volume Control */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Səs Səviyyəsi: {Math.round(volume * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-dark-600 rounded-lg appearance-none cursor-pointer accent-primary-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Keyboard Shortcuts Info */}
                <div className="p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Klaviatura Qısayolları:
                  </p>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Alt+S: Aktivləşdir/Deaktivləşdir</li>
                    <li>• Alt+R: Səhifəni oxu</li>
                    <li>• Alt+Space: Duraklat/Davam et</li>
                    <li>• Alt+X: Dayandır</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Announcements */}
      {announcements.length > 0 && (
        <div className="fixed top-20 right-6 z-50 space-y-2">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className={`px-4 py-2 rounded-lg shadow-lg text-sm text-white ${
                announcement.type === 'error' ? 'bg-red-500' : 'bg-primary-600'
              }`}
              role="status"
              aria-live="polite"
            >
              {announcement.message}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ScreenReader;

