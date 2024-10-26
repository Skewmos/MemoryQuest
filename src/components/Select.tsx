import React from 'react';
import {
  Select as ShadSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

const Select: React.FC<SelectProps> = ({ options, value, onChange }) => {
  return (
    <ShadSelect onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Choisissez un niveau" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Niveau</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </ShadSelect>
  );
};

export default Select;
