
export const login = (email, password) => {
    console.log(email, password);
    const user = users.find(u => u.email === email);
    return user ? Promise.resolve(user) : Promise.reject('U SUK');
};

export const getFlightsForUser = (userID) => {
    let flightsForUser = flights.filter(f => f.passengers.map(p => p.id).includes(userID));

    return Promise.resolve(flightsForUser);
};

export const getUsers = (userIDs) => {
    return users.filter(u => userIDs.includes(u.id));
};

export const getAllUpcomingFlights = () => {
    return Promise.resolve(flights.filter(f => new Date(f.flight_date) > new Date()))
};

// Get the upcoming flights this user isn't already on
export const getJoinableFlights = (userID) => {
    return getAllUpcomingFlights().then(flights => {
        return flights.filter(f => !f.passengers.map(p => p.id).includes(userID));
    });
};

export const joinFlight = (userID, flightID) => {
    return Promise.resolve();
}

export const users = [
    {
        name: 'a',
        email: 'a',
        id: 1,
        phone: '800-call-aaron',
        admin: true
    },
    {
        name: 'jon',
        email: 'jbohrer@vmware.com',
        id: 2,
        phone: '845-802-7811',
        admin: false
    },
    {
        name: 'sophia',
        email: 'sweisman@vmware.com',
        id: 3,
        phone: '999-000-1111',
        admin: false
    }
];

const flights = [
    {
        flight_date: '2020-02-03T17:00:00.00Z',
        origin: 'Plymouth',
        destination: 'Portland',
        passengers: [users[0], users[1]],
        id: '128AB'
    },
    {
        flight_date: '2020-02-25T15:00:00.00Z',
        origin: 'Plymouth',
        destination: 'Chatham',
        passengers: [users[0], users[2]],
        id: '987DA'
    }
];