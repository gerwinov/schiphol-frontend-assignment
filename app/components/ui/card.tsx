const Root = (
    props: React.ComponentProps<'div'> & {
        direction: 'vertical' | 'horizontal'
    }
) => (
    <div
        className={`flex flex-${props.direction === 'horizontal' ? 'row' : 'col'} bg-white rounded-sm p-4 gap-4 mb-2`}
        {...props}
    >
        {props.children}
    </div>
)

const Header = (props: React.ComponentProps<'div'>) => (
    <div className="flex flex-col" {...props}>
        {props.children}
    </div>
)

const Body = (props: React.ComponentProps<'div'>) => (
    <div className="flex-1 flex-col" {...props}>
        {props.children}
    </div>
)

const Footer = (props: React.ComponentProps<'div'>) => (
    <div className="flex flex-col" {...props}>
        {props.children}
    </div>
)

export const Card = {Root, Header, Body, Footer}
