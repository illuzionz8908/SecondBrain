const variantStyles = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-300 text-purple-600",
};

const sizeStyles = {
  sm: "px-2 py-1",
  md: "px-4 py-2",
  lg: "px-6 py-3",
};

const defaultStyles = "rounded-md";

export const Button = ({
  variant = "primary",
  size = "md",
  text,
  startIcon,
  onClick,
  fullWidth = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${variantStyles[variant] || variantStyles.primary} ${defaultStyles} ${
        sizeStyles[size] || sizeStyles.md
      } ${fullWidth ? "w-full" : ""} cursor-pointer`}
    >
      <div className="flex gap-2 justify-center items-center">
        {startIcon}
        {text}
      </div>
    </button>
  );
};