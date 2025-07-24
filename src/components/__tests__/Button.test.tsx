import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from '../Button';

describe('Button Component', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole('button', { name: /click me/i })
    ).toBeInTheDocument();
  });

  it('renders default variant correctly', () => {
    render(<Button>Default</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'bg-blue-500',
      'px-3',
      'py-2',
      'text-white',
      'rounded-md'
    );
  });

  it('renders outline variant correctly', () => {
    render(<Button variant="outline">Outline</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'px-3',
      'py-2',
      'border',
      'border-gray-300',
      'rounded-md'
    );
    expect(button).not.toHaveClass('bg-blue-500', 'text-white');
  });

  it('renders icon variant correctly', () => {
    render(<Button variant="icon">🎯</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('cursor-pointer');
    expect(button).not.toHaveClass('bg-blue-500', 'px-3', 'py-2');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('handles disabled state', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('applies custom props correctly', () => {
    render(
      <Button data-testid="custom-button" type="submit">
        Submit
      </Button>
    );
    const button = screen.getByTestId('custom-button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('matches snapshot for default variant', () => {
    const { container } = render(<Button>Default Button</Button>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot for outline variant', () => {
    const { container } = render(
      <Button variant="outline">Outline Button</Button>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot for icon variant', () => {
    const { container } = render(<Button variant="icon">🎯</Button>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
