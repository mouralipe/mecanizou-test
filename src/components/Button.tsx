interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'icon';
}

export function Button({
  children,
  variant = 'default',
  ...props
}: ButtonProps) {
  if (variant === 'icon') {
    return (
      <button className="cursor-pointer" {...props}>
        {children}
      </button>
    );
  }

  return (
    <button
      className="bg-blue-500 text-white p-2 rounded-md cursor-pointer"
      {...props}
    >
      {children}
    </button>
  );
}
