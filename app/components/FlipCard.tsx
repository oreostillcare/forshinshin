'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'

interface FlipCardProps {
  photo: string;
  message: string;
  imageIndex: number;
  totalImages: number;
  onSwipe: (direction: 'left' | 'right') => void;
}

export default function FlipCard({ photo, message, imageIndex, totalImages, onSwipe }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [startX, setStartX] = useState<number | null>(null);
  const [startY, setStartY] = useState<number | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const [heartBursts, setHeartBursts] = useState<Array<{id: number, x: number, y: number, size: number, delay: number}>>([]);

  useEffect(() => {
    // Reset flip state when image changes
    setIsFlipped(false);
  }, [photo]);

  // Handle heart burst effect
  useEffect(() => {
    if (isFlipped) {
      // Create burst of hearts when card flips
      setShowHeartBurst(true);
      
      // Generate a set of hearts with different positions and sizes
      const newHearts = Array.from({ length: 7 }, (_, i) => ({
        id: i,
        x: 50 + (Math.sin(i / 3 * Math.PI) * 40), // position in percentage
        y: 50 + (Math.cos(i / 3 * Math.PI) * 40), 
        size: 15 + (i * 2),
        delay: i * 0.1
      }));
      
      setHeartBursts(newHearts);
      
      // Hide hearts after animation completes
      const timer = setTimeout(() => {
        setShowHeartBurst(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isFlipped]);

  const handleCardClick = () => {
    if (!isSwiping) {
      setIsClicking(true);
      setIsFlipped(!isFlipped);
      setTimeout(() => setIsClicking(false), 200);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
    setIsSwiping(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startX === null || startY === null) return;
    
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = Math.abs(startX - currentX);
    const diffY = Math.abs(startY - currentY);
    
    // If horizontal movement is greater than vertical, it's a swipe
    if (diffX > diffY && diffX > 10) {
      setIsSwiping(true);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (startX === null) return;
    
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;
    
    if (Math.abs(diffX) > 50) { // Minimum swipe distance
      setIsSwiping(true);
      if (diffX > 0) {
        onSwipe('left'); // Swipe left
      } else {
        onSwipe('right'); // Swipe right
      }
    }
    
    setStartX(null);
    setStartY(null);
    // Reset swiping state after a short delay
    setTimeout(() => setIsSwiping(false), 100);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX);
    setIsSwiping(false);
  };
  const handleMouseUp = (e: React.MouseEvent) => {
    if (startX === null) return;
    
    const endX = e.clientX;
    const diffX = startX - endX;
    
    if (Math.abs(diffX) > 50) { // Minimum swipe distance
      setIsSwiping(true);
      if (diffX > 0) {
        onSwipe('left'); // Swipe left
      } else {
        onSwipe('right'); // Swipe right
      }
    }
    
    setStartX(null);
    // Reset swiping state after a short delay
    setTimeout(() => setIsSwiping(false), 100);
  };

  // Handle mouse move for tilt effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || isSwiping || isFlipped) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate tilt based on mouse position relative to card center
    // Limit tilt to small values for subtle effect
    const maxTilt = 5;
    const tiltX = ((e.clientY - centerY) / (rect.height / 2)) * maxTilt;
    const tiltY = -((e.clientX - centerX) / (rect.width / 2)) * maxTilt;
    
    setTilt({ x: tiltX, y: tiltY });
  };
  
  // Reset tilt when mouse leaves
  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };  return (
    <div className="w-full">
      <div className="text-xs sm:text-sm text-gray-500 text-center mb-3 sm:mb-4 bg-white/40 backdrop-blur-sm rounded-full py-1 px-3 inline-block">
        {isFlipped ? '✨ Message visible ✨' : '📸 Photo visible'}
      </div>
        <div className="perspective-1000 relative w-full max-w-[280px] xs:max-w-[300px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[420px] xl:max-w-[450px] h-[20rem] xs:h-[22rem] sm:h-[24rem] md:h-[26rem] lg:h-[28rem] xl:h-[28rem] mx-auto flip-card-container">
        <div
          ref={cardRef}
          onClick={handleCardClick}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`flip-card w-full h-full relative cursor-pointer select-none ${isClicking ? 'scale-[0.98]' : 'scale-100'} transition-transform duration-300 touch-manipulation shadow-2xl`}
          style={{
            transformStyle: 'preserve-3d',
            WebkitTransformStyle: 'preserve-3d',
            transform: isFlipped 
              ? 'rotateY(180deg)' 
              : `rotateY(0deg) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: isFlipped 
              ? 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)' 
              : 'transform 0.3s ease-out'
          }}
        >          {/* Front - Photo - Improved design */}
          <div 
            className="flip-card-front absolute inset-0 rounded-2xl overflow-hidden border-[3px] border-white shadow-2xl bg-white"
            style={{ 
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={`photo-${photo}`}
                src={photo}
                alt={`Photo ${imageIndex + 1}`}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent" />
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
              <motion.div 
                className="bg-black/30 backdrop-blur-md rounded-xl px-4 py-2.5 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-white text-xs sm:text-sm font-normal opacity-95 mb-1.5">
                  💕 Tap to read message
                </p>
                <div className="w-10 sm:w-16 h-0.5 sm:h-1 bg-white/80 rounded-full mx-auto pulse-love"></div>
              </motion.div>
            </div>
            <div className="absolute top-4 right-4">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-rose-400 rounded-full animate-pulse shadow-lg"></div>
            </div>
          </div>          {/* Back - Message - Improved design */}
          <div 
            className="flip-card-back absolute inset-0 rounded-2xl border-[3px] border-white shadow-2xl flex items-center justify-center p-6 sm:p-8 bg-gradient-to-br from-white via-rose-50/70 to-pink-50/50"
            style={{ 
              transform: 'rotateY(180deg)', 
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
          >
            <div className="text-center space-y-4 sm:space-y-6 w-full">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full mx-auto flex items-center justify-center mb-5 sm:mb-8 shadow-xl">
                <Heart className="text-white" size={typeof window !== 'undefined' && window.innerWidth < 640 ? 16 : 20} />
              </div>
              <AnimatePresence mode="wait">
                <motion.p 
                  key={`message-${imageIndex}`}
                  className="text-gray-800 text-sm sm:text-base md:text-lg leading-relaxed font-normal tracking-wide px-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {message}
                </motion.p>
              </AnimatePresence>
              <motion.div 
                className="text-gray-600 text-xs sm:text-sm font-medium mt-6 sm:mt-8 bg-white/70 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-md mx-auto inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {imageIndex < totalImages - 1 ? '← Swipe for next →' : '← Swipe for surprise →'}
              </motion.div>
            </div>
          </div>

          {/* Heart burst effect */}
          {showHeartBurst && heartBursts.map(heart => (
            <Heart 
              key={heart.id}
              className="heart-burst text-rose-400/70"
              size={heart.size}
              style={{
                left: `${heart.x}%`,
                top: `${heart.y}%`,
                animationDelay: `${heart.delay}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
