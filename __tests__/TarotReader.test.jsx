import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('@/app/components/PreReader', () => ({
  __esModule: true,
  default: ({ clickReader }) => (
    <div data-testid="prereader">
      <button
        data-testid="select-null"
        onClick={() => clickReader(null, null)}
      >
        select-null
      </button>
      <button
        data-testid="select-valid"
        onClick={() => clickReader(4, 'love')}
      >
        select-valid
      </button>
    </div>
  ),
}));

jest.mock('@/app/components/Browingcard', () => ({
  __esModule: true,
  default: ({ clickBack, cardSelected }) => (
    <div data-testid="browingcard">
      <span data-testid="card-index">{cardSelected.index}</span>
      <span data-testid="card-type">{cardSelected.typeCard}</span>
      <button data-testid="back" onClick={clickBack}>
        back
      </button>
    </div>
  ),
}));

import TarotReading from '@/app/components/TarotReader';

describe('TarotReading', () => {
  it('initially renders PreReader and not Browingcard', () => {
    render(<TarotReading />);
    expect(screen.getByTestId('prereader')).toBeInTheDocument();
    expect(screen.queryByTestId('browingcard')).not.toBeInTheDocument();
  });

  it('rejects null index selections and keeps the PreReader mounted', async () => {
    const user = userEvent.setup();
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<TarotReading />);
    await user.click(screen.getByTestId('select-null'));

    expect(alertSpy).toHaveBeenCalledWith('Please select a card');
    expect(screen.getByTestId('prereader')).toBeInTheDocument();
    expect(screen.queryByTestId('browingcard')).not.toBeInTheDocument();

    alertSpy.mockRestore();
    errSpy.mockRestore();
  });

  it('advances to Browingcard with index+1 and typeCard on valid selection', async () => {
    const user = userEvent.setup();
    render(<TarotReading />);
    await user.click(screen.getByTestId('select-valid'));

    expect(screen.getByTestId('browingcard')).toBeInTheDocument();
    expect(screen.getByTestId('card-index')).toHaveTextContent('5');
    expect(screen.getByTestId('card-type')).toHaveTextContent('love');
  });

  it('returns to PreReader when clickBack is invoked', async () => {
    const user = userEvent.setup();
    render(<TarotReading />);
    await user.click(screen.getByTestId('select-valid'));
    expect(screen.getByTestId('browingcard')).toBeInTheDocument();

    await user.click(screen.getByTestId('back'));
    expect(screen.getByTestId('prereader')).toBeInTheDocument();
    expect(screen.queryByTestId('browingcard')).not.toBeInTheDocument();
  });
});
