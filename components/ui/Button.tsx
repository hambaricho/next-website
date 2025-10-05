
interface ButtonProps {
    text: string
    className?: string
    onClick?: () => void
}

const Button = ({ text, className, onClick }: ButtonProps) => {
    return (
        <button
            className={`uppercase cursor-pointer hover:scale-105 transition duration-300 px-7 md:px-10 pt-2 pb-1.5 md:text-2xl font-[SuisseIntl-Regular] ${className}`}
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export default Button