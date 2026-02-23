import { useState, useEffect, useCallback } from 'react';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export const useTextScramble = (
  finalText: string,
  options: {
    duration?: number;
    delay?: number;
    trigger?: boolean;
  } = {}
) => {
  const { duration = 1500, delay = 0, trigger = true } = options;
  const [displayText, setDisplayText] = useState(finalText);
  const [isScrambling, setIsScrambling] = useState(false);

  const scramble = useCallback(() => {
    if (!trigger) return;
    
    setIsScrambling(true);
    const startTime = Date.now();
    const endTime = startTime + duration;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      let result = '';
      for (let i = 0; i < finalText.length; i++) {
        const charProgress = Math.min(progress * finalText.length, i + 1) / (i + 1);
        
        if (finalText[i] === ' ') {
          result += ' ';
        } else if (charProgress >= 1) {
          result += finalText[i];
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      
      setDisplayText(result);

      if (now < endTime) {
        requestAnimationFrame(animate);
      } else {
        setDisplayText(finalText);
        setIsScrambling(false);
      }
    };

    setTimeout(() => {
      requestAnimationFrame(animate);
    }, delay);
  }, [finalText, duration, delay, trigger]);

  useEffect(() => {
    if (trigger) {
      scramble();
    }
  }, [trigger, scramble]);

  return { displayText, isScrambling, scramble };
};

export default useTextScramble;
