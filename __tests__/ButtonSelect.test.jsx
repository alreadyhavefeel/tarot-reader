import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ButtonSelect from '@/app/components/ButtonSelect';

describe('ButtonSelect', () => {
  it('renders the readingType label', () => {
    render(<ButtonSelect readingType="การงาน" onClick={() => {}} />);
    expect(
      screen.getByRole('button', { name: 'การงาน' })
    ).toBeInTheDocument();
  });

  it('invokes onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<ButtonSelect readingType="สุขภาพ" onClick={onClick} />);
    await user.click(screen.getByRole('button', { name: 'สุขภาพ' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
