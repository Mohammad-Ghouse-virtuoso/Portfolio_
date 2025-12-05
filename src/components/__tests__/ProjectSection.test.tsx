import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProjectSection from '../ProjectSection';
import { projects } from '../../data/portfolioData';

describe('ProjectSection', () => {
  it('renders section title', () => {
    render(<ProjectSection />);
    expect(screen.getByText('Selected Works')).toBeInTheDocument();
  });

  it('renders all projects from data', () => {
    render(<ProjectSection />);
    
    projects.forEach(project => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
      expect(screen.getByText(project.desc)).toBeInTheDocument();
      expect(screen.getByText(project.ascii)).toBeInTheDocument();
    });
  });

  it('renders tech stack tags', () => {
    render(<ProjectSection />);
    
    projects.forEach(project => {
      project.tech.forEach(tech => {
        // There might be multiple projects with same tech, so getAllByText
        const tags = screen.getAllByText(tech);
        expect(tags.length).toBeGreaterThan(0);
      });
    });
  });

  it('opens modal on project click', () => {
    render(<ProjectSection />);
    
    const firstProject = projects[0];
    
    // We need to find the clickable element. SpotlightCard passes onClick to motion.div
    // Let's click the title to be safe as it bubbles up
    fireEvent.click(screen.getByText(firstProject.title));
    
    // Modal should appear
    // Note: ProjectModal implementation details might vary, but usually it renders title in a dialog/overlay
    // Assuming ProjectModal renders the title again in a larger font or specific modal structure
    // Since we don't have ProjectModal code, let's assume it renders the title.
    // However, the title is already on screen. We should check for something unique to modal or just that it's in the document.
    // Let's check if the "impact" text is visible, assuming it's shown in modal (it is in the data)
    // Wait, impact is not in the card view? Let's check ProjectSection.tsx again.
    // In ProjectSection.tsx: impact is NOT rendered in the card. It IS in the data.
    // So if we click, and modal opens, we should see the impact text.
    
    expect(screen.getByText(firstProject.impact)).toBeInTheDocument();
  });
});
