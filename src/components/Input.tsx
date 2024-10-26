import React from 'react';
import {Input as ShadInput} from './ui/input';

type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};

const Input: React.FC<InputProps> = ({ value, onChange, placeholder }) => (
  <ShadInput
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full"
  />
);

export default Input;
