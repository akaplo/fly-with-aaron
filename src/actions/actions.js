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

export const editUser = (email, phone, weight, flights) => {

};

// Get the upcoming flights this user isn't already on
export const getJoinableFlights = (userFlights, allFlights) => {
    // Return all flights whose IDs are NOT in this user's list of flights
    return getUpcomingFlights(allFlights).filter(f => !userFlights.map(fl => fl.id).includes(f.id));
};

export const joinFlight = (user, flightID) => {
    if (!user.flights.includes(flightID)) {
        return axios.put(`/users/${ user.email }`, {
            flights: user.flights.map(f => f.id).concat([flightID])
        });
    } else {
        return Promise.reject('User already on flight');
    }
};

export const createFlight = (flight) => axios.post('/flights', flight);

export const confirmAccessCode = (code) => {
    return Promise.resolve(code);
};
