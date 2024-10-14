import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import './AnimatedText.css';

const AnimatedText = () => {
  const textRef = useRef(null);

  const wrapTextInSpans = (text) => {
    return text.split('').map((letter, index) => (
      <span
        key={index}
        className={`letter ${letter === ' ' ? 'space' : `letter-${index}`}`}
      >
        {letter === ' ' ? '\u00A0 \u00A0' : letter}
      </span>
    ));
  };

  const text = 'DROX LABS';

  useGSAP(() => {
    const letters = textRef.current.querySelectorAll('.text-front .letter');
    const backLetters1 = textRef.current.querySelectorAll('.text-back-1 .letter');
    const backLetters2 = textRef.current.querySelectorAll('.text-back-2 .letter');
    const backLetters3 = textRef.current.querySelectorAll('.text-back-3 .letter');

    const animateLetters = (letterGroup, scaleY, duration) => {
      letterGroup.forEach((letter, index) => {
        gsap.fromTo(
          letter,
          { scaleY: 1, scaleX: 1, y: 0 },  // Starting properties
          {
            scaleY,  // Scale ups
            duration,  // Duration of the animation
            yoyo: true,  // Reverse back to the starting properties
            repeat: 1,  // Repeat the animation once
            delay: 0.05 * (index + 1),  // Delay before starting the animation
            ease: 'power4.out',
          }
        );
      });
    };

    animateLetters(letters, 4.5, 0.62);
    animateLetters(backLetters1, 4.5, 0.59);
    animateLetters(backLetters2, 4.5, 0.56);
    animateLetters(backLetters3, 4.5, 0.53);
  }, [textRef]);

  return (
    <div className="text-container" ref={textRef}>
      <div className="text-layer text-back-3">{wrapTextInSpans(text)}</div>
      <div className="text-layer text-back-2">{wrapTextInSpans(text)}</div>
      <div className="text-layer text-back-1">{wrapTextInSpans(text)}</div>
      <div className="text-layer text-front">{wrapTextInSpans(text)}</div>
    </div>
  );
};

export default AnimatedText;
