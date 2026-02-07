import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'glass';
}

export function Card({ children, onClick, className = '', variant = 'glass' }: CardProps) {
  const baseStyles = 'rounded-3xl p-6 transition-all duration-300';

  const variants = {
    default: 'bg-white shadow-lg hover:shadow-xl',
    glass: 'bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:scale-[1.02]'
  };

  const clickable = onClick ? 'cursor-pointer active:scale-95' : '';

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${clickable} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
