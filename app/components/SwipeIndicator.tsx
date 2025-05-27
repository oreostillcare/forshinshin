import React from 'react';
import { motion } from 'framer-motion';

interface SwipeIndicatorProps {
  currentIndex: number;
  totalItems: number;
  onPrev: () => void;
  onNext: () => void;
}

const SwipeIndicator: React.FC<SwipeIndicatorProps> = ({ 
  currentIndex, 
  totalItems, 
  onPrev, 
  onNext 
}) => {  return (
    <motion.div 
      className="flex items-center justify-center space-x-4 absolute left-0 right-0 bottom-0 -mb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <button 
        onClick={onPrev}
        disabled={currentIndex === 0}
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-all duration-300 shadow-sm"
      >
        <span className="text-gray-600 text-sm sm:text-base">←</span>
      </button>
      
      <div className="flex space-x-3">
        {Array(totalItems).fill(0).map((_, index) => (
          <div 
            key={index}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex 
                ? 'bg-pink-400 w-6 sm:w-8 h-2.5 sm:h-3' 
                : 'bg-gray-300 w-2.5 h-2.5'
            }`}
          />
        ))}
      </div>
      
      <button 
        onClick={onNext}
        disabled={currentIndex === totalItems - 1}
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-all duration-300 shadow-sm"
      >
        <span className="text-gray-600 text-sm sm:text-base">→</span>
      </button>
    </motion.div>
  );
};

export default SwipeIndicator;