import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../Input';

describe('Input Component', () => {
  it('renders input element', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(<Input placeholder="Enter your name" />);
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });

  it('renders with value', () => {
    render(<Input value="Test value" readOnly />);
    expect(screen.getByDisplayValue('Test value')).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    render(<Input data-testid="test-input" />);
    const input = screen.getByTestId('test-input');
    expect(input).toHaveClass('border', 'border-gray-300', 'rounded-md', 'p-2');
  });

  it('handles value changes', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(<Input onChange={handleChange} />);
    const input = screen.getByRole('textbox');

    await user.type(input, 'Hello World');

    expect(handleChange).toHaveBeenCalled();
    expect(input).toHaveValue('Hello World');
  });

  it('handles focus and blur events', async () => {
    const user = userEvent.setup();
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();

    render(<Input onFocus={handleFocus} onBlur={handleBlur} />);
    const input = screen.getByRole('textbox');

    await user.click(input);
    expect(handleFocus).toHaveBeenCalledTimes(1);

    await user.tab();
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('forwards custom props correctly', () => {
    render(
      <Input
        data-testid="custom-input"
        type="email"
        required
        maxLength={50}
        disabled
      />
    );

    const input = screen.getByTestId('custom-input');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('required');
    expect(input).toHaveAttribute('maxLength', '50');
    expect(input).toBeDisabled();
  });

  it('renders different input types correctly', () => {
    const { rerender } = render(<Input type="password" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveAttribute('type', 'password');

    rerender(<Input type="number" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveAttribute('type', 'number');
  });

  it('matches snapshot for basic input', () => {
    const { container } = render(<Input />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot for input with props', () => {
    const { container } = render(
      <Input
        placeholder="Test placeholder"
        type="email"
        value="test@example.com"
        readOnly
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
