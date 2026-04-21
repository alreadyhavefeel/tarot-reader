import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '@/app/components/Button';

describe('Button', () => {
  it('renders the provided buttonText', () => {
    render(
      <Button
        index={3}
        type="work"
        clickReader={() => {}}
        buttonText="ทำนาย"
      />
    );
    expect(screen.getByRole('button', { name: 'ทำนาย' })).toBeInTheDocument();
  });

  it('calls clickReader with index and type on click', async () => {
    const user = userEvent.setup();
    const clickReader = jest.fn();
    render(
      <Button
        index={5}
        type="love"
        clickReader={clickReader}
        buttonText="ทำนาย"
      />
    );
    await user.click(screen.getByRole('button', { name: 'ทำนาย' }));
    expect(clickReader).toHaveBeenCalledTimes(1);
    expect(clickReader).toHaveBeenCalledWith(5, 'love');
  });

  it('forwards null index to clickReader so upstream validation can reject', async () => {
    const user = userEvent.setup();
    const clickReader = jest.fn();
    render(
      <Button
        index={null}
        type="work"
        clickReader={clickReader}
        buttonText="ทำนาย"
      />
    );
    await user.click(screen.getByRole('button', { name: 'ทำนาย' }));
    expect(clickReader).toHaveBeenCalledWith(null, 'work');
  });
});
