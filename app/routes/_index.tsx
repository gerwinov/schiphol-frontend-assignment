import React from 'react'
import type {LoaderFunctionArgs, MetaFunction} from '@remix-run/node'
import {useFetcher} from '@remix-run/react'

import {Card, Input} from '~/components/ui'

import {flights as flightsData} from '~/data/flights.json'
import {getFlightData} from '~/helpers/flightdata'

export const meta: MetaFunction = () => {
    return [
        {title: 'Find your flight'},
        {name: 'description', content: 'Find your flight departing from Schiphol'}
    ]
}

export async function loader({request}: LoaderFunctionArgs) {
    const url = new URL(request.url)
    const q = (url.searchParams.get('q') || '').toLowerCase()
    const sort = url.searchParams.get('sort') === 'desc' ? 'desc' : 'asc'
    return q ? getFlightData(q, sort, flightsData) : null
}

export default function Index() {
    const flights = useFetcher<typeof flightsData>()
    const [destination, setDestination] = React.useState<string | undefined>(undefined)
    const [sort, setSort] = React.useState<'asc' | 'desc'>('asc')
    const showResultsTreshold = 3

    return (
        <flights.Form method="get" action="">
            <div className="flex basis-full mb-4 py-4">
                <div className="flex-1 mx-auto my-auto">
                    <div className="max-w-xs">
                        <h1 className="text-xl font-semibold mb-2">Find your departing flight</h1>

                        <Input
                            placeholder="Destination Airport"
                            name="q"
                            onChange={(event) => {
                                setDestination(event.target.value)
                                event.target.value.length >= showResultsTreshold &&
                                    flights.submit(event.target.form)
                            }}
                            type="text"
                        />
                    </div>
                </div>
                <div className="flex-1">
                    <img
                        alt="magnifying glass"
                        className="w-full h-auto"
                        src="https://cdn.schiphol.nl/web/flights/assets/flight-search-asset-CjvqQkFT.png"
                    />
                </div>
            </div>
            {destination !== undefined && (
                <div className="flex flex-wrap flex-col basis-full mb-4 py-4">
                    <h1 className="text-lg font-light mb-2">Departing flights</h1>
                    {destination?.length < showResultsTreshold ? (
                        <p className="text-sm text-grey-storm">
                            Please enter at least {showResultsTreshold} characters
                        </p>
                    ) : flights.state === 'loading' ? (
                        // Should display some spinner here.
                        // In this example data is loaded so fast it just looks like a flicker.
                        // Left this case in to show how it could be done.
                        <></>
                    ) : flights.data?.length !== 0 ? (
                        <>
                            {/* This should normally also be in a UI component. Skipped that for now */}
                            <select
                                className="self-end mb-2"
                                name="sort"
                                onChange={(event) => {
                                    flights.submit({sort: event.target.value, q: destination})
                                    setSort(event.target.value as 'asc' | 'desc')
                                }}
                                value={sort}
                            >
                                <option value="asc">Oldest first</option>
                                <option value="desc">Newest first</option>
                            </select>
                            <ul>
                                {flights.data?.map((flight) => (
                                    <li key={flight.flightIdentifier}>
                                        <Card.Root direction="horizontal">
                                            <Card.Header>
                                                {/* Based on the data we could also show expected and original time to show delays. 
                                            Skipped that for now. */}
                                                <span className="flex-1 text-sm font-light">
                                                    {new Date(flight.date).toLocaleDateString()}
                                                </span>
                                                <span className="flex-1 text-sm font-light">
                                                    {flight.expectedTime}
                                                </span>
                                            </Card.Header>
                                            <Card.Body>
                                                <span className="block text-sm font-semibold">
                                                    {flight.airport}
                                                </span>
                                                <span className="block text-sm font-light">
                                                    {flight.flightNumber}
                                                </span>
                                            </Card.Body>
                                        </Card.Root>
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <p className="text-sm text-grey-storm">No flights found</p>
                    )}
                </div>
            )}
        </flights.Form>
    )
}
