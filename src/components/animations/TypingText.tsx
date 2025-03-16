'use client';

import { useEffect, useState } from 'react';

interface TypingTextProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenTexts?: number;
}

const TypingText = ({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenTexts = 1000,
}: TypingTextProps) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingDelay, setTypingDelay] = useState(typingSpeed);

  useEffect(() => {
    const currentText = texts[loopNum % texts.length];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      setTypingDelay(deletingSpeed);
      timer = setTimeout(() => {
        setDisplayText(currentText.substring(0, displayText.length - 1));
      }, typingDelay);
    } else {
      setTypingDelay(typingSpeed);
      timer = setTimeout(() => {
        setDisplayText(currentText.substring(0, displayText.length + 1));
      }, typingDelay);
    }

    // Check if we're done typing the current text
    if (!isDeleting && displayText === currentText) {
      // Start deleting after a delay
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, delayBetweenTexts);
    } else if (isDeleting && displayText === '') {
      // Move to next text
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, texts, typingSpeed, deletingSpeed, delayBetweenTexts, typingDelay]);

  return (
    <span className="inline relative">
      {displayText}
      <span className={`inline-block w-[0.1em] h-[1.2em] bg-primary-500 ml-1 align-middle ${isDeleting ? 'animate-pulse-slow' : 'animate-pulse'}`}></span>
    </span>
  );
};

export default TypingText;
