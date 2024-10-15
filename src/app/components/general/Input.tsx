"use client";
import clsx from "clsx";
import {
	ChangeEvent,
	KeyboardEventHandler,
	useState,
	MouseEventHandler,
	ReactNode,
} from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface ButtonProops {
	children: ReactNode;
	variant: "PRIMARY" | "SECONDARY" | "DISABLE" | "BLACK";
	className?: string;
}

interface FormButtonProps extends ButtonProops {
	onClick?: MouseEventHandler<HTMLButtonElement>;
	type?: "button" | "reset" | "submit";
	isDisabled?: boolean;
}
interface InputProps {
	label?: string;
	placeholder?: string;
	className?: string;
	required?: boolean;
	name?: string;
	value?: string;
	handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
	disabled?: boolean;
	variant?: "Rounded-full" | "Rounded-sm";
}

interface SelectFieldProps {
	label?: string;
	required?: boolean;
	options: { value: string | boolean; label: string }[];
	className?: string;
	value?: string | Array<string>;
	name: string;
	handleChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
	disabled?: boolean;
}

interface TextFieldProps extends InputProps {
	type: "email" | "text" | "password" | "number" | string;
}

export function TextField({
	label,
	placeholder,
	className,
	name,
	required,
	type,
	handleChange,
	value,
	onKeyDown,
	disabled,
	variant,
}: Readonly<TextFieldProps>) {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<div className={clsx("flex flex-col my-6 gap-2", className)}>
			{label && (
				<label
					htmlFor={name}
					className={clsx(
						`first-letter:capitalize ${
							required ? "after:text-red-500 after:content-['*']" : ""
						}`
					)}
				>
					{label}
				</label>
			)}
			<div className="relative">
				{type == "password" && (
					<button
						className="absolute right-3 mt-4 flex items-center px-2 text-neutral-400 hover:text-neutral-500 transition-all"
						type="button"
						onClick={() => setShowPassword(!showPassword)}
					>
						{showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
					</button>
				)}
				<input
					type={showPassword ? "text" : type}
					name={name}
					defaultValue={value}
					placeholder={placeholder}
					onChange={handleChange}
					id={name}
					className={`w-full ${
						variant === "Rounded-sm" ? "rounded-[8px] " : "rounded-full"
					} bg-white border border-stroke shadow-shadow-2 placeholder:text-secondary-text-color text-primary-text-color focus:ring-2 focus:ring-red-light-2 outline-none px-6 py-3 transition-all`}
					required={required}
					onKeyDown={onKeyDown}
					disabled={disabled}
				/>
			</div>
		</div>
	);
}

export function TextArea({
	label,
	placeholder,
	className,
	required,
	name,
	value,
	disabled,
}: Readonly<InputProps>) {
	return (
		<div className={"flex flex-col gap-2 my-6 " + className}>
			{label && (
				<label
					htmlFor={name}
					className={clsx(
						`first-letter:capitalize ${
							required ? "after:text-red-500 after:content-['*']" : ""
						}`
					)}
				>
					{label}
				</label>
			)}
			<textarea
				name={name}
				placeholder={placeholder}
				required={required}
				defaultValue={value}
				id={name}
				className={clsx(
					"w-full rounded-[8px] bg-white border border-stroke shadow-shadow-2 placeholder:text-secondary-text-color text-primary-text-color focus:ring-2 focus:ring-red-light-2 outline-none px-6 py-3 min-h-[160px]",
					disabled ? "cursor-not-allowed" : ""
				)}
				disabled={disabled}
			/>
		</div>
	);
}

export function SelectField({
	label,
	options,
	className,
	required,
	value,
	name,
	handleChange,
	disabled,
}: Readonly<SelectFieldProps>) {
	return (
		<div className={"flex flex-col gap-2 my-6 " + className}>
			{label && (
				<label
					htmlFor={name}
					className={clsx(
						`first-letter:capitalize ${
							required ? "after:text-red-500 after:content-['*']" : ""
						}`
					)}
				>
					{label}
				</label>
			)}
			<select
				name={name}
				defaultValue={value || ""}
				className={clsx(
					"w-full relative rounded-full bg-white border border-stroke shadow-shadow-2 placeholder:text-secondary-text-color text-primary-text-color focus:ring-2 focus:ring-red-light-2 outline-none px-6 py-3",
					disabled ? "cursor-not-allowed" : ""
				)}
				id={name}
				required={required}
				onChange={handleChange}
				disabled={disabled}
			>
				<option value="" disabled selected={!value}>
					Pilih
				</option>
				{options?.map((option, index) => (
					<option value={option.value.toString()} key={index}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
}

export const FormButton = ({
	className,
	variant,
	isDisabled,
	onClick,
	type,
	children,
}: FormButtonProps) => {
	const primary = variant === "PRIMARY";
	const secondary = variant === "SECONDARY";
	const disable = variant === "DISABLE";
	const black = variant === "BLACK";

	if (primary) {
		return (
			<button
				onClick={onClick}
				disabled={isDisabled === true}
				type={type}
				className={clsx(
					"px-6 py-3 bg-primary-color border-2 border-primary-color text-white rounded-full",
					className,
					"transition-all duration-300 ease-in-out",
					"hover:bg-transparent hover:text-primary-color"
				)}
			>
				{children}
			</button>
		);
	}
	if (secondary) {
		return (
			<button
				onClick={onClick}
				disabled={isDisabled === true}
				type={type}
				className={clsx(
					"px-6 py-3 bg-transparent border-2 border-primary-color text-primary-color rounded-full",
					className,
					"transition-all duration-300 ease-in-out",
					"hover:bg-primary-color hover:text-white"
				)}
			>
				{children}
			</button>
		);
	}
	if (disable) {
		return (
			<button
				onClick={onClick}
				disabled={isDisabled === true}
				type={type}
				className={clsx(
					"px-6 py-3 bg-dark-6 border-2 border-dark-6 text-white rounded-full",
					className,
					"transition-all duration-300 ease-in-out"
				)}
			>
				{children}
			</button>
		);
	}
	if (black) {
		return (
			<button
				onClick={onClick}
				disabled={isDisabled === true}
				type={type}
				className={clsx(
					"px-6 py-3 bg-transparent border-2 border-black text-black rounded-full",
					"hover:text-white hover:bg-black",
					className,
					"transition-all duration-300 ease-in-out"
				)}
			>
				{children}
			</button>
		);
	}
};
