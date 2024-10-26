import React from 'react';
import { Button as ShadButton } from './ui/button';

type ButtonProps = {
  onClick: () => void;
  label: string;
};

const Button: React.FC<ButtonProps> = ({ onClick, label }) => (
  <ShadButton onClick={onClick} className="w-full">
    {label}
  </ShadButton>
);

export default Button;
