import axios from 'axios';

export const getAllFlights = () => axios.get('/flights');

export const getAllUsers = () => axios.get('/users').then(res => res.data.Items);

export const getUser = (email) => axios.get(`/users/${ email }`).then(res => res.data.Item).catch(e => console.error(e));

export const addFlightDataToUser = (user, flights) => {
    if (user.flights) {
        return {
            ...user,
            flights: flights.filter(f => user.flights.includes(f.id))
        };
    }
};

export const getUpcomingFlights = (flights) => (
    flights.filter(f => new Date(f.flight_datetime) > new Date())
);

export const editFlight = (flight, id) => axios.put(`flights/${ id }`, flight);

export const deleteFlight = (flight) =>
    axios.delete(`flights/${ flight.id }`)
        // remove this flight from all users' profiles
        .then(() => flight.passengers.forEach(p => removeFlightFromUser(p, flight)))
;

// Get the upcoming flights this user isn't already on
export const getJoinableFlights = (userFlights, allFlights) => {
    // Return all flights whose IDs are NOT in this user's list of flights
    return getUpcomingFlights(allFlights).filter(f => !userFlights.includes(f.id));
};

export const joinFlight = (user, flight) =>
    Promise.all([addPassengerToFlight(user, flight), addFlightToUser(user, flight)]);

export const addPassengerToFlight = (user, flight) => {
    if (!flight.passengers.map(p => p.email).includes(user.email)) {
        return axios.put(`/flights/${ flight.id }`, {
            passengers: flight.passengers.concat([{ email: user.email, name: user.name }])
        });
    } else {
        return Promise.reject('Passenger already on flight');
    }
};

export const addFlightToUser = (user, flight) => {
    if (!user.flights || (!!user.flights && !user.flights.includes(flight.id))) {
        const flights = user.flights || [];
        return axios.put(`/users/${ user.email }`, {
            flights: flights.concat([flight.id])
        });
    } else {
        return Promise.reject('User already on flight');
    }
};

export const removeFlightFromUser = (user, flight) => {
    if (!user.flights || (!!user.flights && user.flights.includes(flight.id))) {
        const flights = user.flights || [];
        return axios.put(`/users/${ user.email }`, {
            flights: flights.filter(f => f.id !== flight.id)
        });
    } else {
        return Promise.reject('User was not on flight');
    }
};

export const removePassengerFromFlight = (user, flight) => {
    if (flight.passengers.map(p => p.email).includes(user.email)) {
        return axios.put(`/flights/${ flight.id }`, {
            passengers: flight.passengers.filter(p => p.email !== user.email)
        });
    } else {
        return Promise.reject('Passenger was not on flight');
    }
};

export const createFlight = (flight) => axios.post('/flights', flight);

export const sortFlights = (flights) => flights.sort((a, b) => {
    const aDate = new Date(a.flight_datetime);
    const bDate = new Date(b.flight_datetime);
    if (aDate < bDate) return -1;
    if (aDate > bDate) return 1;
    return 0;
});

export const arraysAreEqual = (a1=[], a2=[]) => a1.length === a2.length && a1.sort().every(function(value, index) { return value === a2.sort()[index]});

export const confirmAccessCode = code => axios.get(`/code_validation/${ code }`);

export const confirmUser = (user, code) =>
    axios.post(`/users/${ user.email }/code_confirmation`, {
        code
    });