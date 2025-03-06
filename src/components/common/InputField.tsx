import React, {ChangeEventHandler, useCallback, useEffect, useState} from 'react';
import IconRegistry from "./icons/IconRegistry.tsx";
import Icon from "./icons/Icon.tsx";

type InputFieldProps = {
    label?: string;
    notice?: {
        icon?: keyof typeof IconRegistry;
        detail: string;
        color?: string;
    };
    placeholder?: string;
    dropdown: boolean;
    viewonly?: boolean;
    fetchSuggestions?: (query: string) => Promise<string[]>;
    value: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputField: React.FC<InputFieldProps> = ({
                                                   label,
                                                   notice,
                                                   placeholder,
                                                   dropdown,
                                                   viewonly,
                                                   fetchSuggestions,
                                                   value,
                                                   ...props
                                               }) => {
    const [inputValue, setInputValue] = useState(value || "");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        if (dropdown) setShowDropdown(true);
    }, [inputValue]);

    useEffect(() => {
        setInputValue(value || "");
    }, [value]);

    useEffect(() => {
        if (dropdown && fetchSuggestions && inputValue.trim()) {
            fetchSuggestions(inputValue).then(setSuggestions);
        } else {
            setSuggestions([]);
        }
    }, [inputValue, dropdown, fetchSuggestions]);

    const onTagBlur = useCallback(() => {
        setTimeout(() => setShowDropdown(false), 200)
    }, []);

    const onValueChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setInputValue(e.currentTarget.value);
        if (props?.onChange) props.onChange(e);
    }

    return (
        <div className="relative w-full">
            {label && <p className="text-black text-base">{label}</p>}

            <div className="relative">
                <input
                    className={`w-full border-b border-black py-2 px-3 text-base text-black focus:outline-none ${
                        viewonly ? "bg-gray-100 text-gray-500 cursor-not-allowed pointer-events-none" : "bg-white"
                    }`}
                    {...(placeholder ? {placeholder} : {})}
                    readOnly={viewonly}
                    value={inputValue}
                    onChange={onValueChange}
                    onBlur={onTagBlur}
                    {...props}
                />

                {dropdown && showDropdown && suggestions.length > 0 && (
                    <ul className="absolute w-full bg-white border border-gray-300 rounded-md shadow-md max-h-40 overflow-y-auto mt-1 z-10">
                        {suggestions.map((item, index) => (
                            <li
                                key={index}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-black"
                                onMouseDown={() => {
                                    setInputValue(item);
                                    setShowDropdown(false);
                                }}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {notice && (
                <div className="flex items-center mt-2">
                    {notice.icon && (
                        <span className="mr-2">
                            <Icon name={notice.icon} size={16}/>
                        </span>
                    )}
                    <span
                        className={`text-sm ${notice.color == "black" ? 'text-black' : `text-${notice.color}-500`}`}>{notice.detail}</span>
                </div>
            )}
        </div>
    );
};

export default InputField;
