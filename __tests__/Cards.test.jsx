import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cards from '@/app/components/Cards';

describe('Cards', () => {
  it('renders the card image with alt text', () => {
    render(
      <Cards
        imageBack="/back.jpg"
        imageFront="/front.jpg"
        index={0}
        onSelect={() => {}}
        isSelected={false}
      />
    );
    expect(screen.getByAltText('Tarot Card')).toBeInTheDocument();
  });

  it('calls onSelect when clicked', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    render(
      <Cards
        imageBack="/back.jpg"
        imageFront="/front.jpg"
        index={2}
        onSelect={onSelect}
        isSelected={false}
      />
    );
    await user.click(screen.getByAltText('Tarot Card'));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('flips forward (raises z-index) when clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Cards
        imageBack="/back.jpg"
        imageFront="/front.jpg"
        index={2}
        onSelect={() => {}}
        isSelected={false}
      />
    );
    const wrapper = container.firstChild;
    expect(wrapper).toHaveStyle({ zIndex: '1' });
    await user.click(screen.getByAltText('Tarot Card'));
    expect(wrapper).toHaveStyle({ zIndex: '2' });
  });

  it('resets flipped state when isSelected becomes false', async () => {
    const user = userEvent.setup();
    const { container, rerender } = render(
      <Cards
        imageBack="/back.jpg"
        imageFront="/front.jpg"
        index={2}
        onSelect={() => {}}
        isSelected={true}
      />
    );
    const wrapper = container.firstChild;
    await user.click(screen.getByAltText('Tarot Card'));
    expect(wrapper).toHaveStyle({ zIndex: '2' });

    rerender(
      <Cards
        imageBack="/back.jpg"
        imageFront="/front.jpg"
        index={2}
        onSelect={() => {}}
        isSelected={false}
      />
    );
    expect(wrapper).toHaveStyle({ zIndex: '1' });
  });
});
