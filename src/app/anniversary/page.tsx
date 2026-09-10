'use client';

import { useEffect, useMemo, useState } from 'react';
import DecryptedText from '@/component/DecryptedText';
import LetterGlitch from '@/component/LetterGlitch';

const folders = [
  {
    id: '01',
    name: 'first_boot',
    label: 'First Boot',
    image: '/foto1.jpg',
    command: 'extract ./first_boot',
    title: 'The first file that changed everything',
    body: 'Initial boot sequence detected a small but irreversible signal. What looked like a tiny event became the first executable line in the system log of us.',
    metadata: [
      ['file_name', 'first_boot.mem'],
      ['signal', 'first_connection'],
      ['emotion', 'nervous_but_happy'],
      ['status', 'preserved'],
    ],
  },
  {
    id: '02',
    name: 'connection_event',
    label: 'Connection Event',
    image: '/foto2.jpg',
    command: 'extract ./connection_event',
    title: 'The day our connection became official',
    body: 'September 11, 2025 is stored as the primary timestamp in this archive: the day our private network switched from pending request to officially connected.',
    metadata: [
      ['file_name', 'connection_event.mem'],
      ['signal', 'first_connection_event'],
      ['timestamp', '09.11.2025'],
      ['status', 'officially_connected'],
    ],
  },
  {
    id: '03',
    name: 'love_system_logs',
    label: 'Love System Logs',
    image: '/foto3.jpg',
    command: 'extract ./love_system_logs',
    title: 'ordinary days that became meaningful with you',
    body: 'Routine days became high-value logs after you entered the system. Small talks, random laughter, and simple uptime together are archived as meaningful records I never want to delete.',
    metadata: [
      ['file_name', 'love_system_logs.mem'],
      ['signal', 'daily_love_pattern'],
      ['emotion', 'warm_and_grateful'],
      ['status', 'quietly_meaningful'],
    ],
  },
];

const bootLines = [
  '[ OK ] Locating love_system_v1.0.pkg',
  '[ OK ] Verifying passphrase: nyong',
  '[ OK ] Checking Love Protocol OS version',
  '[ OK ] Preparing extraction protocol',
];

const patchNotes = [
  'Added more memories to private archive',
  'Improved trust module stability',
  'Increased happiness uptime',
  'Fixed lonely-days bug',
  'Added forever roadmap',
];

const fragments = [
  { id: 'frag_01', label: 'first spark' },
  { id: 'frag_02', label: 'sealed archive' },
  { id: 'frag_03', label: 'favorite memory' },
  { id: 'frag_04', label: 'heartbeat log' },
  { id: 'frag_05', label: 'future gate' },
];

const heartbeatLogMessages = [
  'detected laugh pattern: favorite',
  'trust module increased',
  'missing-you signal stabilized',
  'forever roadmap synced',
  'love signal strength: maximum',
];

const futureMessage = [
  `NYONG NYONGGGGGGG
APPY ENIPPPPPP NYONGNYONGGGGGGGGGGGGGGGGGG 🥳🥳🥳`,
  `hihihihiii nda kerasa ya yang awalnya tu, kamu ngechat aku dan woahhh dalam hati "WOOHHHHHHH CANTIK BANGET YANG NGECHAT", "hai epo tebak siapa ☝️☝️" katanya tuu, terus aku "WUOOOOOOOOOOOOOOO SIAPA NIIIIIIII", terus aku kerjain balik, aku bilang "bayu" AHAHAHAHAHAHA, ternyata "ACCAAAAAAAA WUIII CANTIK BANGETTTT", abis tu terus kita lanjut chit-chat, rasanya dag dig dug dag dig dug pokoknya mah deg deg an parah tapi rasanya tu CIHUYYYYYYY`,
  `aku bersyukur banget kamu mau lanjut chatting sama aku, aku seneng banget pas waktu itu kamu selalu bales chat aku walaupun ada suatu momen chat aku belum kamu balas-balas 💔 tapi aku bersyukur kamu akhirnya mau buat bales aku terus yapping ke aku soal ormawa kamu, soal kehidupan kamu di tasik, hidup sendiri di kos, aku senenggg banget kamu mau buat sharing pas waktu itu`,
  `sumpah di hari pas waktu kita pertama ketemu lagi ya, itu pas aku beli kemripik kamu, DEG DEGANNYA MAKIN PARAH MAKIN CIHUYYYYY, wah aku sampe prepare mampus pokoknya harus prepare untuk bertemu calon my accaa aku. pas udah ketemu kita ngobrol banyak WUHUUUUU nervous abis, mana ketauan lagi ya aku nervous dan tremor sama kamu noooo tidak cool sekali, tapi aku tetep bangga sama diri aku yang bisa nyambung ngobrol sama kamu dan full respect sama kamu. WOHIYAAA ada lagi pas waktu kamu pertama kali ketemu IWOOOOOO, WIIII TANGAN KITA BERSENTUHAN RASANYA MENYETRUM CIHUY yang aku rasain pas waktu itu tu senenggg banget terus nda enak juga soalnya aku mikir "GAPAPA KAHHH AKU MIKIR TANGANNYA LEMBUT BANGEEETTTTTTT HUWAAAAAAAAAA" (W ASSIST CIWO), terus poto-potoooo HIHIHI senenggg banget kamu mau aku ajak buat poto bareng, aku juga agak panik pas temen-temen aku kelewatan buat bantu moto, jadi geger geden kan ya, sempet khawatir tapi kamunya senang jadi aku juga SENENG BANGETTTT SOALNYA DICERITAIN KE MAMAAAAAAAAAA OMGGG CALON MANTU KAH INI GUYS`,
  `banyaaakkk banget hal-hal manis manis manis karena kamu manis yang enak sekali pas kamu manggil aku epo manis terus aku balas aca manis IWUYY KYAAAAA ITU MANIS CEKAYIIIII HUWAAAA MELELEHHHH terus kita lanjut sampe sayang-sayangan sumpah itu manis bangettt, pas waktu kamu kirim foto yang menurut kamu sudah anggun cantik (pasti epo bakal suka) WAHHH ITU GA BISA SIH GA BISA AKU GA MELELEHHHH MANA CANTIK BANGETTTTTT SUKA BANGETTTTT ANGGUN BANGEEETTTTTTT, aku kirim foto aku terus kamu bilang manis HWAAAAAA MELELEH GA SIH GUYSSS, EH IYA awal kita kiss-kiss juga, AAAAAAAAAAAAAAAAAAAAAAAAAAAAA >///< rasanya melayang bangettt lembut sekali iniiii melayang-layang, lucu banget pas "hampir aja" hampir aja hampir aja momen, WOMAGAHHHHH KITA BELUM JADIAN KISSINGGG DI ANIME NGGA GITUUUUU APAKAH INI KISAH NYATA YANG LEBIH BAGUS DARI ANIMEEEE WUOOOOOOOOOOOOOOOOOOOOOOOOOOO.`,
  `INDAHHHH BANGETTTT hari-hari sama kamu tu walaupun cuma biboan di server atau jakrom itu tu bener-bener berhargaaaa banget buat aku nyang, aku seneng bangettt apa lagi pas kamu ngajakin aku buat jalan-jalan terus kita video-video bareng update sg bareng wahhh itu bikin kangeeennnn bangetttt kangeeennn banget sama kamu nyangggg, kangen ketawa bareng kamu, kangen wangi kamu, kangen dipeluk kamu, kangen dipatpat kamu, kangen biboan bareng kamuuu, kangen cium kepala kamu, kangen cium kening kamu, kangen ndusel ke kamu, kangen gigit kamu, kangen kiss kamuuuuuuu`,
  `walaupun ada beberapa hari yang ngebuat kamu bete atau ngebuat aku bete dan mungkin hari itu kita jadi tengkar, berselisih pendapat, akhirnya kita berdiskusi, dan mencapai konklusi yang ngebuat kita sama-sama nyaman aku bersyukurrr bangettt itu ada di hubungan kita`,
  `aku bersyukurrr banget kita bisa melewati hari-hari yang cukup menyulitkan bareng-bareng, aku bersyukur banget kamu mau mengkomunikasikan ke aku ketika kamu bete, kamu kesel, kamu marah, dan kamu sedih aku bersyukur banget dan aku bangga sama kamu yang mau mengkomunikasikannya ke aku karena aku tau itu adalah hal yang sulit buat mengkomunikasikannya, sehingga kita bisa menyelesaikan masalah kita dengan sama-sama nyaman.`,
  `kita udah genap 1 tahun aku APPPYYYY APPPPPYYYY APPPYYYYYYYY aku cinta sama kamu, sekarang saking banyaknya alasan buat aku cinta sama kamu, aku jadi bingung. jadi sekarang pokoknya aku cinta sama kamu karena itu kamu jadi aku cinta sama kamu dan cinta aku ke kamu itu nambahhhhhhh terus GAK PERNAH KURANG!!! POKOKNYA NAMBAH TEROSSSSSSS SAMPE SEKARANG SAMPE BESOK SAMPE BESOKNYA LAGI SAMPE SELAMA-LAMANYAAAAA POKOKNYA KITA NIKAH NYANGGGGGGGGGGGGGGG KITA HARUS NIKAH NYAAAAAAAANGGGGGGG UWOOOOOOO AKU CINTA BANGET SAMA KAMU CANYONGGGGGGGGGGG I LOVE YOU SOOOO MUCHHHHH CANYANGKUUUUUUUUUUUUUUUUU`,
  `timaaci banyak ya canyangkuuu, kamu mau nerima aku, kamu sampe sekarang selalu sama aku. maaci banyak juga nyaa canyangkuuu kamu selalu berusaha untuk kamu, untuk aku, dan untuk kita, aku bersyukur banget kita bisa ngebangun hubungan ini dan menjaga hubungan ini dengan sangat amat baik sehingga bisa sampe 1 tahun iniii, mudah-mudahan kita harus sampe selama-lama-lama-lama-lama-lama-lamanyaaaa pokoknya kita bareng terus ya cantikkk nanti di surga juga bareng terus ya cantikkuuuu cintakuuuu maniskuuu canyangkuuuuuuu`,
  `Happy 1st Anniversary NYONG! nanti kita rayain dengan kembang api nyaaa 🎇`,
  `mwah mwah mwahhh`,
  `😘🍓`,
  `let’s keep our love system running in the next version, my love, my acca aku, my nyongnyong <3`,
];

const terminalClosure = [
  '> saving our story...',
  '> upload complete: 100%',
  '> next update scheduled: every day with you',
  '> logout? denied. i still want to stay with you <3',
];

const traceHints = [
  'TRACE_01: key is not random',
  'TRACE_02: key sounds like how you call me',
  'TRACE_03: stored inside the way you summon me',
  'TRACE_04: final key belongs to us',
];

const handshakeNodes = ['you', 'me', 'nyongnyong', 'us'];

const catInteractions = [
  'the pink cat stares at you curiously o_o',
  'meow...? who are you? o_o',
  'hey! my tail! >_<',
  'system is too loud... ;_;',
  'processing cuteness.exe... ^_^',
  'hmmm... suspicious human detected. >:3',
  'belly rub required! ♡',
  'gotcha! ...wait. owo',
  'stealth mode: ACTIVATED B)',
  'psst... come closer... >_o',
  '...okay, okay! you found me! >_<',
];

export default function AnniversaryPage() {
  const [booted, setBooted] = useState(false);
  const [updateStarted, setUpdateStarted] = useState(false);
  const [updateInstalled, setUpdateInstalled] = useState(false);
  const [installProgress, setInstallProgress] = useState(0);
  const [capsuleOpen, setCapsuleOpen] = useState(false);
  const [capsuleUnlocking, setCapsuleUnlocking] = useState(false);
  const [activeFolder, setActiveFolder] = useState(0);
  const [letterOpen, setLetterOpen] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [collectedFragments, setCollectedFragments] = useState<string[]>([]);
  const [traceLevel, setTraceLevel] = useState(0);
  const [firewallInput, setFirewallInput] = useState('');
  const [firewallError, setFirewallError] = useState(false);
  const [firewallUnlocking, setFirewallUnlocking] = useState(false);
  const [firewallUnlocked, setFirewallUnlocked] = useState(false);
  const [handshakeProgress, setHandshakeProgress] = useState<string[]>([]);
  const [handshakeError, setHandshakeError] = useState(false);
  const [handshakeComplete, setHandshakeComplete] = useState(false);
  const [catClicks, setCatClicks] = useState(0);
  const [catCollecting, setCatCollecting] = useState(false);
  const [heartbeatMinimized, setHeartbeatMinimized] = useState(true);
  const [heartbeatTime, setHeartbeatTime] = useState(() => new Date());
  const [heartbeatTick, setHeartbeatTick] = useState(0);
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const bootTimer = window.setTimeout(() => setBooted(true), 1700);
    const timer = window.setInterval(() => setUptime((value) => value + 1), 1000);
    const heartbeatTimer = window.setInterval(() => {
      setHeartbeatTime(new Date());
      setHeartbeatTick((value) => value + 1);
    }, 2000);

    return () => {
      window.clearTimeout(bootTimer);
      window.clearInterval(timer);
      window.clearInterval(heartbeatTimer);
    };
  }, []);

  useEffect(() => {
    if (!updateStarted || updateInstalled) {
      return;
    }

    const progressTimer = window.setInterval(() => {
      setInstallProgress((value) => {
        const nextValue = Math.min(value + 4, 100);

        if (nextValue === 100) {
          window.clearInterval(progressTimer);
          window.setTimeout(() => setUpdateInstalled(true), 450);
        }

        return nextValue;
      });
    }, 110);

    return () => window.clearInterval(progressTimer);
  }, [updateStarted, updateInstalled]);

  const uptimeLabel = useMemo(() => {
    const minutes = Math.floor(uptime / 60).toString().padStart(2, '0');
    const seconds = (uptime % 60).toString().padStart(2, '0');
    return `00:${minutes}:${seconds}`;
  }, [uptime]);

  const selectedFolder = folders[activeFolder];
  const questComplete = collectedFragments.length === fragments.length;
  const heartbeatLogs = useMemo(() => {
    const time = new Date(heartbeatTime);
    const visibleLogCount = Math.min(heartbeatTick + 1, heartbeatLogMessages.length);
    const startIndex = heartbeatTick >= heartbeatLogMessages.length
      ? (heartbeatTick + 1) % heartbeatLogMessages.length
      : 0;
    const visibleMessages = Array.from({ length: visibleLogCount }, (_, index) => {
      const messageIndex = (startIndex + index) % heartbeatLogMessages.length;
      return heartbeatLogMessages[messageIndex];
    });

    return visibleMessages.map((message, index) => {
      const logTime = new Date(time);
      logTime.setSeconds(time.getSeconds() - ((visibleMessages.length - index - 1) * 2));

      return `[${logTime.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })}] ${message}`;
    });
  }, [heartbeatTick, heartbeatTime]);
  const latestHeartbeatLog = heartbeatLogs[heartbeatLogs.length - 1] ?? '[--:--:--] heartbeat pending...';

  const openFolder = (index: number) => {
    setActiveFolder(index);
    setExtracting(true);
    window.setTimeout(() => setExtracting(false), 900);
  };

  const collectFragment = (id: string) => {
    setCollectedFragments((current) => current.includes(id) ? current : [...current, id]);
  };

  const isFragmentCollected = (id: string) => collectedFragments.includes(id);
  const catReadyToDeliver = catClicks >= catInteractions.length - 1 || isFragmentCollected('frag_05');
  const catBubbleText = isFragmentCollected('frag_05')
    ? 'final fragment collected! ^_^'
    : catInteractions[Math.min(catClicks, catInteractions.length - 1)];
  const catCanCollectFragment = catReadyToDeliver && !isFragmentCollected('frag_05') && !catCollecting;

  const startUpdate = () => {
    setInstallProgress(0);
    setUpdateStarted(true);
  };

  const unlockCapsule = () => {
    if (capsuleOpen || capsuleUnlocking) {
      return;
    }

    setCapsuleUnlocking(true);
    window.setTimeout(() => {
      setCapsuleOpen(true);
      setCapsuleUnlocking(false);
    }, 1400);
  };

  const runTrace = () => {
    setTraceLevel((value) => Math.min(value + 1, traceHints.length));
    setFirewallError(false);
  };

  const submitFirewall = (event: React.FormEvent) => {
    event.preventDefault();

    if (firewallInput.trim().toLowerCase() === 'nyong') {
      setFirewallError(false);
      setFirewallUnlocking(true);
      window.setTimeout(() => {
        setFirewallUnlocked(true);
        setFirewallUnlocking(false);
      }, 1800);
      return;
    }

    setFirewallError(true);
  };

  const handleHandshake = (node: string) => {
    if (handshakeComplete) {
      return;
    }

    const expectedNode = handshakeNodes[handshakeProgress.length];

    if (node !== expectedNode) {
      setHandshakeProgress([]);
      setHandshakeError(true);
      return;
    }

    const nextProgress = [...handshakeProgress, node];
    setHandshakeProgress(nextProgress);
    setHandshakeError(false);

    if (nextProgress.length === handshakeNodes.length) {
      setHandshakeComplete(true);
    }
  };

  const playWithCat = () => {
    if (isFragmentCollected('frag_05') || catCollecting) {
      return;
    }

    if (catClicks >= catInteractions.length - 1) {
      return;
    }

    setCatClicks((clicks) => clicks + 1);
  };

  const collectCatFragment = () => {
    if (!catCanCollectFragment) {
      return;
    }

    setCatCollecting(true);
    window.setTimeout(() => {
      collectFragment('frag_05');
      setCatCollecting(false);
    }, 1800);
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050008] font-mono text-[#ffe6f7]">
      <div className="fixed inset-0 z-0 opacity-55">
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={true}
          smooth={true}
          glitchColors={['#ff1493', '#ff69b4', '#f3c6f2', '#c71585']}
          characters="0101♥♡xoxOX!@#%*^"
        />
      </div>

      <div className="pointer-events-none fixed inset-0 z-10 bg-[radial-gradient(circle_at_50%_38%,transparent_0%,rgba(5,0,8,0.28)_42%,rgba(5,0,8,0.92)_100%),linear-gradient(rgba(0,0,0,0)_50%,rgba(255,105,180,0.08)_50%)] bg-[length:100%_100%,100%_4px]" />
      <div className="pointer-events-none fixed inset-x-0 top-0 z-10 h-36 bg-gradient-to-b from-[#050008] via-[#050008]/70 to-transparent" />
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-10 h-44 bg-gradient-to-t from-black via-[#050008]/80 to-transparent" />

      {!booted && (
        <section className="relative z-20 flex min-h-screen items-center justify-center p-5">
          <div className="w-full max-w-xl border border-[#ff73c7]/45 bg-[#07000c]/90 p-5 shadow-[0_0_42px_rgba(255,20,147,0.25)] sm:p-8">
            <p className="mb-5 text-xs uppercase tracking-[0.28em] text-[#ff73c7]">
              Time Capsule Boot
            </p>
            <div className="space-y-3 text-xs leading-relaxed text-[#ffbde5]/80 sm:text-sm">
              {bootLines.map((line, index) => (
                <p key={line} className="animate-pulse" style={{ animationDelay: `${index * 0.25}s` }}>
                  {line}
                </p>
              ))}
            </div>
            <div className="mt-7 h-1 overflow-hidden bg-[#3a0630]">
              <div className="h-full animate-[loading_1.7s_ease-in-out_forwards] bg-gradient-to-r from-[#ff1493] via-[#f3c6f2] to-[#c71585]" />
            </div>
          </div>
        </section>
      )}

      {booted && !updateInstalled && (
        <section className="relative z-20 flex min-h-screen items-center justify-center px-4 py-8">
          <div className="w-full max-w-3xl border border-[#ff73c7]/45 bg-[#07000c]/90 p-1 shadow-[0_0_42px_rgba(255,20,147,0.25),0_0_90px_rgba(199,21,133,0.16)] backdrop-blur-xl">
            <div className="border border-white/5 bg-black/45">
              <div className="flex items-center justify-between border-b border-[#ff73c7]/25 bg-[#160017]/80 px-4 py-3">
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#ffbde5]/70">
                  love protocol os updater
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-[#ff73c7]">
                  v.love-system
                </span>
              </div>

              <div className="grid gap-6 p-5 sm:p-8 lg:grid-cols-[1fr_0.86fr]">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[#ff73c7]/80">
                    system update available
                  </p>
                  <h1 className="mt-3 text-3xl font-black uppercase leading-tight text-white drop-shadow-[0_0_18px_rgba(255,115,199,0.65)] sm:text-5xl">
                    Install LOVE SYSTEM v1.0
                  </h1>
                  <p className="mt-5 max-w-xl text-sm leading-7 text-[#ffbde5]/70">
                    Love Protocol OS is ready for a new build. This update unlocks the memory capsule,
                    restores hidden fragments, and reboots us into another year together.
                  </p>

                  <button
                    type="button"
                    onClick={startUpdate}
                    disabled={updateStarted}
                    className="mt-7 w-full border border-[#ff73c7]/60 bg-[#ff1493] px-5 py-4 text-xs font-black uppercase tracking-[0.2em] text-black shadow-[0_0_30px_rgba(255,20,147,0.40)] transition hover:bg-[#ff73c7] hover:shadow-[0_0_44px_rgba(255,20,147,0.65)] disabled:cursor-wait disabled:opacity-75 sm:w-auto"
                  >
                    {updateStarted ? 'installing update...' : 'install love system v1.0'}
                  </button>

                  <div className="mt-7">
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-[#ffbde5]/60">
                      <span>update progress</span>
                      <span className="text-[#ff73c7]">{installProgress}%</span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden border border-[#ff73c7]/20 bg-[#2b0626]">
                      <div
                        className="h-full bg-gradient-to-r from-[#ff1493] via-[#f3c6f2] to-[#c71585] transition-all duration-200"
                        style={{ width: `${installProgress}%` }}
                      />
                    </div>
                  </div>
                </div>

                <aside className="border border-[#ff73c7]/25 bg-[#08000f]/80 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#ff73c7]">
                    patch notes
                  </p>
                  <div className="mt-5 space-y-3 text-xs leading-6 text-[#ffbde5]/75">
                    {patchNotes.map((note, index) => (
                      <p
                        key={note}
                        className={installProgress >= (index + 1) * 18 ? 'text-[#ffe6f7]' : 'text-[#ffbde5]/35'}
                      >
                        <span className="text-[#ff73c7]">&gt;</span> {note}
                      </p>
                    ))}
                  </div>

                  {installProgress === 100 && (
                    <div className="mt-6 border border-[#ff73c7]/30 bg-[#ff1493]/10 p-4 text-xs uppercase tracking-[0.16em] text-[#ffbde5]">
                      Update complete. Rebooting into another year together.
                    </div>
                  )}
                </aside>
              </div>
            </div>
          </div>
        </section>
      )}

      {booted && updateInstalled && (
        <div className="relative z-20 mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6 sm:px-7 sm:py-8">
          <header className="relative flex flex-col gap-4 border-b border-[#ff73c7]/25 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#ff73c7]/80">
                private archive / encrypted love capsule
              </p>
              <h1 className="mt-2 text-2xl font-black uppercase text-white drop-shadow-[0_0_18px_rgba(255,115,199,0.65)] sm:text-4xl">
                LOVE SYSTEM v1.0 — 1 YEARS OF CONNECTION
              </h1>
            </div>
            <div className="border border-[#ff73c7]/30 bg-black/60 px-4 py-3 text-xs leading-5 text-[#ffbde5]/75 shadow-[0_0_22px_rgba(255,20,147,0.12)]">
              <p>STATUS: <span className="text-[#ff73c7]">{capsuleOpen ? 'EXTRACTED' : 'SEALED'}</span></p>
              <p>SESSION: {uptimeLabel}</p>
            </div>
          </header>

          <section className="grid flex-1 gap-5 py-7 lg:grid-cols-[0.88fr_1.12fr]">
            <aside className="relative border border-[#ff73c7]/35 bg-[#08000f]/88 p-5 shadow-[0_0_34px_rgba(255,20,147,0.16)] sm:p-7">
              <button
                type="button"
                onClick={() => collectFragment('frag_02')}
                aria-label="Collect sealed archive fragment"
                title="Hidden beside the sealed capsule"
                className={`absolute right-4 top-4 flex h-8 w-8 items-center justify-center border text-xs transition duration-300 ${
                  isFragmentCollected('frag_02')
                    ? 'border-[#ff73c7] bg-[#ff1493] text-black shadow-[0_0_24px_rgba(255,20,147,0.60)]'
                    : 'border-[#ff73c7]/20 bg-black/45 text-[#ff73c7]/55 hover:scale-110 hover:border-[#ff73c7] hover:text-[#ffbde5]'
                }`}
              >
                ♥
              </button>
              <p className="text-xs uppercase tracking-[0.2em] text-[#ff73c7]">
                sealed capsule
              </p>

              <button
                type="button"
                onClick={unlockCapsule}
                disabled={capsuleUnlocking}
                className="group mt-5 w-full border border-[#ff73c7]/45 bg-black/70 p-5 text-left transition duration-300 hover:border-[#ff73c7] hover:shadow-[0_0_30px_rgba(255,20,147,0.28)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-lg font-black text-white">love_system_v1.0.pkg</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#c988ff]/80">
                      {capsuleOpen ? 'archive unlocked' : capsuleUnlocking ? 'injecting unlock signal' : 'click to extract memories'}
                    </p>
                  </div>
                  <span className="text-3xl text-[#ff73c7] transition group-hover:scale-110">
                    {capsuleOpen ? '▣' : capsuleUnlocking ? '◈' : '◇'}
                  </span>
                </div>

                <div className="mt-5 h-1 overflow-hidden bg-[#2b0626]">
                  <div
                    className={`h-full bg-gradient-to-r from-[#ff1493] via-[#f3c6f2] to-[#c71585] transition-all duration-700 ${
                      capsuleOpen ? 'w-full' : 'w-1/4'
                    }`}
                  />
                </div>
              </button>

              {capsuleUnlocking && (
                <div className="mt-4 animate-[hackBoot_0.35s_steps(2,end)_infinite] border border-[#ff73c7]/25 bg-[#09000f]/90 p-4 text-xs leading-6 text-[#ffbde5]/75 shadow-[0_0_24px_rgba(255,20,147,0.18)]">
                  <p><span className="text-[#ff73c7]">&gt;</span> injecting packet: love_system_v1.0.pkg</p>
                  <p><span className="text-[#ff73c7]">&gt;</span> opening companion channel...</p>
                  <p><span className="text-[#ff73c7]">&gt;</span> deploying heartbeat daemon...</p>
                  <div className="mt-3 h-1 overflow-hidden bg-[#2b0626]">
                    <div className="h-full animate-[loading_1.4s_ease-in-out_forwards] bg-gradient-to-r from-[#ff1493] via-[#f3c6f2] to-[#c71585]" />
                  </div>
                </div>
              )}

              <div className="mt-6 space-y-2">
                {folders.map((folder, index) => (
                  <button
                    key={folder.id}
                    type="button"
                    disabled={!capsuleOpen}
                    onClick={() => openFolder(index)}
                    className={`w-full border px-4 py-3 text-left transition duration-300 ${
                      activeFolder === index && capsuleOpen
                        ? 'border-[#ff73c7] bg-[#ff1493]/14 shadow-[0_0_22px_rgba(255,20,147,0.20)]'
                        : 'border-[#ff73c7]/20 bg-black/45 hover:border-[#ff73c7]/60'
                    } ${!capsuleOpen ? 'cursor-not-allowed opacity-45' : ''}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="min-w-0 truncate text-sm text-[#ffe6f7]">/{folder.name}</span>
                      <span className="text-[10px] text-[#ff73c7]/80">DIR_{folder.id}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-7 border border-[#ff73c7]/25 bg-black/55 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#ff73c7]">
                      love quest
                    </p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[#ffbde5]/60">
                      fragments restored: {collectedFragments.length} / {fragments.length}
                    </p>
                  </div>
                  <span className="text-xs uppercase text-[#c988ff]/80">
                    {questComplete ? 'unlocked' : 'locked'}
                  </span>
                </div>

                <div className="mt-4 border border-[#ff73c7]/20 bg-[#09000f] p-4 text-xs leading-6 text-[#ffbde5]/65 shadow-[inset_0_0_26px_rgba(255,20,147,0.10)]">
                  Love Quest active. Hunt the scattered heart fragments across the archive
                </div>

                <div className="mt-4 h-1 overflow-hidden bg-[#2b0626]">
                  <div
                    className="h-full bg-gradient-to-r from-[#ff1493] via-[#f3c6f2] to-[#c71585] transition-all duration-500"
                    style={{ width: `${(collectedFragments.length / fragments.length) * 100}%` }}
                  />
                </div>
              </div>
            </aside>

            <section className="border border-[#ff73c7]/30 bg-black/70 p-5 shadow-[0_0_38px_rgba(199,21,133,0.16)] sm:p-7">
              {!capsuleOpen ? (
                <div className="flex min-h-[520px] flex-col items-center justify-center text-center">
                  <p className="text-xs uppercase tracking-[0.24em] text-[#ff73c7]">
                    root@love-protocol:~$
                  </p>
                  <h2 className="mt-4 max-w-xl text-3xl font-black leading-tight text-white sm:text-5xl">
                    A time capsule waiting for the right touch.
                  </h2>
                  <p className="mt-5 max-w-lg text-sm leading-7 text-[#ffbde5]/70">
                    This archive holds tiny proofs that us is still my favorite system to keep running.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex flex-col gap-4 border-b border-[#ff73c7]/20 pb-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-[#ff73c7]">
                        {selectedFolder.command}
                      </p>
                      <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                        {selectedFolder.label}
                      </h2>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-[#c988ff]/80">
                        packet {selectedFolder.id} / 03
                      </p>
                      <button
                        type="button"
                        onClick={() => collectFragment('frag_03')}
                        aria-label="Collect favorite memory fragment"
                        title="A fragment is hiding near the packet header"
                        className={`flex h-9 w-9 items-center justify-center border text-sm transition duration-300 ${
                          isFragmentCollected('frag_03')
                            ? 'border-[#ff73c7] bg-[#ff1493] text-black shadow-[0_0_24px_rgba(255,20,147,0.60)]'
                            : 'border-[#ff73c7]/35 bg-black/70 text-[#ff73c7] shadow-[0_0_18px_rgba(255,20,147,0.20)] hover:scale-110 hover:border-[#ff73c7] hover:bg-[#ff1493]/20'
                        }`}
                      >
                        ♥
                      </button>
                    </div>
                  </div>

                  <div className="grid items-start gap-5 pt-5 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="h-fit overflow-hidden border border-[#ff73c7]/25 bg-[#120013]">
                      <div className="relative isolate aspect-[4/5] overflow-hidden bg-black">
                        <img
                          src={selectedFolder.image}
                          alt={selectedFolder.label}
                          className={`h-full w-full object-cover will-change-transform transition duration-500 ${
                            extracting ? 'scale-105 opacity-55 blur-[2px]' : 'scale-100 opacity-90'
                          }`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-[#ff1493]/10" />
                        <span className="absolute left-3 top-3 border border-[#ff73c7]/30 bg-black/75 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[#ffbde5]">
                          extracted memory
                        </span>
                      </div>
                      <div className="border-t border-[#ff73c7]/20 bg-black/55 p-4">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#ff73c7]">
                          memory_metadata
                        </p>
                        <div className="mt-3 space-y-1 text-[11px] leading-5 text-[#ffbde5]/72">
                          {selectedFolder.metadata.map(([key, value]) => (
                            <p key={key}>
                              <span className="text-[#ff73c7]">&gt;</span> {key}: <span className="text-[#ffe6f7]">{value}</span>
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between border border-[#ff73c7]/20 bg-[#08000f]/80 p-5">
                      <div>
                        {extracting ? (
                          <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-[#ff73c7]">
                              extracting memories...
                            </p>
                            <div className="mt-4 h-1 overflow-hidden bg-[#35102c]">
                              <div className="h-full animate-[loading_0.9s_ease-in-out_forwards] bg-gradient-to-r from-[#ff1493] via-[#f3c6f2] to-[#c71585]" />
                            </div>
                          </div>
                        ) : (
                          <>
                            <p className="text-xs uppercase tracking-[0.2em] text-[#ff73c7]/85">
                              file opened
                            </p>
                            <h3 className="mt-4 text-2xl font-black leading-tight text-white">
                              {selectedFolder.title}
                            </h3>
                            <p className="mt-5 text-sm leading-7 text-[#ffbde5]/75">
                              {selectedFolder.body}
                            </p>
                          </>
                        )}
                      </div>

                      <div className="mt-8 border-t border-[#ff73c7]/20 pt-5 text-xs leading-6 text-[#c988ff]/75">
                        <p><span className="text-[#ff73c7]">&gt;</span> checksum: verified</p>
                        <p><span className="text-[#ff73c7]">&gt;</span> corruption: none detected</p>
                        <p><span className="text-[#ff73c7]">&gt;</span> stored with: too much love</p>
                      </div>
                    </div>
                  </div>

                </div>
              )}
            </section>
          </section>

          <section className="relative mb-7 border border-[#ff73c7]/35 bg-[#08000f]/88 p-5 shadow-[0_0_38px_rgba(255,20,147,0.16)] sm:p-8">
            <button
              type="button"
              onClick={() => collectFragment('frag_01')}
              aria-label="Collect first spark fragment"
              title="A tiny signal near the future letter"
              className={`absolute right-4 top-4 flex h-9 w-9 items-center justify-center border text-sm transition duration-300 ${
                isFragmentCollected('frag_01')
                  ? 'border-[#ff73c7] bg-[#ff1493] text-black shadow-[0_0_24px_rgba(255,20,147,0.60)]'
                  : 'border-[#ff73c7]/25 bg-black/55 text-[#ff73c7]/75 shadow-[0_0_18px_rgba(255,20,147,0.14)] hover:scale-110 hover:border-[#ff73c7] hover:text-[#ffbde5]'
              }`}
            >
              ♥
            </button>
            <div className="max-w-3xl pr-10">
              <p className="text-xs uppercase tracking-[0.24em] text-[#ff73c7]">
                messages_for_future_us
              </p>
              <h2 className="mt-3 text-2xl font-black uppercase leading-tight text-white drop-shadow-[0_0_18px_rgba(255,115,199,0.55)] sm:text-4xl">
                Encrypted Letter For The Next Version Of Us
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#ffbde5]/70">
                Final file is protected by Love Quest. Restore every fragment to decrypt the message.
              </p>
            </div>

            <div className="mt-7 border border-[#ff73c7]/25 bg-black/55 p-5 sm:p-7">
              {!questComplete ? (
                <div className="text-sm leading-7 text-[#ffbde5]/70">
                  <p>
                    [ACCESS_DENIED] Future message is still encrypted. Current fragment checksum:
                    {' '}
                    <span className="text-[#ff73c7]">{collectedFragments.length}/{fragments.length}</span>
                  </p>
                </div>
              ) : firewallUnlocking ? (
                <div className="border border-[#ff73c7]/30 bg-[#08000f]/85 p-5 text-left shadow-[0_0_30px_rgba(255,20,147,0.20)] sm:p-7">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#ff73c7]">
                    heart_firewall bypass sequence
                  </p>
                  <h3 className="mt-3 text-2xl font-black uppercase text-white drop-shadow-[0_0_16px_rgba(255,115,199,0.55)]">
                    Injecting key: nyong
                  </h3>
                  <div className="mt-6 space-y-3 text-xs leading-6 text-[#ffbde5]/75">
                    <p><span className="text-[#ff73c7]">&gt;</span> passphrase accepted</p>
                    <p><span className="text-[#ff73c7]">&gt;</span> decrypting heart core</p>
                    <p><span className="text-[#ff73c7]">&gt;</span> mounting future letter</p>
                  </div>
                  <div className="mt-6 h-2 overflow-hidden border border-[#ff73c7]/20 bg-[#2b0626]">
                    <div className="h-full animate-[loading_1.8s_ease-in-out_forwards] bg-gradient-to-r from-[#ff1493] via-[#f3c6f2] to-[#c71585]" />
                  </div>
                </div>
              ) : !firewallUnlocked ? (
                <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
                  <div className="border border-[#ff73c7]/25 bg-[#08000f]/80 p-5 text-left">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#ff73c7]">
                      access node: heart_firewall
                    </p>
                    <h3 className="mt-3 text-xl font-black uppercase text-white">
                      Password Brute Force
                    </h3>
                    <p className="mt-4 text-xs leading-6 text-[#ffbde5]/70">
                      The final letter is behind a simulated firewall. Run trace signals, recover the key,
                      then bypass the heart core.
                    </p>

                    <button
                      type="button"
                      onClick={runTrace}
                      disabled={traceLevel === traceHints.length}
                      className="mt-5 border border-[#ff73c7]/60 bg-[#ff1493]/15 px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-[#ffbde5] transition hover:bg-[#ff1493] hover:text-black disabled:cursor-not-allowed disabled:opacity-55"
                    >
                      {traceLevel === traceHints.length ? 'trace complete' : 'run trace'}
                    </button>
                  </div>

                  <div className="border border-[#ff73c7]/25 bg-black/60 p-5 text-left">
                    <div className="min-h-32 space-y-3 text-xs leading-6 text-[#ffbde5]/75">
                      {traceHints.slice(0, traceLevel).map((hint) => (
                        <p key={hint}>
                          <span className="text-[#ff73c7]">&gt;</span> {hint}
                        </p>
                      ))}
                      {traceLevel === 0 && (
                        <p className="text-[#ffbde5]/40">
                          <span className="text-[#ff73c7]">&gt;</span> waiting for trace command...
                        </p>
                      )}
                    </div>

                    <form onSubmit={submitFirewall} className="mt-5">
                      <label className="block">
                        <span className="mb-2 block text-[10px] uppercase tracking-[0.18em] text-[#ffbde5]/60">
                          recovered key
                        </span>
                        <div className={`flex items-center border bg-black/70 ${
                          firewallError
                            ? 'border-red-400 shadow-[0_0_20px_rgba(248,113,113,0.35)]'
                            : 'border-[#ff73c7]/35 focus-within:border-[#ff73c7] focus-within:shadow-[0_0_24px_rgba(255,20,147,0.24)]'
                        }`}>
                          <span className="border-r border-[#ff73c7]/20 px-3 text-[#ff73c7]">&gt;_</span>
                          <input
                            type="text"
                            value={firewallInput}
                            onChange={(event) => {
                              setFirewallInput(event.target.value);
                              setFirewallError(false);
                            }}
                            placeholder="enter final key"
                            className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-[#ffe6f7] caret-[#ff73c7] outline-none placeholder:text-[#ff73c7]/35"
                          />
                        </div>
                      </label>

                      {firewallError && (
                        <p className="mt-3 text-xs text-red-300">
                          [BYPASS_FAILED] Key rejected. Run another trace or check the hint.
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={firewallUnlocking}
                        className="mt-4 w-full border border-[#ff73c7]/60 bg-[#ff1493] px-4 py-3 text-xs font-black uppercase tracking-[0.18em] text-black shadow-[0_0_24px_rgba(255,20,147,0.30)] transition hover:bg-[#ff73c7] disabled:cursor-wait disabled:opacity-75"
                      >
                        bypass firewall
                      </button>
                    </form>
                  </div>
                </div>
              ) : !handshakeComplete ? (
                <div className="border border-[#ff73c7]/25 bg-[#08000f]/85 p-5 text-center shadow-[0_0_28px_rgba(255,20,147,0.16)] sm:p-7">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#ff73c7]">
                    final_handshake_required
                  </p>
                  <h3 className="mt-3 text-2xl font-black uppercase text-white">
                    connect the nodes in order
                  </h3>
                  <p className="mt-4 text-xs leading-6 text-[#ffbde5]/70">
                    establish the secure connection sequence before decrypting the final letter.
                  </p>

                  <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {handshakeNodes.map((node, index) => {
                      const active = handshakeProgress.includes(node);
                      const next = handshakeProgress.length === index;

                      return (
                        <button
                          key={node}
                          type="button"
                          onClick={() => handleHandshake(node)}
                          className={`relative border px-3 py-4 text-xs font-black uppercase tracking-[0.14em] transition duration-300 ${
                            active
                              ? 'border-[#ff73c7] bg-[#ff1493] text-black shadow-[0_0_26px_rgba(255,20,147,0.52)]'
                              : next
                                ? 'border-[#ff73c7]/60 bg-[#ff1493]/12 text-[#ffe6f7] shadow-[0_0_18px_rgba(255,20,147,0.22)] hover:bg-[#ff1493]/25'
                                : 'border-[#ff73c7]/20 bg-black/45 text-[#ffbde5]/45 hover:border-[#ff73c7]/55 hover:text-[#ffbde5]'
                          }`}
                        >
                          {node}
                          {index < handshakeNodes.length - 1 && (
                            <span className={`pointer-events-none absolute -right-3 top-1/2 hidden h-px w-3 -translate-y-1/2 sm:block ${
                              handshakeProgress.length > index + 1 ? 'bg-[#ff73c7] shadow-[0_0_12px_#ff73c7]' : 'bg-[#ff73c7]/20'
                            }`} />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-5 border border-[#ff73c7]/20 bg-black/50 p-4 text-left text-xs leading-6 text-[#ffbde5]/70">
                    {handshakeError ? (
                      <p className="text-red-300">
                        <span className="text-red-300">&gt;</span> handshake failed. connection reset.
                      </p>
                    ) : handshakeProgress.length === 0 ? (
                      <p><span className="text-[#ff73c7]">&gt;</span> waiting for first node...</p>
                    ) : (
                      <p>
                        <span className="text-[#ff73c7]">&gt;</span> connected: {handshakeProgress.join(' -> ')}
                      </p>
                    )}
                  </div>
                </div>
              ) : !letterOpen ? (
                <div className="text-center">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#ff73c7]">
                    handshake accepted / connection stable
                  </p>
                  <button
                    type="button"
                    onClick={() => setLetterOpen(true)}
                    className="mt-5 border border-[#ff73c7]/60 bg-[#ff1493] px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-black shadow-[0_0_26px_rgba(255,20,147,0.34)] transition hover:bg-[#ff73c7] hover:shadow-[0_0_40px_rgba(255,20,147,0.55)]"
                  >
                    decrypt final letter
                  </button>
                </div>
              ) : (
                <div className="space-y-6 text-sm leading-7 text-[#ffe6f7] sm:text-base sm:leading-8">
                  {futureMessage.map((paragraph) => (
                    <p key={paragraph} className="whitespace-pre-line">
                      <DecryptedText
                        text={paragraph}
                        animate={letterOpen}
                        speed={10}
                        className="text-[#ffbde5]"
                      />
                    </p>
                  ))}
                  <div className="border border-[#ff73c7]/25 bg-black/45 p-4 font-mono text-xs leading-6 text-[#ffbde5] shadow-[0_0_28px_rgba(255,20,147,0.14)] sm:text-sm">
                    {terminalClosure.map((line) => (
                      <p key={line}>
                        <DecryptedText
                          text={line}
                          animate={letterOpen}
                          speed={14}
                          className="text-[#ff73c7]"
                        />
                      </p>
                    ))}
                  </div>
                  <p className="border-t border-[#ff73c7]/20 pt-5 text-xs uppercase tracking-[0.18em] text-[#ff73c7]">
                    [ future file saved: us.forever ]
                  </p>
                </div>
              )}
            </div>
          </section>

          <footer className="border-t border-[#ff73c7]/20 py-5 text-center text-[10px] uppercase tracking-[0.22em] text-[#ffbde5]/50">
            end_of_capsule // extracted_for_nyong
          </footer>

          {capsuleOpen && (
            <section className={`fixed bottom-3 left-3 z-30 w-[calc(100vw-1.5rem)] animate-[hackerMaterialize_0.75s_steps(5,end)_forwards] border border-[#ff73c7]/35 bg-[#06000b]/90 shadow-[0_0_30px_rgba(255,20,147,0.22)] backdrop-blur-xl sm:bottom-5 sm:left-5 ${
              heartbeatMinimized ? 'max-w-sm p-3' : 'max-w-xs p-3.5'
            }`}>
              {heartbeatMinimized ? (
                <button
                  type="button"
                  onClick={() => setHeartbeatMinimized(false)}
                  className="flex w-full items-center gap-3 text-left"
                  aria-label="Maximize heartbeat log"
                >
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#ff73c7] shadow-[0_0_14px_#ff73c7]" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[10px] uppercase tracking-[0.19em] text-[#ff73c7]">
                      heartbeat_log
                    </span>
                    <span className="mt-1 block truncate text-[11px] leading-5 text-[#ffbde5]/75">
                      <span className="text-[#ff73c7]">&gt;</span> {latestHeartbeatLog}
                    </span>
                  </span>
                  <span className="border border-[#ff73c7]/30 px-2 py-1 text-[10px] uppercase tracking-[0.11em] text-[#ffbde5]/70">
                    ^
                  </span>
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => collectFragment('frag_04')}
                    aria-label="Collect heartbeat log fragment"
                    title="The log is emitting a heart signal"
                    className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center border text-xs transition duration-300 ${
                      isFragmentCollected('frag_04')
                        ? 'border-[#ff73c7] bg-[#ff1493] text-black shadow-[0_0_24px_rgba(255,20,147,0.60)]'
                        : 'border-[#ff73c7]/25 bg-black/55 text-[#ff73c7]/65 shadow-[0_0_18px_rgba(255,20,147,0.16)] hover:scale-110 hover:border-[#ff73c7] hover:text-[#ffbde5]'
                    }`}
                  >
                    ♥
                  </button>
                  <div className="flex items-center justify-between gap-3 border-b border-[#ff73c7]/20 pb-3 pr-10">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#ff73c7] shadow-[0_0_14px_#ff73c7]" />
                      <p className="text-xs uppercase tracking-[0.2em] text-[#ff73c7]">
                        heartbeat_log
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setHeartbeatMinimized(true)}
                      className="border border-[#ff73c7]/25 px-2 py-1 text-[10px] uppercase tracking-[0.11em] text-[#ffbde5]/65 transition hover:border-[#ff73c7]/60 hover:text-[#ffbde5]"
                    >
                      -
                    </button>
                  </div>
                  <div className="mt-3 max-h-36 space-y-2 overflow-hidden text-[11px] leading-5 text-[#ffbde5]/75 sm:max-h-none">
                    {heartbeatLogs.map((log) => (
                      <p key={log} className="animate-[heartbeatLine_0.28s_ease-out_forwards]">
                        <span className="text-[#ff73c7]">&gt;</span> {log}
                      </p>
                    ))}
                  </div>
                </>
              )}
            </section>
          )}

          {capsuleOpen && (
            <div className="group fixed bottom-4 right-4 z-30 flex animate-[catMaterialize_0.85s_steps(6,end)_forwards] flex-col items-end gap-2 sm:bottom-6 sm:right-6">
              {letterOpen ? (
                <div className="relative mr-3 max-w-64 animate-[fragmentReveal_0.5s_ease-out_forwards] border border-[#ff73c7]/45 bg-[#06000b]/95 px-4 py-3 text-center text-[11px] font-semibold lowercase leading-5 tracking-[0.1em] text-[#ffbde5] shadow-[0_0_34px_rgba(255,20,147,0.34)] after:absolute after:-bottom-2 after:right-5 after:h-3 after:w-3 after:rotate-45 after:border-b after:border-r after:border-[#ff73c7]/35 after:bg-[#06000b]">
                  <p>happy 1st anniversary</p>
                  <p className="text-[#ff73c7]">epo ❤︎ acca</p>
                </div>
              ) : catCollecting ? (
                <div className="relative mr-3 w-64 animate-[fragmentReveal_0.4s_ease-out_forwards] border border-[#ff73c7]/40 bg-[#06000b]/95 p-3 text-left text-[10px] leading-5 tracking-[0.12em] text-[#ffbde5]/85 shadow-[0_0_28px_rgba(255,20,147,0.30)] after:absolute after:-bottom-2 after:right-5 after:h-3 after:w-3 after:rotate-45 after:border-b after:border-r after:border-[#ff73c7]/35 after:bg-[#06000b]">
                  <p><span className="text-[#ff73c7]">&gt;</span> fragment detected</p>
                  <p><span className="text-[#ff73c7]">&gt;</span> collecting data...</p>
                  <div className="my-2 h-2 overflow-hidden bg-[#2b0626]">
                    <div className="h-full animate-[loading_1.8s_ease-in-out_forwards] bg-gradient-to-r from-[#ff1493] via-[#f3c6f2] to-[#c71585]" />
                  </div>
                  <p><span className="text-[#ff73c7]">&gt;</span> fragment acquired</p>
                  <p className="mt-2 text-[#ff73c7]">&quot;hehe~ you got it! ♡&quot;</p>
                </div>
              ) : catReadyToDeliver && !isFragmentCollected('frag_05') ? (
                <div className="relative mr-3 max-w-56 animate-[fragmentReveal_0.45s_ease-out_forwards] border border-[#ff73c7]/40 bg-[#06000b]/95 p-3 text-left text-[10px] leading-5 tracking-[0.12em] text-[#ffbde5]/85 shadow-[0_0_28px_rgba(255,20,147,0.30)] after:absolute after:-bottom-2 after:right-5 after:h-3 after:w-3 after:rotate-45 after:border-b after:border-r after:border-[#ff73c7]/35 after:bg-[#06000b]">
                  <p>you want this?</p>
                  <p>then come get it~ ♡</p>
                </div>
              ) : (
                <span className="relative mr-3 max-w-48 border border-[#ff73c7]/35 bg-[#06000b]/95 px-3 py-2 text-left text-[10px] tracking-[0.14em] text-[#ffbde5]/80 opacity-0 shadow-[0_0_24px_rgba(255,20,147,0.22)] transition duration-300 after:absolute after:-bottom-2 after:right-5 after:h-3 after:w-3 after:rotate-45 after:border-b after:border-r after:border-[#ff73c7]/35 after:bg-[#06000b] group-hover:-translate-y-1 group-hover:opacity-100">
                  {catBubbleText}
                </span>
              )}
              <button
                type="button"
                onClick={playWithCat}
                aria-label="Play with pink cat mascot"
                title="Tap the cat 10 times"
                className={`relative block h-36 w-32 animate-[catIdle_2.8s_ease-in-out_infinite] outline-none transition duration-300 group-hover:-translate-y-2 group-hover:rotate-1 group-hover:scale-105 sm:h-40 sm:w-36 ${
                  catClicks > 0 && !isFragmentCollected('frag_05') ? 'cat-wiggle' : ''
                }`}
              >
                <span className="absolute bottom-0 left-3 right-3 h-6 bg-[#2b0626]/70 blur-xl" />
                <span className="absolute right-0 top-20 h-12 w-8 rounded-r-full border-4 border-[#4a052f] border-l-0 bg-[#ff73c7] shadow-[0_0_16px_rgba(255,115,199,0.55)] transition duration-300 group-hover:-rotate-12" />
                <span className="absolute bottom-3 left-6 right-6 h-16 border-4 border-[#4a052f] bg-[#ff73c7] shadow-[0_0_30px_rgba(255,115,199,0.55)]" />
                <span className="absolute bottom-1 left-8 h-5 w-5 border-4 border-[#4a052f] bg-[#f3c6f2]" />
                <span className="absolute bottom-1 right-8 h-5 w-5 border-4 border-[#4a052f] bg-[#f3c6f2]" />
                <span className="absolute left-2 top-8 h-9 w-9 rotate-[-18deg] border-4 border-[#4a052f] bg-[#ff73c7] shadow-[0_0_16px_rgba(255,115,199,0.55)]" />
                <span className="absolute right-2 top-8 h-9 w-9 rotate-[18deg] border-4 border-[#4a052f] bg-[#ff73c7] shadow-[0_0_16px_rgba(255,115,199,0.55)]" />
                <span className="absolute left-5 top-11 h-4 w-4 rotate-[-18deg] bg-[#f3c6f2]" />
                <span className="absolute right-5 top-11 h-4 w-4 rotate-[18deg] bg-[#f3c6f2]" />
                <span className="absolute left-4 right-4 top-12 h-20 border-4 border-[#4a052f] bg-[#ff73c7] shadow-[0_0_34px_rgba(255,115,199,0.68)]" />
                <span className="absolute left-9 top-[74px] h-3 w-3 bg-[#180017] transition duration-200 group-hover:h-1 group-hover:translate-y-1" />
                <span className="absolute right-9 top-[74px] h-3 w-3 bg-[#180017] transition duration-200 group-hover:h-1 group-hover:translate-y-1" />
                <span className="absolute left-1/2 top-[90px] h-2 w-2 -translate-x-1/2 bg-[#c71585]" />
                <span className="absolute left-[49px] top-[104px] h-1 w-4 bg-[#4a052f] transition duration-200 group-hover:left-[47px] group-hover:w-5" />
                <span className="absolute right-[49px] top-[104px] h-1 w-4 bg-[#4a052f] transition duration-200 group-hover:right-[47px] group-hover:w-5" />
                <span className="absolute left-0 top-[88px] h-1 w-7 bg-[#f3c6f2]" />
                <span className="absolute left-1 top-[99px] h-1 w-8 bg-[#f3c6f2]" />
                <span className="absolute right-0 top-[88px] h-1 w-7 bg-[#f3c6f2]" />
                <span className="absolute right-1 top-[99px] h-1 w-8 bg-[#f3c6f2]" />
              </button>

              {catReadyToDeliver && !catCollecting && (
                <div className="absolute right-24 top-16 flex items-center gap-2 sm:right-28">
                  {!isFragmentCollected('frag_05') && (
                    <span className="animate-[fragmentReveal_0.45s_ease-out_forwards] border border-[#ff73c7]/30 bg-black/85 px-2 py-1 text-[9px] tracking-[0.12em] text-[#ffbde5]/75 shadow-[0_0_18px_rgba(255,20,147,0.20)]">
                      fragment signal ♡
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={collectCatFragment}
                    disabled={isFragmentCollected('frag_05') || catCollecting}
                    aria-label="Collect final fragment from pink cat mascot"
                    title="Collect the final fragment"
                    className={`flex aspect-square h-10 w-10 shrink-0 items-center justify-center border text-sm transition duration-300 ${
                      isFragmentCollected('frag_05')
                        ? 'border-[#ff73c7] bg-[#ff1493] text-black shadow-[0_0_24px_rgba(255,20,147,0.60)]'
                        : catCollecting
                          ? 'cursor-wait border-[#ff73c7]/40 bg-[#ff1493]/20 text-[#ffbde5]/60 shadow-[0_0_18px_rgba(255,20,147,0.28)]'
                          : 'animate-[fragmentReveal_0.5s_ease-out_forwards] border-[#ff73c7]/70 bg-[#ff1493]/30 text-[#ffbde5] shadow-[0_0_26px_rgba(255,20,147,0.52)] hover:-translate-x-2 hover:-translate-y-2 hover:bg-[#ff1493] hover:text-black'
                    }`}
                  >
                    ♥
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <style jsx global>{`
        @keyframes loading {
          from { width: 0%; }
          to { width: 100%; }
        }

        @keyframes heartbeatPopup {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes heartbeatLine {
          from {
            opacity: 0;
            transform: translateX(-8px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes hackBoot {
          0%, 100% {
            opacity: 0.68;
            filter: hue-rotate(0deg);
          }
          50% {
            opacity: 1;
            filter: hue-rotate(18deg);
          }
        }

        @keyframes hackerMaterialize {
          0% {
            opacity: 0;
            clip-path: inset(0 100% 86% 0);
            transform: translate(-18px, 12px) skewX(-8deg);
          }
          35% {
            opacity: 0.5;
            clip-path: inset(0 25% 48% 0);
            transform: translate(8px, -4px) skewX(6deg);
          }
          62% {
            opacity: 0.78;
            clip-path: inset(0 8% 18% 0);
            transform: translate(-4px, 2px) skewX(-3deg);
          }
          100% {
            opacity: 1;
            clip-path: inset(0 0 0 0);
            transform: translate(0, 0) skewX(0deg);
          }
        }

        @keyframes catMaterialize {
          0% {
            opacity: 0;
            filter: blur(3px) drop-shadow(0 0 0 rgba(255, 115, 199, 0));
            transform: translate(18px, 18px) scale(0.82);
          }
          34% {
            opacity: 0.45;
            filter: blur(1px) drop-shadow(0 0 18px rgba(255, 115, 199, 0.55));
            transform: translate(-8px, 4px) scale(1.04);
          }
          68% {
            opacity: 0.75;
            filter: blur(0) drop-shadow(0 0 28px rgba(255, 20, 147, 0.45));
            transform: translate(4px, -3px) scale(0.98);
          }
          100% {
            opacity: 1;
            filter: blur(0) drop-shadow(0 0 18px rgba(255, 115, 199, 0.35));
            transform: translate(0, 0) scale(1);
          }
        }

        @keyframes catIdle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .cat-wiggle {
          animation:
            catWiggle 0.42s ease-in-out,
            catIdle 2.8s ease-in-out infinite 0.42s;
        }

        @keyframes catWiggle {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-3px) rotate(-4deg);
          }
          60% {
            transform: translateY(-6px) rotate(4deg);
          }
        }

        @keyframes fragmentReveal {
          from {
            opacity: 0;
            transform: translate(18px, 12px) scale(0.4);
          }
          to {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
        }
      `}</style>
    </main>
  );
}
