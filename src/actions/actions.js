
export const login = (email, password) => {
    console.log(email, password);
    const user = users.find(u => u.email === email);
    return user ? Promise.resolve(user) : Promise.reject('U SUK');
};

export const getFlightsForUser = (userID) => {
    let flightsForUser = flights.filter(f => f.passengers.map(p => p.id).includes(userID));

    return Promise.resolve(flightsForUser);
};

export const getUsersByID = (userIDs) => {
    return users.filter(u => userIDs.includes(u.id));
};

export const getAllUsers = () => {
    return Promise.resolve(users);
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
};

export const createFlight = (flight) => {
    flight.passengers.push(users[0]);
};

export const users = [
    {
        name: 'Aaron',
        email: 'akaplo@comcast.net',
        id: 1,
        phone: '800-call-aaron',
        admin: true
    },
    {
        name: 'Jon Bohrer',
        email: 'jbohrer@vmware.com',
        id: 2,
        phone: '845-802-7811',
        admin: false
    },
    {
        name: 'Sophia Weisman',
        email: 'sweisman@vmware.com',
        id: 3,
        phone: '999-000-1111',
        admin: false
    },
    {
        name: 'Greg Daneault',
        email: 'gdaneault@vmware.com',
        id: 4,
        phone: '987-456-9876',
        admin: false
    },
    {
        name: 'Dylan Kaplowitz',
        email: 'dkaps@yahoo.com',
        id: 5,
        phone: '501-000-1111',
        admin: false
    },
    {
        name: 'Michael Leitken',
        email: 'michael@somewhere.com',
        id: 6,
        phone: '999-000-1111',
        admin: false
    },
    {
        name: 'Jill Lund',
        email: 'jill@vmware.com',
        id: 7,
        phone: '999-000-1111',
        admin: false
    },
    {
        name: 'Jimmy Desj',
        email: 'jimd@vmware.com',
        id: 8,
        phone: '999-000-1111',
        admin: false
    },
    {
        name: 'Johnny Gill',
        email: 'johnny@vmware.com',
        id: 9,
        phone: '999-000-1111',
        admin: false
    },
    {
        name: 'Kev Johnson',
        email: 'showusyour@vmware.com',
        id: 10,
        phone: '999-000-1111',
        admin: false
    },
    {
        name: 'Spence Gagn',
        email: 'spencer@vmware.com',
        id: 11,
        phone: '999-000-1111',
        admin: false
    },
    {
        name: 'Raina Galbiati',
        email: 'raga@vmware.com',
        id: 12,
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
        id: '128AB',
        cost: 310.98
    },
    {
        flight_date: '2020-02-25T15:00:00.00Z',
        origin: 'Plymouth',
        destination: 'Chatham',
        passengers: [users[0], users[2]],
        id: '987DA'
    },
    {
        flight_date: '2020-02-10T12:00:00.00Z',
        origin: 'Plymouth',
        destination: 'Keene',
        passengers: [users[0], users[2], users[10], users[6]],
        id: '89172'
    },
    {
        flight_date: '2020-03-16T16:30:00.00Z',
        origin: 'Plymouth',
        passengers: [users[0], users[8], users[5]],
        id: '5abf'
    },
    {
        flight_date: '2020-03-22T12:00:00.00Z',
        origin: 'Plymouth',
        passengers: [users[0], users[7], users[4]],
        id: '098'
    },
    {
        flight_date: '2020-03-30T12:00:00.00Z',
        origin: 'Plymouth',
        destination: 'Block Island',
        passengers: [users[0], users[9], users[8], users[3]],
        id: '098'
    },
    {
        flight_date: '2019-09-10T12:00:00.00Z',
        origin: 'Plymouth',
        destination: 'Northampton',
        passengers: [users[0], users[4], users[7], users[11]],
        id: '098'
    },
];