import {describe, it, expect} from 'vitest'
import {getFlightData} from './flightdata'

const flight_1 = {
    flightIdentifier: 'D20190401UA969',
    flightNumber: 'UA 969',
    airport: 'San Francisco',
    date: '2022-02-23',
    expectedTime: '14:50',
    originalTime: '14:50',
    url: '/en/departures/flight/D20190401UA969/',
    score: '70.55272'
}

const flight_2 = {
    flightIdentifier: 'D20190401UA989',
    flightNumber: 'UA 989',
    airport: 'San Francisco',
    date: '2022-02-24',
    expectedTime: '14:50',
    originalTime: '14:50',
    url: '/en/departures/flight/D20190401UA989/',
    score: '71.53476'
}

const flight_3 = {
    flightIdentifier: 'D20190401UA999',
    flightNumber: 'UA 999',
    airport: 'Los Angeles',
    date: '2022-02-25',
    expectedTime: '15:00',
    originalTime: '15:00',
    url: '/en/departures/flight/D20190401UA999/',
    score: '72.53476'
}

const sampleFlights = [flight_1, flight_2, flight_3]

describe('getFlightData', () => {
    it('filters and sorts flights in ascending order', () => {
        const result = getFlightData('san', 'asc', sampleFlights)
        expect(result).toEqual([flight_1, flight_2])
    })

    it('filters and sorts flights in descending order', () => {
        const result = getFlightData('san', 'desc', sampleFlights)
        expect(result).toEqual([flight_2, flight_1])
    })

    it('returns an empty array when no flights match the query', () => {
        const result = getFlightData('nyc', 'asc', sampleFlights)
        expect(result).toEqual([])
    })

    it('limits the results to 5 flights', () => {
        const extendedFlights = [...sampleFlights, ...sampleFlights, ...sampleFlights]
        const result = getFlightData('san', 'asc', extendedFlights)
        expect(result.length).toBe(5)
    })
})
