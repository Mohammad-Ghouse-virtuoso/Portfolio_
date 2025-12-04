import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SpotlightCard from '../SpotlightCard';

describe('SpotlightCard', () => {
  it('renders children correctly', () => {
    render(
      <SpotlightCard>
        <div>Test Content</div>
      </SpotlightCard>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('updates opacity on mouse enter and leave', () => {
    render(
      <SpotlightCard>
        <div>Hover Me</div>
      </SpotlightCard>
    );

    const content = screen.getByText('Hover Me');
    // content is inside the inner div which has 'relative' class.
    // The outer motion.div also has 'relative' class.
    // closest('div.relative') will return the inner div.
    const innerDiv = content.closest('div.relative');
    const card = innerDiv?.parentElement;
    
    if (card) {
        const overlay = card.querySelector('.pointer-events-none');
        expect(overlay).toBeInTheDocument();
        
        // Check initial opacity
        expect(overlay).toHaveStyle({ opacity: '0' });

        fireEvent.mouseEnter(card);
        expect(overlay).toHaveStyle({ opacity: '1' });

        fireEvent.mouseLeave(card);
        expect(overlay).toHaveStyle({ opacity: '0' });
    }
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(
      <SpotlightCard onClick={handleClick}>
        <div>Click Me</div>
      </SpotlightCard>
    );

    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
