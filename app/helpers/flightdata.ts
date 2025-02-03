import {flights} from '~/data/flights.json'

// Getting the type like this is not how it is supposed to be. It would be better to have a type for the data, skipped this for now.
export const getFlightData = (q: string, sort: 'asc' | 'desc', flightsData: typeof flights) =>
    flightsData
        // Used 'includes' for now. Maybe 'startsWith' would be more appropriate, maybe some fuzzy search logic or maybe even a full match.
        .filter((flight) => flight.airport.toLowerCase().includes(q))
        .sort((a, b) => {
            // This is a bit of a hacky way to sort by date and time. It would be better to have a proper Date type or timestamp in the source data.
            const dateA = new Date(`${a.date} ${a.expectedTime}`).getTime()
            const dateB = new Date(`${b.date} ${b.expectedTime}`).getTime()
            return sort === 'asc' ? dateA - dateB : dateB - dateA
        })
        .slice(0, 5)
