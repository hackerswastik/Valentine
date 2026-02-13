import React, { useState, useEffect } from 'react';
import './ValentinesApp.css';

const ValentinesApp = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [confettiPieces, setConfettiPieces] = useState([]);

  const noTexts = [
    "Maybe Later 😊",
    "Are you sure? 🤔",
    "Think again! 💭",
    "But why not? 🥺",
    "Please? 🙏",
    "Just say yes! 😄",
    "Come on! 💖"
  ];

  const moveNoButton = () => {
    const maxX = 200;
    const maxY = 100;
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    setNoButtonPosition({ x: randomX, y: randomY });
    setNoClickCount(prev => prev + 1);
  };

  const createConfetti = () => {
    const newConfetti = [];
    for (let i = 0; i < 50; i++) {
      newConfetti.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: Math.random() * 3 + 2,
        color: ['#fd79a8', '#00b894', '#ffeaa7'][Math.floor(Math.random() * 3)]
      });
    }
    setConfettiPieces(newConfetti);
    
    // Clear confetti after 5 seconds
    setTimeout(() => setConfettiPieces([]), 5000);
  };

  const handleYesClick = () => {
    setShowSuccess(true);
    createConfetti();
  };

  const handleNoButtonInteraction = (e) => {
    e.preventDefault();
    moveNoButton();
  };

  // Sparkle effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (Math.random() < 0.1) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.animation = 'sparkle 1s ease-out forwards';
        sparkle.style.zIndex = '1000';
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="valentines-app">
      {/* Floating hearts background */}
      <div className="hearts-container">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="heart"
            style={{
              left: `${(i + 1) * 10}%`,
              animationDelay: `${-i}s`
            }}
          >
            {['💕', '❤️', '💖'][i % 3]}
          </div>
        ))}
      </div>

      {/* Confetti */}
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti"
          style={{
            left: `${piece.left}vw`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            backgroundColor: piece.color
          }}
        />
      ))}

      <div className="container">
        <div className="love-message">
          In a world full of ordinary moments,<br />
          you make everything feel like magic <span className="heart-emoji">✨</span><br />
          Every heartbeat whispers your name <span className="heart-emoji">💕</span>
        </div>

        <div className="question">
          Will you be my Valentine?
        </div>

        {!showSuccess ? (
          <div className="buttons-container">
            <button
              className="btn btn-yes"
              onClick={handleYesClick}
            >
              Yes, Always! 💕
            </button>
            <button
              className="btn btn-no"
              style={{
                position: 'absolute',
                left: `${noButtonPosition.x}px`,
                top: `${noButtonPosition.y}px`,
                transform: noClickCount > 0 ? 'scale(0.9)' : 'scale(1)'
              }}
              onClick={handleNoButtonInteraction}
              onMouseEnter={handleNoButtonInteraction}
              onFocus={handleNoButtonInteraction}
            >
              {noTexts[noClickCount % noTexts.length]}
            </button>
          </div>
        ) : (
          <div className="success-message">
            <div className="success-title">You've made me the happiest! 🥰</div>
            <div className="location-info">Meet me at:</div>
            <div className="location-info">22nd Floor</div>
            <div className="location-info">C 2205 / 2206</div>
            <div className="love-declaration">I Love You ❤️</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValentinesApp;
