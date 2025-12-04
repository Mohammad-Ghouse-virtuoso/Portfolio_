import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AsciiHero from '../AsciiHero';

// Mock useMousePosition to return objects compatible with Framer Motion's useTransform
vi.mock('../../hooks/useMousePosition', () => ({
  useMousePosition: () => ({
    x: { 
      get: () => 0, 
      onChange: () => () => {},
      on: () => () => {},
      set: () => {},
      attach: () => {},
      destroy: () => {}
    },
    y: { 
      get: () => 0, 
      onChange: () => () => {},
      on: () => () => {},
      set: () => {},
      attach: () => {},
      destroy: () => {}
    }
  })
}));

describe('AsciiHero', () => {
  it('renders the main title', () => {
    render(<AsciiHero />);
    // Text is split due to glitch effect span, check for parts
    expect(screen.getByText(/Hej! I'm/i)).toBeInTheDocument();
    expect(screen.getByText(/Mohammad/)).toBeInTheDocument();
    expect(screen.getByText('Ghouse')).toBeInTheDocument();
  });

  it('renders greeting', () => {
    render(<AsciiHero />);
    expect(screen.getByText(/Hej!/i)).toBeInTheDocument();
  });

  it('renders system status', () => {
    render(<AsciiHero />);
    expect(screen.getByText(/SYSTEM_READY/i)).toBeInTheDocument();
  });

  it('renders the bio text', () => {
    render(<AsciiHero />);
    expect(screen.getByText(/Architecting digital voids/i)).toBeInTheDocument();
  });

  it('renders skill tags', () => {
    render(<AsciiHero />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('WebGL')).toBeInTheDocument();
    expect(screen.getByText('Design')).toBeInTheDocument();
  });
});
