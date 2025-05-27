'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'
import { FlipCard } from './components'

// Sample photo URLs - replace with actual photos of ShinShin
const photos = [
  'https://images.unsplash.com/photo-1494790108755-2616c2b6b3a0?w=600&h=800&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=800&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=800&fit=crop&crop=face'
]

const messages = [
  "My dearest ShinShin, you light up my world like no one else ever could. Every moment with you feels like a beautiful dream.",
  "Your smile is my favorite sunrise, and your laugh is my favorite melody. You make everything better just by being you.",
  "In a world full of temporary things, you are my forever. You're not just my love, you're my best friend and soulmate.",
  "Every day I fall in love with you all over again. Thank you for being the most amazing person in my life. Happy Birthday, my love!"
]

const songs = [
  { 
    title: "Be With You", 
    artist: "The Ridleys", 
    spotifyId: "5sGZetzV9JUZCn8WkfgDEf",
    embedUrl: "https://open.spotify.com/embed/track/5sGZetzV9JUZCn8WkfgDEf?utm_source=generator&t=15"
  },
  { 
    title: "The Only Exception", 
    artist: "Paramore", 
    spotifyId: "7JIuqL4ZqkpfGKQhYlrirs",
    embedUrl: "https://open.spotify.com/embed/track/7JIuqL4ZqkpfGKQhYlrirs?utm_source=generator&t=30"
  },
  { 
    title: "Best Part", 
    artist: "Daniel Caesar ft. H.E.R.", 
    spotifyId: "1Q7EgiMOuwDcB0PJC6AzON",
    embedUrl: "https://open.spotify.com/embed/track/1Q7EgiMOuwDcB0PJC6AzON?utm_source=generator&t=45"
  },
  { 
    title: "Picture Perfect", 
    artist: "New Track", 
    spotifyId: "3z6XUommYDWPHeFhmhhT6j",
    embedUrl: "https://open.spotify.com/embed/track/3z6XUommYDWPHeFhmhhT6j?utm_source=generator&t=20"
  }
]

const secretSong = {
  title: "A Day Without You", 
  artist: "Special Track", 
  spotifyId: "42CX3VhPsCG75BFp07r9Vj",
  embedUrl: "https://open.spotify.com/embed/track/42CX3VhPsCG75BFp07r9Vj?utm_source=generator"
}

export default function Home() {
  const [currentView, setCurrentView] = useState<'landing' | 'slider' | 'secret'>('landing')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [currentSong, setCurrentSong] = useState(0)
  const [heartTrails, setHeartTrails] = useState<Array<{id: number, x: number, y: number, size: number}>>([])

  // Timer for showing modal after 5 seconds on the last image
  useEffect(() => {
    if (currentView === 'slider' && currentImageIndex === photos.length - 1) {
      const timer = setTimeout(() => {
        setShowModal(true)
      }, 5000) // Show modal after 5 seconds

      return () => clearTimeout(timer)
    }
  }, [currentView, currentImageIndex])

  // Sync music with picture changes
  useEffect(() => {
    if (currentView === 'slider') {
      setCurrentSong(currentImageIndex)
    }
  }, [currentImageIndex, currentView])

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left' && currentImageIndex < photos.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
    } else if (direction === 'right' && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1)
    }
  }

  // Sakura Petals Component - Renders globally to prevent reset
  const SakuraPetals = () => (
    <div className="sakura-container">
      <div className="petal petal-1"></div>
      <div className="petal petal-2"></div>
      <div className="petal petal-3"></div>
      <div className="petal petal-4"></div>
      <div className="petal petal-5"></div>
      <div className="petal petal-6"></div>
      <div className="petal petal-7"></div>
      <div className="petal petal-8"></div>
      <div className="petal petal-9"></div>
      <div className="petal petal-10"></div>
    </div>
  );

  const FloatingHearts = () => {
    // Enhanced heart sizes and visibility
    const largeHeartSizes = [85, 71, 99, 87, 76, 83, 81, 104];
    const largeHeartPositions = [
      { left: "78%", top: "30%" }, { left: "90%", top: "34%" },
      { left: "26%", top: "94%" }, { left: "9%", top: "57%" },
      { left: "79%", top: "1%" }, { left: "20%", top: "48%" },
      { left: "33%", top: "40%" }, { left: "49%", top: "10%" }
    ];
    const largeHeartDelays = [7, 1, 15, 16, 12, 3, 11, 8];
    const largeHeartDurations = [32, 25, 24, 27, 31, 23, 25, 31];
    
    const mediumHeartSizes = [32, 36, 28, 29, 27, 34, 35, 23, 43, 25, 27, 38, 27, 39, 44];
    const mediumHeartPositions = [
      { left: "5%", top: "37%" }, { left: "30%", top: "80%" },
      { left: "57%", top: "58%" }, { left: "18%", top: "97%" },
      { left: "86%", top: "7%" }, { left: "20%", top: "16%" },
      { left: "39%", top: "22%" }, { left: "71%", top: "6%" },
      { left: "97%", top: "62%" }, { left: "57%", top: "72%" },
      { left: "63%", top: "47%" }, { left: "93%", top: "82%" },
      { left: "65%", top: "87%" }, { left: "70%", top: "99%" },
      { left: "29%", top: "89%" }
    ];
    const mediumHeartDelays = [5, 2, 7, 4, 2, 9, 11, 1, 7, 4, 5, 6, 1, 8, 1];
    const mediumHeartDurations = [14, 11, 15, 12, 11, 12, 10, 16, 15, 17, 13, 12, 11, 12, 14];
    
    const smallHeartSizes = [20, 22, 19, 21, 19, 15, 22, 13, 18, 17, 13, 12];
    const smallHeartPositions = [
      { left: "93%", top: "26%" }, { left: "12%", top: "68%" },
      { left: "96%", top: "86%" }, { left: "99%", top: "12%" },
      { left: "25%", top: "98%" }, { left: "36%", top: "17%" },
      { left: "3%", top: "21%" }, { left: "63%", top: "24%" },
      { left: "21%", top: "51%" }, { left: "6%", top: "72%" },
      { left: "46%", top: "16%" }, { left: "31%", top: "50%" }
    ];
    const smallHeartDelays = [2, 1, 0, 3, 3, 4, 14, 11, 6, 8, 2, 5];
    const smallHeartDurations = [9, 10, 10, 12, 10, 9, 11, 9, 11, 11, 10, 8];
    
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Large background hearts - more visible */}
        {largeHeartSizes.map((size, i) => (
          <Heart
            key={`large-${i}`}
            className="absolute text-rose-200/35 floating-hearts-large"
            size={size}
            style={{
              left: largeHeartPositions[i].left,
              top: largeHeartPositions[i].top,
              animationDelay: `${largeHeartDelays[i]}s`,
              animationDuration: `${largeHeartDurations[i]}s`
            }}
          />
        ))}
        {/* Medium floating hearts - more visible */}
        {mediumHeartSizes.map((size, i) => (
          <Heart
            key={`medium-${i}`}
            className="absolute text-pink-300/50 floating-hearts"
            size={size}
            style={{
              left: mediumHeartPositions[i].left,
              top: mediumHeartPositions[i].top,
              animationDelay: `${mediumHeartDelays[i]}s`,
              animationDuration: `${mediumHeartDurations[i]}s`
            }}
          />
        ))}
        {/* Small sparkle hearts - more visible */}
        {smallHeartSizes.map((size, i) => (
          <Heart
            key={`small-${i}`}
            className="absolute text-rose-300/55 floating-hearts-sparkle"
            size={size}
            style={{
              left: smallHeartPositions[i].left,
              top: smallHeartPositions[i].top,
              animationDelay: `${smallHeartDelays[i]}s`,
              animationDuration: `${smallHeartDurations[i]}s`
            }}
          />
        ))}
      </div>
    )
  }  // Music Control Toast with Spotify Embed - Better positioned to avoid overlap
  const MusicToast = () => (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 xl:bottom-10 xl:right-10 z-40 pointer-events-auto"
    >
      <div className="spotify-player-wrapper relative">
        <div className="absolute -inset-2 bg-white/25 backdrop-blur-lg rounded-3xl z-0 shadow-xl"></div>
        <div className="relative z-10 rounded-2xl overflow-hidden border border-white/50">
          <iframe
            src={songs[currentSong].embedUrl}
            width="280"
            height="80"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="relative z-10"
            style={{ borderRadius: '12px' }}
          />
        </div>
      </div>
    </motion.div>
  )

  // Create heart trail effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (Math.random() > 0.9 && currentView === 'landing') {
      const newHeart = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        size: 10 + Math.random() * 10
      };
      
      setHeartTrails(prev => [...prev, newHeart]);
      
      setTimeout(() => {
        setHeartTrails(prev => prev.filter(heart => heart.id !== newHeart.id));
      }, 1000);
    }
  };
  // Modal Component for final message - Improved design
  const FinalModal = () => (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[100] p-4 sm:p-6"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
            className="bg-gradient-to-br from-white/95 via-pink-50/90 to-rose-50/95 backdrop-blur-md rounded-3xl p-8 sm:p-10 max-w-sm sm:max-w-md w-full text-center shadow-2xl border border-pink-200/40 relative overflow-hidden"
          >
            {/* Enhanced decorative elements */}
            <div className="absolute top-5 left-5 w-4 h-4 bg-pink-300 rounded-full opacity-60"></div>
            <div className="absolute top-8 right-8 w-3 h-3 bg-rose-400 rounded-full opacity-50"></div>
            <div className="absolute bottom-8 left-8 w-3.5 h-3.5 bg-purple-300 rounded-full opacity-40"></div>
            
            {/* Floating hearts decoration with improved animation */}
            <motion.div
              animate={{ 
                y: [-5, 5, -5],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-4 right-6"
            >
              <Heart className="w-5 h-5 text-pink-400/70" />
            </motion.div>
            
            <motion.div
              animate={{ 
                y: [5, -5, 5],
                rotate: [0, -3, 3, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute bottom-6 right-10"
            >
              <Heart className="w-4 h-4 text-rose-400/60" />
            </motion.div>

            <motion.h3
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-2xl sm:text-3xl font-medium text-gray-800 mb-4 sm:mb-5 tracking-wide"
            >
              One more thing...
            </motion.h3>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-10 leading-relaxed px-2"
            >
              There's something special I want to share with you, my dear <span className="text-rose-600 font-medium">ShinShin</span> ✨
            </motion.p>
            
            <motion.button
              initial={{ y: 30, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: "spring", duration: 0.7 }}
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                boxShadow: "0 10px 30px rgba(255, 105, 180, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowModal(false)
                setCurrentView('secret')
              }}
              className="group relative px-8 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl font-medium tracking-wide text-white bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 rounded-2xl shadow-xl transition-all duration-300 overflow-hidden border border-white/20"
            >
              <span className="relative z-10 flex items-center justify-center space-x-3">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Show me! 💕</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
  // Render Sakura Petals globally
  return (
    <div className="relative h-screen overflow-hidden">
      <SakuraPetals />
        {currentView === 'landing' && (
        <div 
          className="h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center relative overflow-hidden"
          onMouseMove={handleMouseMove}
        >
          {/* Enhanced background decorative elements */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,182,193,0.15),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(255,105,180,0.1),transparent_60%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,192,203,0.1),transparent_40%)]"></div>
          <div className="absolute inset-0 audio-bg-blend"></div>
          
          <FloatingHearts />
          
          {/* Main content centered properly */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-center z-10 max-w-5xl mx-auto relative"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-6 sm:mb-8"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-br from-rose-400 via-pink-400 to-purple-400 rounded-full flex items-center justify-center shadow-xl mb-4 sm:mb-6">
                <Heart className="text-white" size={24} />
              </div>
              <div className="w-20 sm:w-24 h-0.5 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto rounded-full"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mb-8 sm:mb-12"
            >
              <h1 className="text-3xl md:text-5xl xl:text-6xl font-extralight text-gray-800 mb-2 sm:mb-4 tracking-wider leading-tight">
                Happy 20th
              </h1>              <h2 className="text-5xl md:text-7xl xl:text-8xl font-light text-transparent bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 bg-clip-text mb-6 sm:mb-8 tracking-wide">
                My ShinShin
              </h2>
              <motion.p 
                className="text-base sm:text-lg md:text-xl text-gray-600 font-light tracking-wide max-w-2xl mx-auto leading-relaxed px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                A special collection of memories and love letters, 
                <br className="hidden sm:block" />
                created just for you on your beautiful day
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="mb-8 sm:mb-12"
            >              <button 
                onClick={() => setCurrentView('slider')}
                className="group relative px-6 sm:px-8 py-3 sm:py-4 text-base md:text-lg font-medium tracking-wide text-white bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 rounded-xl shadow-lg hover:shadow-pink-300/30 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] overflow-hidden"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <span>Begin Your Journey</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-rose-400 via-pink-500 to-rose-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 1 }}
              className="flex items-center justify-center space-x-8"
            >
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-rose-300 rounded-full"></div>
              <div className="flex space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={i}
                    className="w-2 h-2 bg-rose-300 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  />
                ))}
              </div>
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-rose-300 rounded-full"></div>
            </motion.div>
          </motion.div>

          {/* Heart trails */}
          {heartTrails.map(heart => (
            <motion.div
              key={heart.id}
              className="absolute"
              style={{
                left: heart.x,
                top: heart.y,
                width: heart.size,
                height: heart.size,
                opacity: 0.8,
                pointerEvents: 'none'
              }}
              initial={{ y: 0, scale: 1 }}
              animate={{ y: -30, scale: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <Heart className="w-full h-full text-pink-400/70 animate-pulse" />
            </motion.div>
          ))}
        </div>
      )}      {currentView === 'slider' && (
        <div className="h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-100 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,182,193,0.15),transparent_60%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,105,180,0.1),transparent_60%)]"></div>
          <div className="absolute inset-0 audio-bg-blend"></div>
          <FloatingHearts />
          <FinalModal />
            <div className="max-w-xl w-full text-center px-3 sm:px-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
            <motion.div 
              className="flex flex-col items-center justify-center w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2 
                className="text-xl sm:text-2xl font-light text-gray-700 mb-4 sm:mb-6 tracking-wide"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Our Beautiful Memories
              </motion.h2>
              
              <motion.p
                className="text-sm sm:text-base text-gray-500 font-light mb-8"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}              >
                Tap card to flip • Swipe to navigate
              </motion.p>                <div className="card-container mx-auto mb-4">
                <FlipCard 
                  photo={photos[currentImageIndex]}
                  message={messages[currentImageIndex]}
                  imageIndex={currentImageIndex}
                  totalImages={photos.length}
                  onSwipe={handleSwipe}
                />
              </div>{/* Navigation Indicators - Better positioned with no spacing */}              <motion.div 
                className="flex items-center justify-center space-x-4 mt-2 mb-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <button 
                  onClick={() => handleSwipe('right')}
                  disabled={currentImageIndex === 0}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-all duration-300 shadow-sm"
                >
                  <span className="text-gray-600 text-sm sm:text-base">←</span>
                </button>
                
                <div className="flex space-x-3">
                  {photos.map((_, index) => (
                    <div 
                      key={index}
                      className={`transition-all duration-300 rounded-full ${
                        index === currentImageIndex 
                          ? 'bg-pink-400 w-6 sm:w-8 h-2.5 sm:h-3' 
                          : 'bg-gray-300 w-2.5 h-2.5'
                      }`}
                    />
                  ))}
                </div>
                
                <button 
                  onClick={() => handleSwipe('left')}
                  disabled={currentImageIndex === photos.length - 1}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-all duration-300 shadow-sm"
                >
                  <span className="text-gray-600 text-sm sm:text-base">→</span>
                </button>
              </motion.div>
              
              <motion.div 
                className="mt-2 text-gray-500 text-sm font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <p>{currentImageIndex + 1} of {photos.length}</p>
              </motion.div>
            </motion.div>
          </div>
            {/* Music toast positioned in lower right - Better responsive positioning */}
          <MusicToast />
        </div>
      )}      {currentView === 'secret' && (
        <div 
          className="h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-100 flex items-center justify-center relative overflow-hidden"
          onMouseMove={handleMouseMove}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,182,193,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 audio-bg-blend"></div>
          <FloatingHearts />          {/* Music toast for the secret message - Better positioned to avoid overlap */}          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 xl:bottom-10 xl:right-10 z-40 pointer-events-auto"
          >
            <div className="spotify-player-wrapper relative">
              <div className="absolute -inset-2 bg-white/25 backdrop-blur-lg rounded-3xl z-0 shadow-xl"></div>
              <div className="relative z-10 rounded-2xl overflow-hidden border border-white/50">
                <iframe
                  src={secretSong.embedUrl}
                  width="280"
                  height="80"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="relative z-10"
                  style={{ borderRadius: '12px' }}
                />
              </div>
            </div>
          </motion.div>{/* Secret message content - Better responsive layout */}          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl w-full text-center px-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 xl:p-12 shadow-2xl border border-white/50 max-h-[80vh] overflow-y-auto"
            >
              <motion.h2 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-800 mb-6 sm:mb-8 lg:mb-10 xl:mb-12 tracking-wide"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                My Dearest <span className="text-rose-600">ShinShin</span>
              </motion.h2>
              <motion.div 
                className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-700 leading-relaxed font-light space-y-3 sm:space-y-4 lg:space-y-5 xl:space-y-6 text-left max-w-2xl xl:max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p>
                  On this special day, I want you to know that you are the most incredible person I've ever met. 
                  Your kindness, your beauty, your laugh, your dreams — everything about you makes my world brighter.
                </p>
                <p>
                  You're not just my girlfriend, you're my best friend, my inspiration, and my greatest blessing. 
                  I love how you make the ordinary moments extraordinary, how you believe in me even when I don't believe in myself.
                </p>
                <p>
                  I can't imagine a day without you in my life. You are my sunshine, my comfort, and my home.
                </p>
                <p className="text-rose-600 font-medium">
                  Happy Birthday, my beautiful ShinShin. Here's to many more birthdays together, creating memories that will last forever.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-6 sm:mt-8 lg:mt-10 xl:mt-12"
              >
                <button 
                  onClick={() => setCurrentView('landing')}
                  className="group relative px-6 sm:px-8 lg:px-10 xl:px-12 py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-light tracking-wider text-gray-700 border border-gray-300 hover:border-rose-400 transition-all duration-500 overflow-hidden bg-white/70 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span className="relative z-10">Happy birthday again baby, I love you so much ❤️</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-100 to-pink-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
