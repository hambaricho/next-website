
interface ButtonProps {
    text: string
    className?: string
}

const Button = ({ text, className }: ButtonProps) => {
    return (
        <button
            className={`uppercase cursor-pointer hover:scale-105 transition duration-300 px-7 md:px-10 pt-2 pb-1.5 md:text-2xl font-[SuisseIntl-Regular] ${className}`}
        >
            {text}
        </button>
    )
}

export default Button