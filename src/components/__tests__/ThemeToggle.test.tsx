import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeToggle } from '../ThemeToggle';

const mockToggleTheme = jest.fn();
const mockUseTheme = jest.fn();

jest.mock('@/hooks/useTheme', () => ({
  useTheme: () => mockUseTheme(),
}));

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders sun icon when theme is light', () => {
    mockUseTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('🌙');
    expect(button).toHaveAttribute('aria-label', 'Mudar para tema escuro');
  });

  it('renders moon icon when theme is dark', () => {
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('🌞');
    expect(button).toHaveAttribute('aria-label', 'Mudar para tema claro');
  });

  it('calls toggleTheme when clicked', () => {
    mockUseTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it('handles multiple clicks correctly', () => {
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockToggleTheme).toHaveBeenCalledTimes(3);
  });

  it('has correct accessibility attributes', () => {
    mockUseTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label');
    expect(button.getAttribute('aria-label')).toContain('tema');
  });

  it('uses icon variant for button', () => {
    mockUseTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('cursor-pointer');
  });

  it('matches snapshot with light theme', () => {
    mockUseTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    const { container } = render(<ThemeToggle />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot with dark theme', () => {
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      toggleTheme: mockToggleTheme,
    });

    const { container } = render(<ThemeToggle />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('updates icon when theme changes', () => {
    const { rerender } = render(<ThemeToggle />);

    mockUseTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });
    rerender(<ThemeToggle />);

    expect(screen.getByRole('button')).toHaveTextContent('🌙');

    mockUseTheme.mockReturnValue({
      theme: 'dark',
      toggleTheme: mockToggleTheme,
    });
    rerender(<ThemeToggle />);

    expect(screen.getByRole('button')).toHaveTextContent('🌞');
  });
});
