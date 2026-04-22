import { render, screen } from '@testing-library/react';
import { __setMediaQueryMatch, __resetMediaQuery } from 'react-responsive';
import Header from '@/app/components/Header';

afterEach(() => {
  __resetMediaQuery();
});

describe('Header', () => {
  it('renders the logo text at every breakpoint', () => {
    __setMediaQueryMatch({ minWidth1224: true });
    render(<Header />);
    expect(screen.getByText('MY LOGO')).toBeInTheDocument();
  });

  it('renders the full desktop nav links', () => {
    __setMediaQueryMatch({ minWidth1224: true });
    render(<Header />);
    expect(
      screen.getByRole('link', { name: /what’s tarot/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /support us/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /about us/i })
    ).toBeInTheDocument();
  });

  it('renders the full desktop nav links on tablet too', () => {
    __setMediaQueryMatch({ tablet: true });
    render(<Header />);
    expect(
      screen.getByRole('link', { name: /what’s tarot/i })
    ).toBeInTheDocument();
  });

  it('collapses nav into a menu button on mobile', () => {
    __setMediaQueryMatch({ mobile: true });
    render(<Header />);
    expect(screen.getByAltText('menu')).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: /what’s tarot/i })
    ).not.toBeInTheDocument();
  });

  it('renders nothing when no breakpoint matches (e.g. SSR pre-hydration)', () => {
    __setMediaQueryMatch({});
    const { container } = render(<Header />);
    expect(container.querySelector('header')).toBeNull();
  });
});
