import { useEffect, useRef } from 'react';

export const FlowingBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Flowing blobs - turquoise/cyan theme
    const blobs = [
      { x: 0.25, y: 0.35, radius: 350, color: 'rgba(45, 212, 191, 0.35)', speed: 0.00025 },
      { x: 0.75, y: 0.55, radius: 400, color: 'rgba(14, 165, 233, 0.28)', speed: 0.00035 },
      { x: 0.5, y: 0.45, radius: 450, color: 'rgba(34, 211, 238, 0.22)', speed: 0.0002 },
      { x: 0.15, y: 0.65, radius: 300, color: 'rgba(6, 182, 212, 0.18)', speed: 0.0004 },
      { x: 0.85, y: 0.25, radius: 320, color: 'rgba(20, 184, 166, 0.18)', speed: 0.0003 },
    ];

    const animate = () => {
      time += 1;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      blobs.forEach((blob, index) => {
        const centerX = canvas.width * blob.x + Math.sin(time * blob.speed + index * 2) * 80;
        const centerY = canvas.height * blob.y + Math.cos(time * blob.speed * 1.2 + index) * 60;

        const gradient = ctx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, blob.radius
        );
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(0.4, blob.color.replace(/[\d.]+\)$/, '0.08)'));
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(centerX, centerY, blob.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ background: 'black' }}
    />
  );
};

export default FlowingBackground;
