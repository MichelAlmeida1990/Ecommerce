'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ShoppingCart, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SuccessNotificationProps {
  isVisible: boolean;
  onClose: () => void;
  productName: string;
  price: number;
}

export function SuccessNotification({ 
  isVisible, 
  onClose, 
  productName, 
  price 
}: SuccessNotificationProps) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (isVisible) {
      setProgress(100);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            onClose();
            return 0;
          }
          return prev - 2;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Notification */}
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.8 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed top-4 right-4 z-50 max-w-sm w-full"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Progress Bar */}
              <div className="h-1 bg-gray-200 dark:bg-gray-700">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
                  initial={{ width: "100%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.05 }}
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                      Produto adicionado!
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {productName}
                    </p>
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">
                      R$ {price.toFixed(2).replace('.', ',')}
                    </p>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Action Button */}
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={onClose}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-sm font-medium"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Ver Carrinho
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
