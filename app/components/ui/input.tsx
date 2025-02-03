export const Input = (props: React.ComponentProps<'input'>) => (
    <input
        // More of these should be configurable, e.g. colors.
        className="w-full bg-white placeholder:text-grey-storm text-sm rounded-sm px-4 py-3 outline-1 outline-transparent transition duration-200 ease focus:outline-afternoon-blue"
        type={props.type}
        {...props}
    />
)
