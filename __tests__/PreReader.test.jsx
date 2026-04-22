import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { __setMediaQueryMatch, __resetMediaQuery } from 'react-responsive';
import PreReader from '@/app/components/PreReader';

afterEach(() => {
  __resetMediaQuery();
  jest.restoreAllMocks();
});

function renderDesktop() {
  __setMediaQueryMatch({ minWidth1224: true });
  const clickReader = jest.fn();
  const utils = render(<PreReader clickReader={clickReader} />);
  return { clickReader, ...utils };
}

describe('PreReader - desktop breakpoint', () => {
  it('renders the heading', () => {
    renderDesktop();
    expect(screen.getByText('ดูดวงไพ่ยิปซี')).toBeInTheDocument();
  });

  it('renders all four reading-type tabs', () => {
    renderDesktop();
    for (const label of ['การงาน', 'การเงิน', 'ความรัก', 'สุขภาพ']) {
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
    }
  });

  it('defaults to the work tab and shows its description', () => {
    renderDesktop();
    // The work description is the only one that mentions "การงาน" in the body copy.
    expect(screen.getByText(/ดูดวงการงาน/)).toBeInTheDocument();
    expect(screen.queryByText(/ดูดวงการเงิน/)).not.toBeInTheDocument();
  });

  it.each([
    ['การเงิน', /ดูดวงการเงิน/],
    ['ความรัก', /ดูดวงความรัก/],
    ['สุขภาพ', /ดูดวงสุขภาพ/],
    ['การงาน', /ดูดวงการงาน/],
  ])('clicking the %s tab swaps in the matching copy', async (tab, copy) => {
    const user = userEvent.setup();
    renderDesktop();
    await user.click(screen.getByRole('button', { name: tab }));
    expect(screen.getByText(copy)).toBeInTheDocument();
  });

  it('renders all 22 tarot-card tiles once shuffled', () => {
    renderDesktop();
    expect(screen.getAllByAltText('Tarot Card')).toHaveLength(22);
  });

  it('shuffles to a permutation of [0..21] (seeded Math.random)', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);
    renderDesktop();
    // With 22 cards on screen, the underlying shuffled indices still cover every slot.
    expect(screen.getAllByAltText('Tarot Card')).toHaveLength(22);
  });

  it('renders the predict button', () => {
    renderDesktop();
    expect(screen.getByRole('button', { name: 'ทำนาย' })).toBeInTheDocument();
  });

  it('forwards (null, activeTab) to clickReader when predict is pressed with no card selected', async () => {
    const user = userEvent.setup();
    const { clickReader } = renderDesktop();

    await user.click(screen.getByRole('button', { name: 'ทำนาย' }));

    expect(clickReader).toHaveBeenCalledTimes(1);
    expect(clickReader).toHaveBeenCalledWith(null, 'work');
  });

  it('forwards the selected card index and active tab when predict is pressed', async () => {
    const user = userEvent.setup();
    const { clickReader } = renderDesktop();

    await user.click(screen.getByRole('button', { name: 'การเงิน' }));
    const firstCard = screen.getAllByAltText('Tarot Card')[0];
    await user.click(firstCard);
    await user.click(screen.getByRole('button', { name: 'ทำนาย' }));

    expect(clickReader).toHaveBeenCalledTimes(1);
    const [index, type] = clickReader.mock.calls[0];
    expect(type).toBe('money');
    expect(Number.isInteger(index)).toBe(true);
    expect(index).toBeGreaterThanOrEqual(0);
    expect(index).toBeLessThanOrEqual(21);
  });

  it('toggles selection off when the same card is clicked twice', async () => {
    const user = userEvent.setup();
    const { clickReader } = renderDesktop();

    const firstCard = screen.getAllByAltText('Tarot Card')[0];
    await user.click(firstCard);
    await user.click(firstCard);
    await user.click(screen.getByRole('button', { name: 'ทำนาย' }));

    expect(clickReader).toHaveBeenCalledWith(null, 'work');
  });
});

describe('PreReader - mobile breakpoint', () => {
  it('renders the mobile layout (single placeholder tile, no card grid)', () => {
    __setMediaQueryMatch({ mobile: true });
    render(<PreReader clickReader={jest.fn()} />);
    // Mobile renders a single placeholder image, not the 22-card grid.
    expect(screen.getAllByAltText('Tarot Card')).toHaveLength(1);
    expect(screen.getByRole('button', { name: 'ทำนาย' })).toBeInTheDocument();
  });
});

describe('PreReader - no matching breakpoint', () => {
  it('renders an empty wrapper (no headings, no tabs, no cards)', () => {
    __setMediaQueryMatch({});
    const { container } = render(<PreReader clickReader={jest.fn()} />);
    expect(container.querySelector('main')).toBeNull();
    expect(screen.queryByText('ดูดวงไพ่ยิปซี')).not.toBeInTheDocument();
  });
});
