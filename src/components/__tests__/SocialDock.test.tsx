import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SocialDock from '../SocialDock';

describe('SocialDock', () => {
  it('renders all social links', () => {
    render(<SocialDock />);
    
    // Check for 4 links (Github, Twitter, Linkedin, Mail)
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(4);
  });

  it('links have correct attributes for security', () => {
    render(<SocialDock />);
    
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('renders correct hrefs', () => {
    render(<SocialDock />);
    
    const links = screen.getAllByRole('link');
    const hrefs = links.map(link => link.getAttribute('href'));
    
    expect(hrefs).toContain('https://github.com/Mohammad-Ghouse-virtuoso');
    expect(hrefs).toContain('https://x.com/MohVirtuoso_');
    expect(hrefs).toContain('https://www.linkedin.com/in/mohammad-ghouse-0bb138209/');
    expect(hrefs).toContain('mailto:shaikmohammod109@gmail.com');
  });
});
