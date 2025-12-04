import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import InspirationSection from '../InspirationSection';
import { inspirations } from '../../data/portfolioData';

describe('InspirationSection', () => {
  it('renders the section title', () => {
    render(<InspirationSection />);
    expect(screen.getByText('Inspiration')).toBeInTheDocument();
    expect(screen.getByText('04')).toBeInTheDocument();
  });

  it('renders tab switcher with Mentors and Library options', () => {
    render(<InspirationSection />);
    
    expect(screen.getByText('Mentors')).toBeInTheDocument();
    expect(screen.getByText('Library')).toBeInTheDocument();
  });

  it('renders mentor items by default', () => {
    render(<InspirationSection />);
    
    // First 4 items are mentors, displayed by default
    const mentors = inspirations.slice(0, 4);
    mentors.forEach(item => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  it('switches to books when Library tab is clicked', async () => {
    render(<InspirationSection />);
    
    const libraryTab = screen.getByText('Library');
    fireEvent.click(libraryTab);
    
    // Books are items 4-7
    const books = inspirations.slice(4, 8);
    books.forEach(item => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });
});
