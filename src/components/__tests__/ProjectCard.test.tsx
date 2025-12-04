import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProjectCard from '../ProjectCard';

describe('ProjectCard', () => {
  const mockProject = {
    title: 'Test Project',
    desc: 'A test project description',
    ascii: '[*]',
    tech: ['React', 'TypeScript'],
    impact: 'Test impact',
  };

  const mockOnClick = vi.fn();

  it('renders project details correctly', () => {
    render(<ProjectCard project={mockProject} onClick={mockOnClick} />);

    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('A test project description')).toBeInTheDocument();
    expect(screen.getByText('[*]')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    render(<ProjectCard project={mockProject} onClick={mockOnClick} />);

    const card = screen.getByText('Test Project').closest('div.group');
    // The click listener is on the motion.div which is the root element
    // We can find it by text or role if available, or just click the title's parent
    
    if (card) {
        fireEvent.click(card);
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    } else {
        // Fallback if structure is different, try clicking the title
        fireEvent.click(screen.getByText('Test Project'));
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    }
  });
});
