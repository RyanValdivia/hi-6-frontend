import React from "react";

interface InputLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}
const InputLabel = React.forwardRef<HTMLInputElement, InputLabelProps>(({ label, id, ...props }, ref) => {
    const inputId = id || Math.random().toString(36).substring(7);

    return (
        <div className="relative">
            <label htmlFor={inputId} className="relative block overflow-hidden border-b border-muted bg-transparent pt-3 focus-within:border-primary">
                <input ref={ref} id={inputId} {...props} className={`peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm ${props.className || ""}`} />
                <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-basic transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">{label}</span>
            </label>
        </div>
    );
});

InputLabel.displayName = "InputLabel";

export default InputLabel;
