import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import QuoteTicker from '../QuoteTicker';

describe('QuoteTicker', () => {
  it('renders the quote text', () => {
    render(<QuoteTicker />);
    // Check for any of the quotes in the rotation
    const quote = screen.getByText(/To improve is to change|If you want to know who controls you|I can bear any pain/i);
    expect(quote).toBeInTheDocument();
  });

  it('renders an author name', () => {
    render(<QuoteTicker />);
    // Check for any author
    const author = screen.getByText(/Churchill|Voltaire|Labatut|Altman|Murakami|Jung/i);
    expect(author).toBeInTheDocument();
  });

  it('renders progress dots for navigation', () => {
    render(<QuoteTicker />);
    // Should have 6 dots for 6 quotes
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(6);
  });
});
