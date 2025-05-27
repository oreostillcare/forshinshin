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
      <div className="text-xs sm:text-sm text-gray-500 text-center mb-2 sm:mb-3">
        {isFlipped ? '✨ Message visible ✨' : '📸 Photo visible'}
      </div>
        <div className="perspective-1000 relative w-full max-w-[260px] xs:max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px] xl:max-w-[450px] h-[18rem] xs:h-[20rem] sm:h-[22rem] md:h-[24rem] lg:h-[26rem] xl:h-[28rem] mx-auto flip-card-container" style={{ margin: '0 auto' }}>
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
          className={`flip-card w-full h-full relative cursor-pointer select-none ${isClicking ? 'scale-[0.98]' : 'scale-100'} transition-transform duration-300 touch-manipulation`}
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
        >
          {/* Front - Photo */}
          <div 
            className="flip-card-front absolute inset-0 rounded-lg xs:rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden border-2 xs:border-2 sm:border-3 lg:border-4 border-white shadow-lg xs:shadow-xl sm:shadow-2xl bg-white"
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-2 xs:bottom-3 sm:bottom-4 lg:bottom-6 left-2 xs:left-3 sm:left-4 lg:left-6 right-2 xs:right-3 sm:right-4 lg:right-6">
              <motion.div 
                className="bg-black/20 backdrop-blur-sm rounded-full px-2 xs:px-2.5 sm:px-3 lg:px-4 py-1 xs:py-1 sm:py-1.5 lg:py-2 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-white text-[10px] xs:text-xs sm:text-sm font-light opacity-90 mb-0.5 xs:mb-0.5 sm:mb-1 lg:mb-2">
                  💕 Tap to read message
                </p>
                <div className="w-4 xs:w-6 sm:w-8 lg:w-12 h-0.5 xs:h-0.5 sm:h-0.5 lg:h-1 bg-white/60 rounded-full mx-auto pulse-love"></div>
              </motion.div>
            </div>
            <div className="absolute top-2 xs:top-3 sm:top-4 lg:top-6 right-2 xs:right-3 sm:right-4 lg:right-6">
              <div className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-rose-400 rounded-full animate-pulse shadow-lg"></div>
            </div>
          </div>          {/* Back - Message */}
          <div 
            className="flip-card-back absolute inset-0 rounded-lg xs:rounded-xl sm:rounded-2xl lg:rounded-3xl border-2 xs:border-2 sm:border-3 lg:border-4 border-white shadow-lg xs:shadow-xl sm:shadow-2xl flex items-center justify-center p-3 xs:p-4 sm:p-6 lg:p-8 xl:p-10 bg-gradient-to-br from-white via-rose-50/50 to-pink-50/30"
            style={{ 
              transform: 'rotateY(180deg)', 
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
          >
            <div className="text-center space-y-2 xs:space-y-3 sm:space-y-4 lg:space-y-6 w-full">
              <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full mx-auto flex items-center justify-center mb-3 xs:mb-4 sm:mb-6 lg:mb-8 shadow-lg">
                <Heart className="text-white" size={typeof window !== 'undefined' && window.innerWidth < 640 ? 14 : typeof window !== 'undefined' && window.innerWidth < 1024 ? 16 : 18} />
              </div>
              <AnimatePresence mode="wait">
                <motion.p 
                  key={`message-${imageIndex}`}
                  className="text-gray-800 text-xs xs:text-sm sm:text-base lg:text-lg leading-relaxed font-light tracking-wide px-1 xs:px-2 sm:px-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {message}
                </motion.p>
              </AnimatePresence>
              <motion.p 
                className="text-gray-500 text-[10px] xs:text-xs sm:text-sm font-light mt-3 xs:mt-4 sm:mt-6 lg:mt-8 bg-white/60 backdrop-blur-sm rounded-full px-2 xs:px-3 sm:px-4 lg:px-6 py-1 xs:py-1 sm:py-1.5 lg:py-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {imageIndex < totalImages - 1 ? '← Swipe for next →' : '← Swipe for surprise →'}
              </motion.p>
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
