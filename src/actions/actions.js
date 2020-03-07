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

export const editFlight = (flight, id) => {
    axios.put(`flights/${ id }`, flight)
};

export const deleteFlight = (id) => {
    axios.delete(`flights/${ id }`)
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

export const sortFlights = (flights) => flights.sort((a, b) => {
    const aDate = new Date(a.flight_datetime);
    const bDate = new Date(b.flight_datetime);
    if (aDate < bDate) return -1;
    if (aDate > bDate) return 1;
    return 0;
});

export const arraysAreEqual = (a1=[], a2=[]) => a1.length === a2.length && a1.sort().every(function(value, index) { return value === a2.sort()[index]});

export const confirmAccessCode = code => axios.get(`/code_validation/${ code }`);