import React from "react";
import { Input as ShadInput } from "./ui/input";

type InputProps = {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder: string;
	className: string;
};

const Input: React.FC<InputProps> = ({
	value,
	onChange,
	placeholder,
	className,
}) => (
	<ShadInput
		value={value}
		onChange={onChange}
		placeholder={placeholder}
		className={className}
	/>
);

export default Input;
