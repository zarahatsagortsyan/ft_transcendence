import React, { useEffect, useRef, useState } from 'react';
import './Game.css';

const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ballPosition, setBallPosition] = useState({ x: 0, y: 0 });
  const [paddlePosition, setPaddlePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw ball
      context.beginPath();
      context.arc(ballPosition.x, ballPosition.y, 10, 0, Math.PI * 2);
      context.fillStyle = '#0095DD';
      context.fill();
      context.closePath();

      // Draw paddle
      context.beginPath();
      context.rect(paddlePosition.x, canvas.height - 10, 80, 10);
      context.fillStyle = '#0095DD';
      context.fill();
      context.closePath();

      // Update ball position
      setBallPosition((prevPosition) => ({
        x: prevPosition.x + 2,
        y: prevPosition.y + 2,
      }));

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    setPaddlePosition({ x: x - 40, y: canvas.height - 10 });
  };

  return (
    <div className="game-container">
      <h1>Ping Pong Game</h1>
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        onMouseMove={handleMouseMove}
      />
    </div>
  );
};

export default Game;
