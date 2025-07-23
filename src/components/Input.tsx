import { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ ...props }: InputProps) {
  return <input className="border border-gray-300 rounded-md p-2" {...props} />;
}
