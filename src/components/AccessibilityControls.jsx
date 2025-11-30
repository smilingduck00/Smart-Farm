import React, { useState, useEffect } from 'react';
import { SettingsIcon } from './Icons';

const AccessibilityControls = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState('normal');
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Load saved preferences
    const savedFontSize = localStorage.getItem('accessibility-font-size') || 'normal';
    const savedHighContrast = localStorage.getItem('accessibility-high-contrast') === 'true';
    const savedReducedMotion = localStorage.getItem('accessibility-reduced-motion') === 'true';

    setFontSize(savedFontSize);
    setHighContrast(savedHighContrast);
    setReducedMotion(savedReducedMotion);

    // Apply preferences
    applyFontSize(savedFontSize);
    applyHighContrast(savedHighContrast);
    applyReducedMotion(savedReducedMotion);
  }, []);

  const applyFontSize = (size) => {
    const root = document.documentElement;
    root.classList.remove('font-small', 'font-normal', 'font-large', 'font-xlarge');
    root.classList.add(`font-${size}`);
    localStorage.setItem('accessibility-font-size', size);
  };

  const applyHighContrast = (enabled) => {
    const root = document.documentElement;
    if (enabled) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    localStorage.setItem('accessibility-high-contrast', enabled.toString());
  };

  const applyReducedMotion = (enabled) => {
    const root = document.documentElement;
    if (enabled) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
    localStorage.setItem('accessibility-reduced-motion', enabled.toString());
  };

  const handleFontSizeChange = (size) => {
    setFontSize(size);
    applyFontSize(size);
  };

  const handleHighContrastToggle = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    applyHighContrast(newValue);
  };

  const handleReducedMotionToggle = () => {
    const newValue = !reducedMotion;
    setReducedMotion(newValue);
    applyReducedMotion(newValue);
  };

  return (
    <>
      {/* Accessibility Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800"
        aria-label="Giriş imkanları parametrləri"
        aria-expanded={isOpen}
        aria-controls="accessibility-panel"
      >
        <SettingsIcon className="w-6 h-6" />
      </button>

      {/* Accessibility Panel */}
      {isOpen && (
        <div
          id="accessibility-panel"
          className="fixed bottom-24 right-6 z-50 w-80 bg-white dark:bg-dark-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-dark-700 p-6"
          role="dialog"
          aria-labelledby="accessibility-title"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 id="accessibility-title" className="text-lg font-bold text-gray-800 dark:text-white">
              Giriş İmkanları
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
            {/* Font Size Control */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Yazı ölçüsü
              </label>
              <div className="flex gap-2">
                {['small', 'normal', 'large', 'xlarge'].map((size) => (
                  <button
                    key={size}
                    onClick={() => handleFontSizeChange(size)}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      fontSize === size
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600'
                    }`}
                    aria-pressed={fontSize === size}
                  >
                    {size === 'small' && 'Kiçik'}
                    {size === 'normal' && 'Normal'}
                    {size === 'large' && 'Böyük'}
                    {size === 'xlarge' && 'Çox böyük'}
                  </button>
                ))}
              </div>
            </div>

            {/* High Contrast Toggle */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Yüksək kontrast
              </label>
              <button
                onClick={handleHighContrastToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  highContrast ? 'bg-primary-600' : 'bg-gray-300 dark:bg-dark-600'
                }`}
                role="switch"
                aria-checked={highContrast}
                aria-label="Yüksək kontrast rejimi"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    highContrast ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Reduced Motion Toggle */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Azaldılmış animasiya
              </label>
              <button
                onClick={handleReducedMotionToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  reducedMotion ? 'bg-primary-600' : 'bg-gray-300 dark:bg-dark-600'
                }`}
                role="switch"
                aria-checked={reducedMotion}
                aria-label="Azaldılmış animasiya rejimi"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    reducedMotion ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccessibilityControls;

