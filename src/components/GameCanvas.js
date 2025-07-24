// src/components/GameCanvas.js
import React, { useRef, useEffect } from 'react';

const GameCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let x = 50;
    let y = 50;
    const speed = 5;

    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp': y -= speed; break;
        case 'ArrowDown': y += speed; break;
        case 'ArrowLeft': x -= speed; break;
        case 'ArrowRight': x += speed; break;
        default: break;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'blue';
      ctx.fillRect(x, y, 30, 30); // player
      requestAnimationFrame(draw);
    };

    window.addEventListener('keydown', handleKeyDown);
    draw();

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return <canvas ref={canvasRef} width={600} height={400} style={{ border: '1px solid black' }} />;
};

export default GameCanvas;