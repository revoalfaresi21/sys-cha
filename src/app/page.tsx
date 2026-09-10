'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LetterGlitch from '@/component/LetterGlitch';

const authHintLevels = [
  {
    title: 'LEVEL 1 - AUTHENTICATION FAILED',
    lines: [
      '[SYSTEM ALERT]',
      'ACCESS DENIED.',
      'Invalid authentication sequence detected.',
      'HINT: The key was created at the moment our connection was first established.',
    ],
  },
  {
    title: 'LEVEL 2 - TRACE INITIATED',
    lines: [
      '[TRACE PROTOCOL]',
      'Searching archived system logs...',
      'FOUND: FIRST_CONNECTION_EVENT',
      'HINT: Somewhere in the history of this system lies the answer you seek.',
    ],
  },
  {
    title: 'LEVEL 3 - DATA EXTRACTION',
    lines: [
      '[MEMORY CORE]',
      'Historical record successfully recovered.',
      'Multiple data fragments detected.',
      'HINT: Ignore everything except the information that defines when the connection began.',
    ],
  },
  {
    title: 'LEVEL 4 - DECRYPTION REQUIRED',
    lines: [
      '[CRYPTOGRAPHIC ANALYSIS]',
      'Relevant data identified.',
      'Input requires exactly 3 digits.',
      'HINT: The system reads the date in a different order than you might expect.',
    ],
  },
  {
    title: 'LEVEL 5 - FINAL HINT UNLOCKED',
    lines: [
      '[ROOT ACCESS]',
      'Final encryption layer removed.',
      'Historical timestamp confirmed.',
      'FINAL HINT UNLOCKED.',
      'Month -> Day.',
      '09/11 -> ?',
      'Can you crack the key?',
    ],
  },
];

export default function LoginPage() {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const router = useRouter();
  const activeHint = failedAttempts > 0
    ? authHintLevels[Math.min(Math.floor((failedAttempts - 1) / 3), authHintLevels.length - 1)]
    : null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const accessKey = name.trim().toLowerCase();

    if (accessKey === 'ocil') {
      router.push('/valentine');
    } else if (accessKey === '911') {
      router.push('/anniversary');
    } else {
      setFailedAttempts((attempts) => attempts + 1);
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#050008] font-mono text-white">
      <div className="absolute inset-0 z-0 opacity-55">
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={true}
          smooth={true}
          glitchColors={['#ff1493', '#ff69b4', '#f3c6f2', '#c71585']}
          characters="0101♥♡xoxOX!@#%*^"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_42%,transparent_0%,rgba(5,0,8,0.30)_46%,rgba(5,0,8,0.88)_100%),linear-gradient(rgba(0,0,0,0)_50%,rgba(255,105,180,0.08)_50%)] bg-[length:100%_100%,100%_4px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-36 bg-gradient-to-b from-[#050008] via-[#050008]/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-black via-[#050008]/75 to-transparent" />

      <div className="relative z-20 flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-[460px] animate-in fade-in zoom-in duration-700">
          <div className="relative border border-[#ff73c7]/50 bg-[#07000c]/85 p-1 shadow-[0_0_36px_rgba(255,20,147,0.30),0_0_90px_rgba(176,38,255,0.22)] backdrop-blur-xl">
            <div className="pointer-events-none absolute -inset-px border border-[#b026ff]/25 shadow-[inset_0_0_28px_rgba(255,115,199,0.14)]" />
            <div className="pointer-events-none absolute left-4 right-4 top-0 h-px bg-gradient-to-r from-transparent via-[#ff73c7] to-transparent shadow-[0_0_18px_#ff73c7]" />

            <div className="relative border border-white/5 bg-black/45">
              <div className="flex items-center justify-between border-b border-[#ff73c7]/25 bg-[#160017]/80 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff4fac] shadow-[0_0_14px_#ff4fac]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#b026ff] shadow-[0_0_14px_#b026ff]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff9dd8] shadow-[0_0_14px_#ff9dd8]" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#ffbde5]/70">
                  secure-gateway
                </span>
              </div>

              <div className="p-6 sm:p-8">
                <div className="mb-7">
                  <p className="mb-2 text-[11px] uppercase tracking-[0.28em] text-[#ff73c7]/75">
                    encrypted access node
                  </p>
                  <h1 className="text-2xl font-black uppercase text-[#ffe6f7] drop-shadow-[0_0_18px_rgba(255,115,199,0.75)] sm:text-3xl">
                    Love Protocol
                  </h1>
                  <div className="mt-4 border border-[#ff73c7]/25 bg-[#120013]/70 px-4 py-3 shadow-[inset_0_0_24px_rgba(255,20,147,0.10)]">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#ffbde5]/70">
                      2 encrypted routes detected
                    </p>
                    <p className="mt-1 text-xs text-[#c988ff]/70">
                      Inject the right passphrase to unlock the hidden protocol. Failed attempts reveal deeper traces.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col gap-5">
                  <label className="block">
                    <span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-[#ffbde5]/65">
                      passphrase
                    </span>
                    <div
                      className={`flex items-center border bg-black/70 transition-all duration-300 ${
                        error
                          ? 'border-red-400 shadow-[0_0_24px_rgba(248,113,113,0.45)]'
                          : 'border-[#ff73c7]/45 shadow-[inset_0_0_22px_rgba(176,38,255,0.16)] focus-within:border-[#ff73c7] focus-within:shadow-[0_0_30px_rgba(255,20,147,0.34),inset_0_0_22px_rgba(176,38,255,0.20)]'
                      }`}
                    >
                      <span className="border-r border-[#ff73c7]/20 px-3 text-sm text-[#b026ff]">
                        &gt;_
                      </span>
                      <input
                        type="password"
                        placeholder="type your secret key"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setError(false);
                        }}
                        autoFocus
                        className="min-w-0 flex-1 bg-transparent px-3 py-4 text-base text-[#ffe6f7] caret-[#ff73c7] outline-none placeholder:text-[#ff73c7]/35 sm:text-lg"
                      />
                    </div>
                  </label>

                  <button
                    type="submit"
                    className="group relative w-full overflow-hidden border border-[#ff73c7]/60 bg-[#ff1493] px-4 py-4 text-sm font-black uppercase text-black shadow-[0_0_26px_rgba(255,20,147,0.42)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ff73c7] hover:shadow-[0_0_44px_rgba(255,20,147,0.70)] active:translate-y-0"
                  >
                    <span className="relative z-10 tracking-[0.22em]">decrypt access</span>
                    <span className="absolute inset-y-0 left-0 w-10 -translate-x-14 skew-x-12 bg-white/55 transition-transform duration-700 group-hover:translate-x-[520px]" />
                  </button>
                </form>

                <div className="mt-7 border-t border-[#ff73c7]/20 pt-5">
                  <div className="flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.18em] text-[#ffbde5]/60">
                    <span className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff73c7] opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff73c7]" />
                      </span>
                      heartbeat stable
                    </span>
                    <span className="text-[#c988ff]">status: armed</span>
                  </div>

                  {error && (
                    <div className="mt-5 border border-red-400/45 bg-red-950/45 p-3 text-center text-xs text-red-200 shadow-[0_0_22px_rgba(248,113,113,0.22)]">
                      <span className="block text-red-300">[ERR_AUTH_FAILED]</span>
                      <span className="mt-1 block text-red-200/70">AUTHENTICATION FAILED.</span>
                    </div>
                  )}

                  {activeHint && (
                    <div className="mt-5 border border-[#ff73c7]/30 bg-black/55 p-4 text-left text-xs leading-6 text-[#ffbde5]/75 shadow-[inset_0_0_22px_rgba(255,20,147,0.10)]">
                      <div className="mb-3 flex items-center justify-between gap-3 border-b border-[#ff73c7]/20 pb-2">
                        <span className="text-[10px] uppercase tracking-[0.18em] text-[#ff73c7]">
                          {activeHint.title}
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.14em] text-[#c988ff]/75">
                          fail_count: {failedAttempts}
                        </span>
                      </div>
                      <div className="space-y-1">
                        {activeHint.lines.map((line) => (
                          <p
                            key={line}
                            className={line === 'FINAL HINT UNLOCKED.' || line === 'Can you crack the key?' ? 'text-[#ff73c7]' : ''}
                          >
                            <span className="text-[#ff73c7]">&gt;</span> {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
