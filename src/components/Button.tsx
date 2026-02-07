import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'large';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyles = 'font-medium rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[#2E8C3B] text-white px-6 py-3 text-[15px] hover:bg-[#267130] shadow-lg shadow-green-200',
    secondary: 'bg-white text-gray-700 px-6 py-3 text-[15px] border-2 border-gray-200 hover:border-[#2E8C3B]',
    large: 'bg-[#2E8C3B] text-white px-8 py-5 text-[20px] font-semibold hover:bg-[#267130] shadow-xl shadow-green-200 min-h-[56px]'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
