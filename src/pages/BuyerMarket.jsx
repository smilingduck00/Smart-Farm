import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { MarketIcon, LeafIcon, StarIcon } from '../components/Icons';
import { useAuth } from '../context/AuthContext';
import { getFarmers } from '../database/database';

const farmers = getFarmers();

const BuyerMarket = () => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const storageKey = useMemo(() => (user ? `sf_cart_${user.email}` : null), [user]);

  useEffect(() => {
    if (!storageKey) return;
    try {
      const raw = localStorage.getItem(storageKey);
      setCart(raw ? JSON.parse(raw) : []);
    } catch (error) {
      console.warn('Kart məlumatı oxunmadı', error);
    }
  }, [storageKey]);

  useEffect(() => {
    if (!storageKey) return;
    localStorage.setItem(storageKey, JSON.stringify(cart));
  }, [cart, storageKey]);

  const addToCart = (product, farmer) => {
    setCart((prev) => {
      const existsIndex = prev.findIndex((item) => item.id === product.id);
      if (existsIndex >= 0) {
        const updated = [...prev];
        updated[existsIndex] = {
          ...updated[existsIndex],
          quantity: updated[existsIndex].quantity + 1,
        };
        return updated;
      }
      return [
        ...prev,
        {
          ...product,
          farmer,
          quantity: 1,
        },
      ];
    });
  };

  const updateQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-earth-50/80 to-white dark:from-dark-900 dark:to-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-earth-100 text-earth-700 text-sm font-medium mb-4">
            <MarketIcon className="w-4 h-4 mr-2" />
            Fermer bazarı
          </span>
          <h1 className="text-4xl font-display font-bold text-gray-800 dark:text-white mb-4">
            Etibarlı fermerlərdən <span className="text-earth-600">birbaşa alış</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Azərbaycanın müxtəlif bölgələrindən seçilmiş fermerlərin məhsullarını görün, qiymətləri müqayisə
            edin və səbətinizə əlavə edin.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {farmers.map((farmer, index) => (
              <motion.div
                key={farmer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{farmer.name}</h2>
                    <p className="text-sm text-gray-500">{farmer.region}</p>
                    <div className="flex items-center mt-2 space-x-3 text-sm text-gray-600 dark:text-gray-300">
                      <span className="flex items-center">
                        <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                        {farmer.rating}
                      </span>
                      <span>{farmer.delivery}</span>
                    </div>
                  </div>
                  <span className="px-4 py-1.5 rounded-full text-sm bg-earth-50 text-earth-700 font-medium">
                    {farmer.badge}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {farmer.products.map((product) => (
                    <div key={product.id} className="border border-gray-100 dark:border-dark-700 rounded-2xl p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{product.name}</h3>
                        <p className="text-sm text-gray-500">Qiymət: {product.price.toFixed(2)} ₼ / {product.unit}</p>
                        <p className="text-xs text-gray-400 mt-2">Fermer: {farmer.name}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => addToCart(product, farmer.name)}
                        className="mt-4 btn-secondary"
                      >
                        Səbətə əlavə et
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="card p-6 sticky top-28">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Səbətim</h2>
                <LeafIcon className="w-5 h-5 text-earth-600" />
              </div>

              {cart.length === 0 ? (
                <p className="text-sm text-gray-500">Səbətiniz hazırda boşdur.</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="border border-gray-100 dark:border-dark-700 rounded-2xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-800 dark:text-white">{item.name}</h3>
                          <p className="text-xs text-gray-500">{item.farmer}</p>
                          <p className="text-sm text-gray-600">
                            {item.price.toFixed(2)} ₼ / {item.unit}
                          </p>
                        </div>
                        <button
                          type="button"
                          className="text-sm text-red-500 hover:text-red-600"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Sil
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-3">
                          <button
                            type="button"
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            -
                          </button>
                          <span className="text-sm font-semibold">{item.quantity}</span>
                          <button
                            type="button"
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            +
                          </button>
                        </div>
                        <span className="text-sm font-semibold text-gray-800 dark:text-white">
                          {(item.price * item.quantity).toFixed(2)} ₼
                        </span>
                      </div>
                    </div>
                  ))}

                  <div className="border-t border-dashed border-gray-200 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Cəmi</span>
                      <span className="text-xl font-semibold text-gray-900 dark:text-white">
                        {cartTotal.toFixed(2)} ₼
                      </span>
                    </div>
                    <button type="button" className="btn-primary w-full mt-4">
                      Sifarişi təsdiqlə
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerMarket;

