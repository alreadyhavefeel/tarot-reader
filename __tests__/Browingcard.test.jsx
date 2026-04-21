import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Browingcard from '@/app/components/Browingcard';

const cardFixture = {
  card_id: 1,
  name: 'The Fool',
  name_th: 'คนโง่',
  image_url: '/img/cards/The Fool.png',
  description: 'A new beginning',
  work_meaning: 'A fresh start at work',
  money_meaning: 'Be careful with finances',
  love_meaning: 'New romantic chapter',
  health_meaning: 'Energy and vitality',
};

function mockFetchOnce(data) {
  global.fetch = jest.fn().mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve(data),
  });
}

afterEach(() => {
  if (global.fetch && global.fetch.mockRestore) {
    global.fetch.mockRestore();
  }
  delete global.fetch;
});

describe('Browingcard', () => {
  it('renders a Loading... state before the fetch resolves', () => {
    global.fetch = jest.fn(() => new Promise(() => {})); // never resolves
    render(
      <Browingcard
        clickBack={() => {}}
        cardSelected={{ index: 1, typeCard: 'work' }}
      />
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('fetches the card by index from the API', async () => {
    mockFetchOnce(cardFixture);
    render(
      <Browingcard
        clickBack={() => {}}
        cardSelected={{ index: 1, typeCard: 'work' }}
      />
    );
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3001/api/cards/1'
    );
  });

  it.each([
    ['work', 'A fresh start at work'],
    ['money', 'Be careful with finances'],
    ['love', 'New romantic chapter'],
    ['health', 'Energy and vitality'],
  ])('renders the %s meaning once loaded', async (typeCard, expected) => {
    mockFetchOnce(cardFixture);
    render(
      <Browingcard
        clickBack={() => {}}
        cardSelected={{ index: 1, typeCard }}
      />
    );
    expect(await screen.findByText(expected)).toBeInTheDocument();
  });

  it('renders the card name and Thai name once loaded', async () => {
    mockFetchOnce(cardFixture);
    render(
      <Browingcard
        clickBack={() => {}}
        cardSelected={{ index: 1, typeCard: 'work' }}
      />
    );
    expect(await screen.findByText('The Fool')).toBeInTheDocument();
    expect(screen.getByText('คนโง่')).toBeInTheDocument();
  });

  it('invokes clickBack when the back button is pressed', async () => {
    const user = userEvent.setup();
    mockFetchOnce(cardFixture);
    const clickBack = jest.fn();
    render(
      <Browingcard
        clickBack={clickBack}
        cardSelected={{ index: 1, typeCard: 'work' }}
      />
    );
    const backBtn = await screen.findByRole('button', {
      name: 'ทำนายอีกครั้ง',
    });
    await user.click(backBtn);
    expect(clickBack).toHaveBeenCalledTimes(1);
  });

  it('returns an empty meaning string for an unknown typeCard (default branch)', async () => {
    mockFetchOnce(cardFixture);
    render(
      <Browingcard
        clickBack={() => {}}
        cardSelected={{ index: 1, typeCard: 'unknown' }}
      />
    );
    // Once the card name renders we know the component has finished loading.
    await screen.findByText('The Fool');
    // None of the meaning strings should be shown for an unknown type.
    expect(screen.queryByText('A fresh start at work')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Be careful with finances')
    ).not.toBeInTheDocument();
    expect(screen.queryByText('New romantic chapter')).not.toBeInTheDocument();
    expect(screen.queryByText('Energy and vitality')).not.toBeInTheDocument();
  });
});
