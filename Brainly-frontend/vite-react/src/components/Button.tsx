 
type Variants = "primary" | "secondary";

interface ButtonProps {
    variant: Variants;
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: any;
    onClick? : () => void;
    fullWidth? : boolean;
}

const variantStyles = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-300 text-purple-600"
}

const sizeStyles = {
    "sm": "px-2 py-1",
    "md": "px-4 py-2",
    "lg": "px-6 py-3"
}

const defaultStyles = "rounded-md";

export const Button = (props: ButtonProps) => {
    return <button onClick={props.onClick} className={`${variantStyles[props.variant]} 
    ${defaultStyles} ${sizeStyles[props.size]} ${props.fullWidth ? "w-full" : ""} cursor-pointer`}>
        <div className="flex gap-2 justify-center items-center">
            {props.startIcon}
            {props.text}
        </div>
    </button>
}

