import {Links, Meta, Outlet, Scripts, ScrollRestoration} from '@remix-run/react'
import type {LinksFunction} from '@remix-run/node'

import './tailwind.css'
import {Header} from './components/features'

export const links: LinksFunction = () => [
    {
        rel: 'icon',
        href: 'https://www.schiphol.nl/static/favicon.svg',
        type: 'image/svg+xml'
    }
]

export function Layout({children}: {children: React.ReactNode}) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                <div className="flex flex-wrap">
                    <Header />
                    <div className="flex flex-wrap basis-full max-w-5xl mx-auto">{children}</div>
                </div>
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    )
}

export default function App() {
    return <Outlet />
}
