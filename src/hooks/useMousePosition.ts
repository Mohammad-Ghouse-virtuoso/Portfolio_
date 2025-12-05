import { useEffect, useRef } from 'react';
import { useMotionValue } from "framer-motion";

export function useMousePosition() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      // Throttle updates to animation frames (60fps max)
      if (rafId.current !== null) return;
      
      rafId.current = requestAnimationFrame(() => {
        const { innerWidth, innerHeight } = window;
        // Calculate normalized position (-1 to 1)
        const xPos = (e.clientX / innerWidth) - 0.5;
        const yPos = (e.clientY / innerHeight) - 0.5;
        
        x.set(xPos * 2); // Range: -1 to 1
        y.set(yPos * 2);
        rafId.current = null;
      });
    };

    window.addEventListener("mousemove", updateMouse, { passive: true });
    return () => {
      window.removeEventListener("mousemove", updateMouse);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [x, y]);

  return { x, y };
}
