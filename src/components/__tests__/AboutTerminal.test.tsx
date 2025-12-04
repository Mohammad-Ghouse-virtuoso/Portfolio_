import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AboutTerminal from '../AboutTerminal';

describe('AboutTerminal', () => {
  it('renders terminal header', () => {
    render(<AboutTerminal />);
    // Updated to check for new macOS-style header
    expect(screen.getByText('portfolio')).toBeInTheDocument();
    expect(screen.getByText(/type 'help'/i)).toBeInTheDocument();
  });

  it('renders the command input', () => {
    render(<AboutTerminal />);
    expect(screen.getByText('cat interests.txt')).toBeInTheDocument();
  });

  it('renders the bio content', () => {
    render(<AboutTerminal />);
    // Check for new interests content
    expect(screen.getByText(/Technology & Engineering/i)).toBeInTheDocument();
    expect(screen.getByText(/AI & Future Systems/i)).toBeInTheDocument();
  });

  it('renders the blinking cursor', () => {
    render(<AboutTerminal />);
    const cursor = screen.getByText('_');
    expect(cursor).toBeInTheDocument();
    expect(cursor).toHaveClass('animate-pulse');
  });
});
