import React from "react";
import {
	Select as ShadSelect,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

type Option = {
	label: string;
	value: string;
};

type SelectProps = {
	options: Option[];
	value: string;
	onChange: (value: string) => void;
	className: string;
};

const Select: React.FC<SelectProps> = ({ options, onChange, className }) => {
	return (
		<ShadSelect onValueChange={onChange}>
			<SelectTrigger className={className}>
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
