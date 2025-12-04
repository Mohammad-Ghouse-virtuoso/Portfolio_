import { useEffect } from 'react';
import { useMotionValue } from "framer-motion";

export function useMousePosition() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Calculate normalized position (-1 to 1)
      const xPos = (e.clientX / innerWidth) - 0.5;
      const yPos = (e.clientY / innerHeight) - 0.5;
      
      x.set(xPos * 2); // Range: -1 to 1
      y.set(yPos * 2);
    };

    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, [x, y]);

  return { x, y };
}
