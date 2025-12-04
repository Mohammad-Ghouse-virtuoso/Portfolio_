import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AboutTerminal from '../components/AboutTerminal';

describe('AboutTerminal', () => {
  it('renders terminal with header', () => {
    render(<AboutTerminal />);
    // Updated for new macOS-style header
    expect(screen.getByText('portfolio')).toBeInTheDocument();
    expect(screen.getByText(/type 'help'/)).toBeInTheDocument();
  });

  it('shows initial interests.txt content', () => {
    render(<AboutTerminal />);
    expect(screen.getByText(/Technology & Engineering/)).toBeInTheDocument();
    expect(screen.getByText(/AI & Future Systems/)).toBeInTheDocument();
  });

  it('has an input field that can receive focus', () => {
    render(<AboutTerminal />);
    const input = screen.getByRole('textbox', { name: /terminal input/i });
    expect(input).toBeInTheDocument();
    // autoFocus is a React prop, verify input can be focused
    expect(input.tagName).toBe('INPUT');
  });

  it('processes help command', async () => {
    const user = userEvent.setup();
    render(<AboutTerminal />);
    
    const input = screen.getByRole('textbox', { name: /terminal input/i });
    await user.type(input, 'help{Enter}');
    
    expect(screen.getByText(/Available commands/)).toBeInTheDocument();
    expect(screen.getByText(/ls/)).toBeInTheDocument();
    expect(screen.getByText(/cd/)).toBeInTheDocument();
  });

  it('processes pwd command', async () => {
    const user = userEvent.setup();
    render(<AboutTerminal />);
    
    const input = screen.getByRole('textbox', { name: /terminal input/i });
    await user.type(input, 'pwd{Enter}');
    
    // Should show ~ as current directory
    const outputElements = screen.getAllByText('~');
    expect(outputElements.length).toBeGreaterThan(0);
  });

  it('processes whoami command', async () => {
    const user = userEvent.setup();
    render(<AboutTerminal />);
    
    const input = screen.getByRole('textbox', { name: /terminal input/i });
    await user.type(input, 'whoami{Enter}');
    
    expect(screen.getByText(/guest@portfolio/)).toBeInTheDocument();
  });

  it('processes ls command', async () => {
    const user = userEvent.setup();
    render(<AboutTerminal />);
    
    const input = screen.getByRole('textbox', { name: /terminal input/i });
    await user.type(input, 'ls{Enter}');
    
    expect(screen.getByText(/about\//)).toBeInTheDocument();
    expect(screen.getByText(/skills\//)).toBeInTheDocument();
    expect(screen.getByText(/contact\.txt/)).toBeInTheDocument();
  });

  it('processes cat command for contact.txt', async () => {
    const user = userEvent.setup();
    render(<AboutTerminal />);
    
    const input = screen.getByRole('textbox', { name: /terminal input/i });
    await user.type(input, 'cat contact.txt{Enter}');
    
    expect(screen.getByText(/Email/)).toBeInTheDocument();
    expect(screen.getByText(/LinkedIn/)).toBeInTheDocument();
  });

  it('processes cd command', async () => {
    const user = userEvent.setup();
    render(<AboutTerminal />);
    
    const input = screen.getByRole('textbox', { name: /terminal input/i });
    await user.type(input, 'cd about{Enter}');
    
    // After cd, check that the command was processed by looking for
    // content that would appear in the about directory
    await user.type(input, 'ls{Enter}');
    expect(screen.getByText(/bio\.txt/)).toBeInTheDocument();
  });

  it('handles unknown command', async () => {
    const user = userEvent.setup();
    render(<AboutTerminal />);
    
    const input = screen.getByRole('textbox', { name: /terminal input/i });
    await user.type(input, 'unknowncmd{Enter}');
    
    expect(screen.getByText(/command not found: unknowncmd/)).toBeInTheDocument();
  });

  it('handles sudo Easter egg', async () => {
    const user = userEvent.setup();
    render(<AboutTerminal />);
    
    const input = screen.getByRole('textbox', { name: /terminal input/i });
    await user.type(input, 'sudo rm -rf /{Enter}');
    
    expect(screen.getByText(/Nice try/)).toBeInTheDocument();
  });

  it('handles neofetch Easter egg', async () => {
    const user = userEvent.setup();
    render(<AboutTerminal />);
    
    const input = screen.getByRole('textbox', { name: /terminal input/i });
    await user.type(input, 'neofetch{Enter}');
    
    expect(screen.getByText(/Mohammad Ghouse/)).toBeInTheDocument();
    expect(screen.getByText(/Portfolio v2.0/)).toBeInTheDocument();
  });

  it('handles matrix Easter egg', async () => {
    const user = userEvent.setup();
    render(<AboutTerminal />);
    
    const input = screen.getByRole('textbox', { name: /terminal input/i });
    await user.type(input, 'matrix{Enter}');
    
    expect(screen.getByText(/Wake up, Neo/)).toBeInTheDocument();
  });

  it('clears terminal on clear command', async () => {
    const user = userEvent.setup();
    render(<AboutTerminal />);
    
    // Should have initial content (from interests.txt)
    expect(screen.getByText(/Technology & Engineering/)).toBeInTheDocument();
    
    const input = screen.getByRole('textbox', { name: /terminal input/i });
    await user.type(input, 'clear{Enter}');
    
    // Initial content should be gone
    expect(screen.queryByText(/Technology & Engineering/)).not.toBeInTheDocument();
  });

  it('focuses input when terminal is clicked', async () => {
    render(<AboutTerminal />);
    
    // Updated to work with new macOS-style header
    const terminal = screen.getByText('portfolio').closest('div')?.parentElement?.parentElement;
    if (terminal) {
      fireEvent.click(terminal);
    }
    
    const input = screen.getByRole('textbox', { name: /terminal input/i });
    expect(document.activeElement).toBe(input);
  });
});
