import React, { useRef, useEffect } from 'react';

class Obstacle {
  constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
  }

  update() {
    this.x -= this.speed;
  }

  draw(ctx) {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

const isColliding = (a, b) => {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
};

const GameCanvas = () => {
  const canvasRef = useRef(null);
  const gameOverRef = useRef(false); // ✅ fixes closure bug

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const player = {
      x: 50,
      y: 50,
      width: 30,
      height: 30,
      speed: 5,
    };

    const obstacles = [
      new Obstacle(300, 50, 30, 30, 2),
      new Obstacle(500, 150, 30, 30, 1.5),
    ];

    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp': player.y -= player.speed; break;
        case 'ArrowDown': player.y += player.speed; break;
        case 'ArrowLeft': player.x -= player.speed; break;
        case 'ArrowRight': player.x += player.speed; break;
        default: break;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw player
      ctx.fillStyle = 'blue';
      ctx.fillRect(player.x, player.y, player.width, player.height);

      // Update and draw obstacles
      for (let obs of obstacles) {
        obs.update();
        obs.draw(ctx);

        if (!gameOverRef.current && isColliding(player, obs)) {
          console.log('🔥 COLLISION DETECTED — GAME OVER');
          gameOverRef.current = true;
        }
      }

      requestAnimationFrame(draw);
    };

    window.addEventListener('keydown', handleKeyDown);
    draw();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <canvas ref={canvasRef} width={600} height={400} style={{ border: '2px solid black' }} />;
};

export default GameCanvas;