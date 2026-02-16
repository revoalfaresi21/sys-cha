// src/app/valentine/page.tsx
'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Ballpit from '@/component/Ballpit';
import TextPressure from '@/component/TextPressure';
import DecryptedText from '@/component/DecryptedText';

export default function ValentinePage() {
  const [isOpened, setIsOpened] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [startLetterAnim, setStartLetterAnim] = useState(false); // Memicu dekripsi
  const [isFinished, setIsFinished] = useState(false); // Mengubah judul jadi ACCESS GRANTED

  const nextSectionRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const moveNoButton = useCallback(() => {
    let newX = Math.random() * 800 - 400;
    let newY = Math.random() * 600 - 300;
    if (Math.abs(newX) < 150) newX = newX > 0 ? newX + 200 : newX - 200;
    if (Math.abs(newY) < 150) newY = newY > 0 ? newY + 200 : newY - 200;
    setNoPosition({ x: newX, y: newY });
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setNoPosition({ x: 0, y: 0 }), 2000);
  }, []);

  const handleYesClick = () => {
    setStartLetterAnim(true); 
    nextSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleYesHover = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setNoPosition({ x: 0, y: 0 }); 
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-black text-white font-mono selection:bg-[#f3c6f2] selection:text-black">
      
      {/* 1. BACKGROUND LAYER: Ballpit (Fixed) */}
      <div className="fixed inset-0 z-0 opacity-40">
        <Ballpit
          count={150}
          gravity={0.5}
          friction={0.99}
          wallBounce={0.95}
          followCursor={true}
          colors={[0xf3c6f2, 0xbd98e0, 0x7554ae]} 
        />
      </div>

      {/* 2. SECTION 1: THE GATE */}
      <main className="relative z-10 w-full h-screen flex flex-col items-center justify-center p-4">
        
        {/* Halo Sayangku - Besar & Mengambang di Atas */}
        <div className="absolute top-10 md:top-16 w-full max-w-6xl h-[120px] md:h-[200px] flex justify-center items-center z-20 pointer-events-auto">
          <TextPressure
            text="Awwo Cayaaang!"
            flex={true}
            alpha={true}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="#f3c6f2"
            minFontSize={60}
          />
        </div>

        {/* Card Konten Utama */}
        <div className="pointer-events-auto w-full max-w-2xl rounded-sm border border-[#f3c6f2]/40 bg-black/80 p-8 shadow-[0_0_50px_rgba(243,198,242,0.1)] backdrop-blur-md">
          <div className="flex justify-between items-center mb-6 border-b border-[#f3c6f2]/20 pb-2 uppercase text-[10px] tracking-widest text-[#f3c6f2]/60 font-bold">
            <span>System.Access.Valentine</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
              <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
            </div>
          </div>

          <div className="space-y-4 mb-8 text-sm italic">
            <p className="text-[#f3c6f2]/60 font-mono">
              [LOG] : User Identification Confirmed: <span className="text-[#f3c6f2]">ACHA_HEART_CORE</span><br/>
              [LOG] : Decrypting emotional_database.zip... <span className="text-green-400">SUCCESS</span><br/>
              [LOG] : Waiting for user authorization...
            </p>
          </div>

          {!isOpened ? (
            <button
              onClick={() => setIsOpened(true)}
              className="w-full bg-[#f3c6f2] text-black py-4 font-bold uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(243,198,242,0.5)] active:scale-95"
            >
              Execute "Open_Invitation"
            </button>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
               <h2 className="text-xl md:text-2xl font-bold text-white mb-8 border-l-4 border-[#f3c6f2] pl-4 italic">
                 CRITICAL_QUESTION: Will you be my Valentine?
               </h2>
               
               <div className="flex flex-col sm:flex-row justify-center gap-6 items-center relative min-h-[100px]">
                 <button 
                   onClick={handleYesClick}
                   onMouseEnter={handleYesHover}
                   onTouchStart={handleYesHover}
                   className="w-full sm:w-auto px-10 py-3 bg-[#f3c6f2] text-black font-bold border border-[#f3c6f2] hover:bg-transparent hover:text-[#f3c6f2] transition-all z-20 active:scale-95"
                 >
                   ALLOW_ACCESS (YES)
                 </button>
                 
                 <button 
                   onMouseEnter={moveNoButton} 
                   onClick={moveNoButton}      
                   style={{
                      transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
                      transition: 'transform 0.1s ease-out'
                   }}
                   className="absolute sm:relative w-full sm:w-auto px-10 py-3 border border-red-500/50 text-red-500 font-bold bg-black/50 z-30"
                 >
                   DENY (NO)
                 </button>
               </div>
            </div>
          )}
        </div>
      </main>

      {/* 3. SECTION 2: THE DECRYPTED MESSAGE */}
      <section 
        ref={nextSectionRef} 
        className="relative z-10 min-h-screen w-full flex flex-col items-center py-24 px-6 bg-gradient-to-b from-transparent to-pink-950/20"
      >
         <div className="max-w-4xl w-full space-y-20">
            
            {/* Judul Dinamis yang berubah setelah surat selesai */}
            <h2 className={`text-5xl md:text-8xl font-extrabold text-center transition-all duration-1000 ${isFinished ? 'text-green-400' : 'text-[#f3c6f2]'}`}>
               {!startLetterAnim ? "DATA_LOCKED" : isFinished ? "ACCESS GRANTED" : "DECRYPTING_DATA..."}
            </h2>

            {/* Kotak Surat */}
            <div className="bg-[#f3c6f2]/5 border border-[#f3c6f2]/20 p-8 md:p-16 rounded-sm relative shadow-[inset_0_0_20px_rgba(243,198,242,0.05)]">
               <div className="absolute top-4 left-4 text-[10px] text-[#f3c6f2]/40 tracking-widest font-mono">
                 FILE_TYPE: HIGHLY_CONFIDENTIAL // DATE: 2026-02-14
               </div>
               
               <div className="mt-8 space-y-10 text-zinc-300 text-lg md:text-2xl font-light leading-relaxed font-mono">
                  <div className="text-[#f3c6f2] font-bold">
                    &gt; <DecryptedText 
                           text="Awwooo Cayangkuuu," 
                           animate={startLetterAnim} 
                           speed={50}
                           revealDelay={1} 
                         />
                  </div>

                  <p>
                    <DecryptedText 
                      text="Being the IT guy, my days are mostly spent doing network maintenance, debugging code, or making sure the campus servers and websites don't crash. But just for you, I'm pausing all the system logs and taking the time to write these lines." 
                      animate={startLetterAnim}
                      speed={50}
                      revealDelay={1} // Menunggu sapaan selesai
                    />
                  </p>

                  <p>
                    <DecryptedText 
                      text="The database in my heart is already completely packed with all our amazing memories. Whenever I'm stressing out over real-life errors, just having you around always gets my system back to stable. You're the framework that makes my everyday life way more meaningful." 
                      animate={startLetterAnim}
                      speed={50}
                      revealDelay={1} // Menunggu paragraf sebelumnya selesai
                    />
                  </p>

                  <p>
                    <DecryptedText 
                      text="I know it might sound a bit cheesy, but I want you to know that you're the most important variable in my life—the exact only user with root access to my world. You're the one who can make my heart skip a beat faster than any CPU clock speed, and the one who makes my day brighter than the best debug session." 
                      animate={startLetterAnim}
                      speed={50}
                      revealDelay={1} // Menunggu paragraf sebelumnya selesai
                    />
                  </p>

                  <p>
                    <DecryptedText 
                      text="I promise to always be your ultimate firewall, protecting you from any bad days that might come your way, and making sure our connection always has unlimited bandwidth. I love you more than all the lines of code I've ever written, and that's saying a lot!" 
                      animate={startLetterAnim}
                      speed={50}
                      revealDelay={1} // Menunggu paragraf sebelumnya selesai
                    />
                  </p>
                  <p>
                    <DecryptedText 
                      text="Happy Valentine's Day, Cayang! Let's keep building this amazing program together, one memory at a time. <3" 
                      animate={startLetterAnim}
                      speed={50}
                      revealDelay={1} // Menunggu paragraf sebelumnya selesai
                    />
                  </p>

                  <div className="pt-6 font-bold text-[#f3c6f2]">
                    &gt; <DecryptedText 
                           text="Connection Established <3"
                           animate={startLetterAnim}
                           speed={50} 
                           revealDelay={11} 
                           onFinished={() => setIsFinished(true)} // Baris terakhir memicu ACCESS GRANTED
                         />
                  </div>
                  <div className="pt-6 font-bold text-[#f3c6f2]">
                    &gt; <DecryptedText 
                           text="From your lifelong Developer, Acha"
                           animate={startLetterAnim}
                           speed={50} 
                           revealDelay={11} 
                           onFinished={() => setIsFinished(true)} // Baris terakhir memicu ACCESS GRANTED
                         />
                  </div>
               </div>
            </div>

            {/* Gallery Section - Muncul Terang saat sudah ACCESS GRANTED */}
            <div className={`space-y-12 transition-all duration-1000 ${isFinished ? 'opacity-100 scale-100' : 'opacity-20 scale-95'}`}>
            <h3 className="text-center text-[#f3c6f2] tracking-[0.5em] text-sm uppercase font-bold">
                // Memory_Database_Entries
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pointer-events-auto">
                {/* Kita gunakan 'path' untuk alamat file, dan 'index' untuk penomoran (0, 1, 2) */}
                {['/foto1.jpg', '/foto2.jpg', '/foto3.jpg'].map((path, index) => (
                <div key={index} className="group relative aspect-[3/4] border border-[#f3c6f2]/20 bg-black/40 p-2 transition-all hover:border-[#f3c6f2]/60 shadow-xl overflow-hidden cursor-crosshair">
                    
                    {/* Label Indikator */}
                    <div className="absolute top-2 right-2 z-20 text-[8px] bg-[#f3c6f2] text-black px-1 font-bold">
                    {isFinished ? `IMG_00${index + 1}_UNLOCKED` : 'LOCKED'}
                    </div>

                    <div className="w-full h-full overflow-hidden bg-zinc-900 flex items-center justify-center">
                    <img 
                        src={path} // SEBELUMNYA: src="/api/placeholder/..."
                        alt={`Memory ${index + 1}`} 
                        className="w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-105 transition duration-700 grayscale group-hover:grayscale-0" 
                    />
                    {!isFinished && (
                        <span className="absolute text-[10px] text-pink-500/30 font-mono">
                        ENCRYPTED_DATA
                        </span>
                    )}
                    </div>
                </div>
                ))}
            </div>
            </div>

            <footer className="text-center pt-24 pb-12 opacity-30 text-[8px] tracking-[1em]">
               END OF ENCRYPTED SESSION // DEDICATED FOR ACHA
            </footer>
         </div>
      </section>

    </div>
  );
}