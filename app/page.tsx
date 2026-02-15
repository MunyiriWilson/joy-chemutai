"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function Home() {
  const [screen, setScreen] = useState<
    "intro" | "memory" | "envelope" | "proposal"
  >("intro");

  const [page, setPage] = useState(0);
  const [letterOpen, setLetterOpen] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showMusicPrompt, setShowMusicPrompt] = useState(true);

  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [yesScale, setYesScale] = useState(1);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // NOW 5 MEMORY PAGES - added 2 more!
  const memories = [
    {
      image: "Joyrono.jpeg",
      text: "One of the most unreal days of myb life...Seeing you again after so long felt so unreal but I enjoyed EVERY single second we spent together. PS: I let you win bowling that day lmao",
    },
    {
      image: "Joyrono2.jpeg",
      text: "First of all I LOVE this picture!!Anyways meet Joy, the most beautiful girl I know and have ever met. Her smile lights my days. I love love love and enjoy all the facetimes and the laughs we share. (Not that much though innit)  ",
    },
    {
      image: "Joyrono3.jpeg",
      text: "Care to explain this picture LMAOOOOOOOOO!!!!",
    },
  {
      image: "Joyrono4.jpeg",
      text: "December 25, 2021 : We had the first ever video call after a LONG time. I saw the same smile that illuminated my world back in 2018-19. 'Do not take a screenshot' you said, but I still did. Womp Womp! "
    },
    {
      image: "Joyrono5.jpeg",
      text: "Goofy human....! I love how you are unapologetically yourself. ",
    },
    
  ];

  // YOUR STICKER PHOTOS - perfectly positioned around the edges of the screen
  const stickerPhotos = [
    { 
      id: 1, 
      image: "/Joyrono4.jpeg",
      rotation: -8, 
      top: "8%", 
      left: "5%", 
      size: "w-28 h-28" 
    },
    { 
      id: 2, 
      image: "/Joyrono5.jpeg",
      rotation: 12, 
      top: "3%", 
      right: "6%", 
      size: "w-24 h-24" 
    },
    { 
      id: 3, 
      image: "/Joyrono6.jpeg",
      rotation: 5, 
      top: "15%", 
      right: "15%", 
      size: "w-20 h-20" 
    },
    { 
      id: 4, 
      image: "/Joyrono7.jpeg",
      rotation: -12, 
      bottom: "8%", 
      left: "4%", 
      size: "w-32 h-32" 
    },
    { 
      id: 5, 
      image: "/Joyrono8.jpeg",
      rotation: 15, 
      bottom: "3%", 
      right: "5%", 
      size: "w-24 h-24" 
    },
    { 
      id: 6, 
      image: "/Joyrono9.jpeg",
      rotation: -6, 
      bottom: "20%", 
      left: "12%", 
      size: "w-20 h-20" 
    },
    { 
      id: 7, 
      image: "/Joyrono14.jpeg",
      rotation: 10, 
      top: "22%", 
      left: "12%", 
      size: "w-24 h-24" 
    },
    { 
      id: 8, 
      image: "/Joyrono11.jpeg",
      rotation: -10, 
      bottom: "18%", 
      right: "8%", 
      size: "w-28 h-28" 
    },
    { 
      id: 9, 
      image: "/Joyrono12.jpeg",
      rotation: 20, 
      top: "28%", 
      right: "20%", 
      size: "w-16 h-16" 
    },
    { 
      id: 10, 
      image: "/Joyrono13.jpeg",
      rotation: -15, 
      bottom: "28%", 
      left: "18%", 
      size: "w-16 h-16" 
    },
  ];

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio("/love.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
    setShowMusicPrompt(false);
  };

  const attemptAutoPlay = () => {
    if (audioRef.current && !isMusicPlaying) {
      audioRef.current.play().catch(() => {
        setShowMusicPrompt(true);
      });
    }
  };

  function nextPage() {
    if (page < memories.length - 1) {
      setPage(page + 1);
    } else {
      setScreen("envelope");
    }
  }

  function prevPage() {
    if (page > 0) setPage(page - 1);
  }

  function handleYes() {
    setAccepted(true);

    confetti({
      particleCount: 300,
      spread: 120,
      origin: { y: 0.6 },
      colors: ['#9b8cff', '#c4b8ff', '#e6ddff', '#ffffff'],
    });
  }

  function moveNoButton() {
    setNoPosition({
      x: Math.random() * 200 - 100,
      y: Math.random() * 120 - 60,
    });

    setYesScale((prev) => prev + 0.1);
  }

  const paper = "bg-white shadow-2xl rounded-lg border border-[#e6ddff] relative";
  const scrapbookBg = "min-h-screen flex items-center justify-center bg-[#f5f0ff] relative overflow-hidden";

  // Purple Hearts Decoration Component
  const PurpleHearts = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Floating purple hearts all over */}
      <span className="absolute top-5 left-[10%] text-2xl opacity-20 animate-pulse">💜</span>
      <span className="absolute top-15 right-[15%] text-3xl opacity-20 animate-pulse delay-100">💜</span>
      <span className="absolute top-1/4 left-[5%] text-xl opacity-15 animate-pulse delay-200">💜</span>
      <span className="absolute top-1/3 right-[8%] text-2xl opacity-20 animate-pulse delay-300">💜</span>
      <span className="absolute top-1/2 left-[12%] text-3xl opacity-15 animate-pulse delay-150">💜</span>
      <span className="absolute top-2/3 right-[12%] text-xl opacity-20 animate-pulse delay-250">💜</span>
      <span className="absolute top-3/4 left-[8%] text-2xl opacity-15 animate-pulse delay-75">💜</span>
      <span className="absolute bottom-10 right-[10%] text-3xl opacity-20 animate-pulse delay-125">💜</span>
      <span className="absolute bottom-20 left-[15%] text-xl opacity-15 animate-pulse delay-175">💜</span>
      <span className="absolute bottom-5 right-[20%] text-2xl opacity-20 animate-pulse delay-225">💜</span>
      <span className="absolute top-10 right-[25%] text-xl opacity-15 animate-pulse delay-275">💜</span>
      <span className="absolute bottom-15 left-[20%] text-3xl opacity-20 animate-pulse delay-325">💜</span>
      <span className="absolute top-40 left-[30%] text-2xl opacity-15 animate-pulse delay-375">💜</span>
      <span className="absolute bottom-40 right-[30%] text-xl opacity-20 animate-pulse delay-425">💜</span>
    </div>
  );

  return (
    <main className={scrapbookBg}>
      {/* Purple Hearts on EVERY page */}
      <PurpleHearts />
      
      {/* Music Control */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        onClick={toggleMusic}
        className="fixed top-5 right-5 z-50 w-12 h-12 bg-white rounded-full shadow-lg border-2 border-[#e6ddff] flex items-center justify-center hover:scale-110 transition-all"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-2xl">
          {isMusicPlaying ? '🔊' : '🔈'}
        </span>
      </motion.button>

      {/* Music Permission Prompt */}
      <AnimatePresence>
        {showMusicPrompt && screen === "intro" && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-white p-4 rounded-2xl shadow-2xl border-2 border-[#e6ddff]"
          >
            <p className="text-[#7c6cff] mb-3">🎵 Would you like some music?</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={toggleMusic}
                className="px-4 py-2 bg-[#7c6cff] text-white rounded-full text-sm hover:bg-[#6a5ad9]"
              >
                Yes, play music
              </button>
              <button
                onClick={() => setShowMusicPrompt(false)}
                className="px-4 py-2 bg-[#e6ddff] text-[#7c6cff] rounded-full text-sm hover:bg-[#d6ccff]"
              >
                No thanks
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* INTRO WITH STICKERS */}
      {screen === "intro" && (
        <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
          {/* Sticker Photos */}
          {stickerPhotos.map((sticker) => (
            <motion.div
              key={sticker.id}
              className={`absolute ${sticker.size}`}
              style={{
                top: sticker.top,
                bottom: sticker.bottom,
                left: sticker.left,
                right: sticker.right,
                transform: `rotate(${sticker.rotation}deg)`,
                filter: 'drop-shadow(0 12px 16px rgba(124, 108, 255, 0.2))',
                zIndex: 10,
              }}
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                delay: sticker.id * 0.08,
                type: "spring",
                damping: 12
              }}
              whileHover={{ 
                scale: 1.15, 
                rotate: sticker.rotation + 8,
                zIndex: 30,
                transition: { duration: 0.2 }
              }}
            >
              <div className="bg-white p-2 rounded-xl shadow-xl border-2 border-[#e6ddff] w-full h-full">
                <div className="w-full h-full bg-gradient-to-br from-[#f5f0ff] to-white rounded-lg overflow-hidden">
                  <img 
                    src={sticker.image} 
                    alt={`Memory ${sticker.id}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/150/9b8cff/ffffff?text=📸";
                    }}
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#e6ddff] rounded-bl-lg opacity-50"></div>
              </div>
            </motion.div>
          ))}

          {/* MAIN CARD */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`${paper} p-14 w-[600px] text-center border-4 border-[#e6ddff] relative z-20 bg-white/95 backdrop-blur-sm`}
            style={{
              boxShadow: '0 30px 40px -20px rgba(124, 108, 255, 0.3)',
            }}
          >
            {/* Top ribbon decoration */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-40 h-7 bg-[#e6ddff] rounded-full"></div>
            
            {/* Title */}
            <div className="relative mt-8">
              <h1 className="text-5xl text-[#7c6cff] font-serif tracking-wide">
                A Scrapbook
              </h1>
              <h1 className="text-5xl text-[#7c6cff] font-serif -mt-1 tracking-wide">
                For You
              </h1>
            </div>
            
            {/* Decorative divider with purple heart */}
            <div className="flex items-center justify-center gap-4 my-6">
              <div className="w-12 h-0.5 bg-[#c4b8ff]"></div>
              <span className="text-[#9b8cff] text-2xl">💜</span>
              <div className="w-12 h-0.5 bg-[#c4b8ff]"></div>
            </div>
            
            {/* Subtitle */}
            <p className="text-[#9b8cff] italic text-xl mb-8">
              Our story in pictures and words
            </p>

            {/* Button */}
            <motion.button
              onClick={() => {
                setScreen("memory");
                attemptAutoPlay();
              }}
              className="px-10 py-4 bg-[#7c6cff] text-white rounded-full shadow-lg hover:bg-[#6a5ad9] transition-all text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Open Our Memories
            </motion.button>

            {/* Bottom decoration with purple heart */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-32 h-5 bg-[#f0e8ff] rounded-full flex items-center justify-center">
              <span className="text-[#7c6cff] text-xs">💜</span>
            </div>
          </motion.div>
        </div>
      )}

      {/* MEMORY PAGES - FIXED IMAGE DIMENSIONS */}
      {screen === "memory" && (
        <div className="relative w-[1000px] h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.8 }}
              className={`${paper} absolute w-full h-full flex overflow-hidden border-4 border-[#e6ddff]`}
            >
              {/* Left page - Image - FIXED: removed fixed height, using object-contain */}
              <div className="w-1/2 p-8 bg-gradient-to-br from-white to-[#faf5ff] flex items-center justify-center">
                <div className="relative">
                  <div className="absolute -top-2 -left-2 w-4 h-4 bg-[#c4b8ff] rounded-full flex items-center justify-center">
                    <span className="text-[8px]">💜</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#c4b8ff] rounded-full flex items-center justify-center">
                    <span className="text-[8px]">💜</span>
                  </div>
                  <img
                    src={memories[page].image}
                    className="rounded-lg shadow-xl border-8 border-white max-h-[400px] w-auto object-contain"
                    alt={`Memory ${page + 1}`}
                  />
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#f5f0ff] px-4 py-1 rounded-full text-[#7c6cff] text-sm flex items-center gap-1 whitespace-nowrap">
                    <span>💜</span>
                    Page {page + 1} of {memories.length}
                    <span>💜</span>
                  </div>
                </div>
              </div>
              
              {/* Right page - Text */}
              <div className="w-1/2 p-10 flex flex-col items-center justify-center bg-gradient-to-tl from-white to-[#faf5ff] relative">
                <div className="absolute top-4 right-4 w-16 h-16 opacity-20">
                  <span className="text-6xl">💜</span>
                </div>
                
                <p className="text-2xl text-[#4b3fbf] text-center leading-relaxed italic relative px-8">
                  <span className="text-4xl text-[#c4b8ff] absolute -top-2 -left-2">💜</span>
                  {memories[page].text}
                  <span className="text-4xl text-[#c4b8ff] absolute -bottom-2 -right-2">💜</span>
                </p>
                
                <div className="mt-8 flex gap-3">
                  {[...Array(memories.length)].map((_, i) => (
                    <div key={i} className={`${i === page ? 'text-[#7c6cff]' : 'text-[#e6ddff]'} text-xl`}>
                      💜
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-[-70px] w-full flex justify-between">
            <button
              onClick={prevPage}
              className="px-8 py-3 bg-[#e6ddff] text-[#7c6cff] rounded-full shadow hover:bg-[#d6ccff] transition-all disabled:opacity-50 flex items-center gap-2"
              disabled={page === 0}
            >
              <span>💜</span> ← Previous <span>💜</span>
            </button>

            <button
              onClick={nextPage}
              className="px-8 py-3 bg-[#7c6cff] text-white rounded-full shadow hover:bg-[#6a5ad9] transition-all flex items-center gap-2"
            >
              <span>💜</span> {page === memories.length - 1 ? 'Open Letter →' : 'Next →'} <span>💜</span>
            </button>
          </div>
        </div>
      )}

      {/* ENVELOPE WITH LETTER */}
      {screen === "envelope" && (
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-[500px] h-[380px] mb-16">
            
            <motion.div
              initial={{ y: 0 }}
              animate={{ 
                y: letterOpen ? -60 : 0,
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: letterOpen ? 0.2 : 0
              }}
              className="absolute left-1/2 -translate-x-1/2 w-[420px] h-[260px] bg-white rounded-lg shadow-2xl p-6 border-2 border-[#e6ddff]"
              style={{ 
                bottom: '20px',
                zIndex: letterOpen ? 30 : 10,
                boxShadow: '0 15px 30px rgba(124, 108, 255, 0.25)',
              }}
            >
              <div className="flex gap-6 h-full">
                <div className="w-1/3">
                  <div className="w-full h-28 bg-gradient-to-br from-[#f0e8ff] to-[#e6ddff] rounded-lg flex items-center justify-center text-4xl border-2 border-white shadow-inner relative">
                    📸
                    <span className="absolute -top-1 -right-1 text-xs">💜</span>
                  </div>
                  <p className="text-xs text-[#9b8cff] mt-3 text-center font-medium flex items-center justify-center gap-1">
                    <span>💜</span> December 2020 <span>💜</span>
                  </p>
                </div>
                
                <div className="w-2/3">
                  <h2 className="text-2xl text-[#7c6cff] font-bold flex items-center gap-2" style={{ fontFamily: "'Dancing Script', cursive" }}>
                    <span>💜</span> Dear Joy, <span>💜</span>
                  </h2>
                  <p className="mt-2 text-gray-700 text-sm leading-relaxed">
                  
Life has a funny way of bringing people back into our paths. I’m glad ours crossed again. You’ve always been special in a quiet, genuine way, and I value you more than you know.
                  </p>
                  <p className="mt-3 text-[#7c6cff] text-right text-sm italic flex items-center justify-end gap-1">
                    With Love, Wilson <span>💜</span>
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="absolute inset-0" style={{ zIndex: 20 }}>
              <div className="absolute inset-0 bg-[#e6ddff] rounded-lg shadow-xl border-2 border-[#d6ccff]" />
              <div
                className="absolute bottom-0 left-0 w-full h-[220px]"
                style={{
                  background: "#dcd2ff",
                  clipPath: "polygon(0 0, 50% 25%, 100% 0, 100% 100%, 0 100%)",
                  borderLeft: '2px solid #c4b8ff',
                  borderRight: '2px solid #c4b8ff',
                  borderBottom: '2px solid #c4b8ff'
                }}
              />
              <motion.div
                initial={{ rotateX: 0 }}
                animate={{ rotateX: letterOpen ? -140 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-full h-[220px] origin-top"
                style={{
                  background: "#cfc4ff",
                  clipPath: "polygon(0 100%, 50% 25%, 100% 100%, 100% 0, 0 0)",
                  borderTop: '2px solid #c4b8ff',
                  borderLeft: '2px solid #c4b8ff',
                  borderRight: '2px solid #c4b8ff',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden'
                }}
              />
              
              {!letterOpen && (
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setLetterOpen(true)}
                  className="absolute top-[140px] left-1/2 -translate-x-1/2 w-16 h-16 bg-[#9b8cff] rounded-full shadow-lg cursor-pointer z-50 flex items-center justify-center border-2 border-white"
                >
                  <span className="text-white text-2xl">💜</span>
                </motion.div>
              )}
            </div>
          </div>

          <div className="text-center mt-4">
            {!letterOpen ? (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[#9b8cff] text-lg flex items-center gap-2"
              >
                <span>💜</span> Click the wax seal to open your letter <span>💜</span>
              </motion.p>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-3"
              >
                <button
                  onClick={() => setScreen("proposal")}
                  className="px-8 py-3 bg-[#7c6cff] text-white rounded-full shadow-lg hover:bg-[#6a5ad9] transition-all text-lg font-medium flex items-center gap-2 mx-auto"
                >
                  <span>💜</span> Continue to Final Page <span>💜</span>
                </button>
                <p className="text-[#9b8cff] flex items-center justify-center gap-2">
                  <span>💜</span> Your letter is ready... <span>💜</span>
                </p>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* PROPOSAL PAGE */}
      {screen === "proposal" && (
        <div className="text-center relative">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 opacity-20">
            <span className="text-7xl">💜</span>
          </div>

          {!accepted ? (
            <>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-7xl text-[#7c6cff] mb-8 flex items-center justify-center gap-4"
                style={{ fontFamily: "'Dancing Script', 'Brush Script MT', cursive" }}
              >
                <span>💜</span> Will you be my Valentine? <span>💜</span>
              </motion.h1>

              <div className="flex gap-10 mt-10 justify-center items-center">
                <motion.button
                  animate={{ scale: yesScale }}
                  onClick={handleYes}
                  className="px-12 py-5 bg-[#7c6cff] text-white rounded-full shadow-xl text-2xl hover:bg-[#6a5ad9] transition-all flex items-center gap-2"
                  style={{ fontFamily: "'Dancing Script', 'Brush Script MT', cursive" }}
                  whileHover={{ scale: 1.1 }}
                >
                  <span>💜</span> Yes, always <span>💜</span>
                </motion.button>

                <motion.button
                  animate={{
                    x: noPosition.x,
                    y: noPosition.y,
                  }}
                  onMouseEnter={moveNoButton}
                  className="px-12 py-5 bg-[#e6ddff] text-[#7c6cff] rounded-full shadow-xl text-2xl border-2 border-[#c4b8ff] flex items-center gap-2"
                  style={{ fontFamily: "'Dancing Script', 'Brush Script MT', cursive" }}
                  whileHover={{ scale: 0.95 }}
                >
                  <span>💜</span> No <span>💜</span>
                </motion.button>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 10 }}
              className="bg-white p-16 rounded-3xl shadow-2xl border-4 border-[#e6ddff]"
            >
              <h2 
                className="text-7xl text-[#7c6cff] flex items-center justify-center gap-2"
                style={{ fontFamily: "'Dancing Script', 'Brush Script MT', cursive" }}
              >
                <span>💜</span> Type!! <span>💜</span>
              </h2>
              <h2 
                className="text-8xl text-[#7c6cff] mt-4 flex items-center justify-center gap-2"
                style={{ fontFamily: "'Dancing Script', 'Brush Script MT', cursive" }}
              >
                <span>💜</span>  <span>💜</span>
              </h2>
              <div className="mt-8 text-6xl flex justify-center gap-2">
                <span>💜</span> 💜 <span>💜</span>
              </div>
              <p className="mt-8 text-[#9b8cff] text-2xl flex items-center justify-center gap-2">
                <span>💜</span> It is a DATE!!!! <span>💜</span>
              </p>
            </motion.div>
          )}
        </div>
      )}
    </main>
  );
}