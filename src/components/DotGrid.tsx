import { useEffect, useRef } from 'react';

const DOT_SPACING = 28;
const DOT_RADIUS = 1;
const RIPPLE_RADIUS = 130;
// Base indigo #818CF8 at different opacities
const DOT_BASE_ALPHA = 0.13;
const DOT_HOVER_ALPHA = 0.75;
const DOT_COLOR_RGB = '129, 140, 248'; // #818CF8

const DotGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let cols = 0;
    let rows = 0;
    let dots: { cx: number; cy: number }[] = [];

    const buildGrid = () => {
      const { offsetWidth: w, offsetHeight: h } = canvas.parentElement!;
      canvas.width = w;
      canvas.height = h;

      // Offset grid so dots aren't flush with the edge
      const offsetX = (w % DOT_SPACING) / 2;
      const offsetY = (h % DOT_SPACING) / 2;

      cols = Math.floor(w / DOT_SPACING) + 1;
      rows = Math.floor(h / DOT_SPACING) + 1;

      dots = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({
            cx: offsetX + c * DOT_SPACING,
            cy: offsetY + r * DOT_SPACING,
          });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const dot of dots) {
        const dx = dot.cx - mouse.current.x;
        const dy = dot.cy - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let alpha = DOT_BASE_ALPHA;
        let radius = DOT_RADIUS;

        if (dist < RIPPLE_RADIUS) {
          // Smooth falloff from hover centre → edge
          const t = 1 - dist / RIPPLE_RADIUS;
          const ease = t * t * (3 - 2 * t); // smoothstep
          alpha = DOT_BASE_ALPHA + (DOT_HOVER_ALPHA - DOT_BASE_ALPHA) * ease;
          radius = DOT_RADIUS + 1.6 * ease;
        }

        ctx.beginPath();
        ctx.arc(dot.cx, dot.cy, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${DOT_COLOR_RGB}, ${alpha.toFixed(3)})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };

    const handleResize = () => {
      buildGrid();
    };

    buildGrid();
    draw();

    const parent = canvas.parentElement!;
    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

export default DotGrid;
