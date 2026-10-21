import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import navbarLogo from './Navbarlogodark.png';

const easeCurve = [0.76, 0, 0.24, 1] as const;

export const Preloader: React.FC = () => {
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFinished(true);
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  if (isFinished) return null;

  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none flex select-none overflow-hidden"
      aria-hidden="true"
    >
      {[0, 1, 2, 3].map((index) => (
        <motion.div
          key={index}
          initial={{ y: '0%' }}
          animate={{ y: '-100%' }}
          transition={{
            duration: 0.95,
            delay: 0.15 + index * 0.12,
            ease: easeCurve,
          }}
          className="w-1/4 h-full bg-black relative shrink-0"
        />
      ))}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 1, rotate: 0, scale: 1 }}
          animate={{ opacity: 0, rotate: 90, scale: 0.92 }}
          transition={{ duration: 0.55, delay: 0.22, ease: [0.5, 0, 0, 1] }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center pointer-events-none"
        >
          <div className="w-16 h-16 flex items-center justify-center">
            <img
              src={navbarLogo}
              alt="Roow"
              className="h-14 sm:h-16 w-auto object-contain"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
