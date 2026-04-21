import { render, screen } from '@testing-library/react';
import Footer from '@/app/components/Footer';

describe('Footer', () => {
  it('renders the copyright notice', () => {
    render(<Footer />);
    expect(
      screen.getByText(/Copyright © 2024 by Tarot Thailand/i)
    ).toBeInTheDocument();
  });

  it('renders inside a <footer> landmark', () => {
    const { container } = render(<Footer />);
    expect(container.querySelector('footer')).not.toBeNull();
  });
});
