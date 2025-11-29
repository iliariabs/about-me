import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ScrollDownIndicator: React.FC = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setShow(false);
      else setShow(true);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          initial={{ y: 10 }}
          animate={{ 
            y: [0, -10, 0]
          }}
          exit={{ 
            opacity: 0,
            y: 20,      
            transition: { duration: 0.4 }
          }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            repeatType: "loop"
          }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50"
          style={{opacity: 1}}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
