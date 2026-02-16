'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LetterGlitch from '@/component/LetterGlitch'; 

export default function LoginPage() {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.toLowerCase() === 'ocil') {
      router.push('/valentine');
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black font-sans text-white">
      
      {/* 1. BACKGROUND LAYER: Glitch dengan karakter biner & hati, warna Neon Pink/Magenta */}
      <div className="absolute inset-0 z-0 opacity-80">
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={true}
          smooth={true}
          glitchColors={['#ff1493', '#ff69b4', '#f3c6f2', '#c71585']} // Palet Deep Pink & Magenta
          characters="0101♥♡xoxOX!@#%*^" // Karakter khusus hacker romantis
        />
      </div>

      {/* 2. CRT SCANLINE OVERLAY: Efek garis monitor jadul (Pointer events none agar tidak menutupi klik) */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-30"></div>

      {/* 3. CONTENT LAYER: Glassmorphism Terminal */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-4">
        
        <div className="w-full max-w-md animate-in fade-in zoom-in duration-1000">
          <div className="rounded-sm border border-[#ff69b4]/40 bg-black/80 p-8 backdrop-blur-md shadow-[0_0_50px_rgba(255,105,180,0.2)]">
            
            {/* Header Tematik */}
            <div className="mb-8 border-b border-[#ff69b4]/30 pb-4 text-center">
              <h2 className="text-2xl font-bold font-mono text-[#ffb6c1] tracking-[0.25em] drop-shadow-[0_0_15px_rgba(255,105,180,0.8)]">
                SYS.AUTH.VALENTINE
              </h2>
              <p className="mt-2 text-xs font-mono text-[#ff69b4]/70 tracking-widest">
                ENCRYPTED_HEART_PROTOCOL
              </p>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-6">
              <div className="relative group">
                {/* Input Field dengan efek Neon Glow */}
                <input
                  type="text"
                  placeholder="Enter Key_to_My_Heart..."
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError(false);
                  }}
                  autoFocus
                  className={`w-full rounded-sm border bg-black/60 px-4 py-4 text-center font-mono text-xl text-[#ffb6c1] placeholder-[#ff69b4]/40 focus:outline-none transition-all duration-300
                    ${error 
                      ? 'border-red-500 animate-shake shadow-[0_0_20px_rgba(255,0,0,0.6)]' 
                      : 'border-[#ff69b4]/50 focus:border-[#ff1493] focus:shadow-[0_0_25px_rgba(255,20,147,0.4)]'
                    }
                  `}
                />
              </div>

              {/* Tombol ACCESS */}
              <button
                type="submit"
                className="group relative w-full overflow-hidden rounded-sm bg-[#ff1493] py-4 text-lg font-bold uppercase tracking-[0.3em] text-black transition-all hover:scale-[1.02] hover:bg-[#ff69b4] hover:shadow-[0_0_40px_rgba(255,20,147,0.7)]"
              >
                <span className="relative z-10 font-mono">DECRYPT & ACCESS</span>
                {/* Efek kilau saat hover */}
                <div className="absolute inset-0 -translate-x-full bg-white/40 skew-x-12 transition-transform duration-700 group-hover:translate-x-full"></div>
              </button>
            </form>

            {/* STATUS SYSTEM */}
            <div className="mt-8 flex items-center justify-center gap-2">
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffb6c1] opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff69b4]"></span>
               </span>
               <span className="font-mono text-xs tracking-widest text-[#ff69b4]/80 uppercase">
                 Heartbeat Sync: Stable
               </span>
            </div>

            {/* Pesan Error Tematik */}
            {error && (
               <div className="mt-6 text-center font-mono text-xs text-red-400 bg-red-950/40 p-3 rounded-sm border border-red-900/60">
                 [ERR_AUTH_FAILED] <br/>
                 <span className="text-red-300/70 mt-1 block">Hint: What’s your catto called?</span>
               </div>
            )}
            
          </div>
        </div>

      </div>
    </main>
  );
}