const buttonVariants = {
  cart: "bg-blue-500 text-white h-8 w-8 ",
  checkout: "bg-blue-500 text-white py-2",
};

type ButtonProps = {
  text: string;
  variant?: keyof typeof buttonVariants;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
export function Button({
  text,
  onClick,
  variant,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`rounded-lg hover:opacity-90 disabled:bg-gray-500 ${
        variant ? buttonVariants[variant] : ""
      } ${className}`}
      onClick={onClick}
      {...rest}
    >
      {text}
    </button>
  );
}
