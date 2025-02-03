import {flights} from '~/data/flights.json'

// Getting the type like this is not how it is supposed to be. It would be better to have a type for the data, skipped this for now.
export const getFlightData = (q: string, sort: 'asc' | 'desc', flightsData: typeof flights) =>
    flightsData
        // Used 'includes' for now. Maybe 'startsWith' would be more appropriate, maybe some fuzzy search logic or maybe even a full match.
        .filter((flight) => flight.airport.toLowerCase().includes(q))
        .sort((a, b) =>
            sort === 'asc'
                ? new Date(`${a.date} ${a.expectedTime}`).getTime() -
                  new Date(`${b.date} ${b.expectedTime}`).getTime()
                : new Date(`${b.date} ${b.expectedTime}`).getTime() -
                  new Date(`${a.date} ${a.expectedTime}`).getTime()
        )
        .slice(0, 5)
