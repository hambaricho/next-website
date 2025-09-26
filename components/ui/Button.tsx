
interface ButtonProps {
    text: string
    className?: string
}

const Button = ({ text, className }: ButtonProps) => {
    return (
        <button
            className={`uppercase px-7 md:px-14 pt-3 pb-2 md:text-3xl font-[SuisseIntl-Regular] ${className}`}
        >
            {text}
        </button>
    )
}

export default Button