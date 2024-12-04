import React from 'react';
import { Button as ShadButton } from './ui/button';

type ButtonProps = {
  onClick: () => void;
  label: string;
  className: string;
};

const Button: React.FC<ButtonProps> = ({ onClick, label, className }) => (
  <ShadButton onClick={onClick} className={className}>
    {label}
  </ShadButton>
);

export default Button;
