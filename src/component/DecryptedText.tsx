// @ts-nocheck
'use client';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import type { HTMLMotionProps } from 'motion/react';
export default function DecryptedText({
  text,
  speed = 50,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;":,.<>/?',
  className = '',
  parentClassName = '',
  revealDelay = 0, 
  animate = false, // Pemicu dari tombol YES
  onFinished = () => {}, // Memberitahu parent jika sudah selesai
  ...props
}) {
  const [displayText, setDisplayText] = useState('');
  const revealedCountRef = useRef(0);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const onFinishedRef = useRef(onFinished);

  // Update ref setiap kali onFinished berubah
  useEffect(() => {
    onFinishedRef.current = onFinished;
  }, [onFinished]);

  // 1. Tampilan awal: Langsung acak (Locked State)
  useEffect(() => {
    const initialScramble = text
      .split('')
      .map((char) => (char === ' ' ? ' ' : characters[Math.floor(Math.random() * characters.length)]))
      .join('');
    setDisplayText(initialScramble);
  }, [text, characters]);

  // 2. Logika Dekripsi saat tombol YES diklik
  useEffect(() => {
    if (!animate) {
      // Reset jika tidak animate
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      revealedCountRef.current = 0;
      return;
    }

    // Tunggu selama revealDelay, kemudian mulai decrypt
    timeoutRef.current = setTimeout(() => {
      revealedCountRef.current = 0;
      
      intervalRef.current = setInterval(() => {
        revealedCountRef.current += 1;
        const revealed = revealedCountRef.current;
        
        // Update display
        setDisplayText(
          text
            .split('')
            .map((char, i) => {
              if (char === ' ') return ' ';
              if (i < revealed) return char;
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join('')
        );

        // Cek apakah semua sudah terreveal
        if (revealed >= text.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setDisplayText(text);
          onFinishedRef.current();
        }
      }, speed);
    }, revealDelay);

    // Cleanup
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      revealedCountRef.current = 0;
    };
  }, [animate, text, speed, characters, revealDelay]);

  return (
    <span className={parentClassName} {...props}>
      <span className={className}>{displayText}</span>
    </span>
  );
}