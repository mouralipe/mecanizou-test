interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'icon' | 'outline';
}

export function Button({
  children,
  variant = 'default',
  ...props
}: ButtonProps) {
  if (variant === 'icon') {
    return (
      <button className={`cursor-pointer`} {...props}>
        {children}
      </button>
    );
  }

  if (variant === 'outline') {
    return (
      <button
        className="cursor-pointer px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md disabled:opacity-50"
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className={`bg-blue-500 px-3 py-2 border border-gray-300 dark:border-gray-600 text-white rounded-md cursor-pointer`}
      {...props}
    >
      {children}
    </button>
  );
}
