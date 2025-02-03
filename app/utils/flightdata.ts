import {flights} from '~/data/flights.json'

// Getting the type like this is not how it is supposed to be. It would be better to have a type for the data.
export const getFlightData = (q: string, sort: 'asc' | 'desc', flightsData: typeof flights) =>
    flightsData
        // Used 'includes' for now. Maybe 'startsWith' would be more appropriate or some fuzzy search logic.
        .filter((flight) => flight.airport.toLowerCase().includes(q))
        .sort((a, b) =>
            sort === 'asc'
                ? new Date(`${a.date} ${a.expectedTime}`).getTime() -
                  new Date(`${b.date} ${b.expectedTime}`).getTime()
                : new Date(`${b.date} ${b.expectedTime}`).getTime() -
                  new Date(`${a.date} ${a.expectedTime}`).getTime()
        )
        .slice(0, 5)
