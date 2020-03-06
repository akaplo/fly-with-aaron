import axios from 'axios';

const getAllFlights = () => axios.get('/flights');

export const getFlightsForUser = (user) =>
    getAllFlights().then(res =>
        res.data.Items.filter(f => f.passengers.map(p => p.email).includes(user.email))
    );

export const getAllUsers = () => {
    return Promise.resolve(users);
};

export const getAllUpcomingFlights = () => (
    getAllFlights().then(res => {
        return res.data.Items.filter(f => new Date(f.flight_datetime) > new Date())
    })
);

// Get the upcoming flights this user isn't already on
export const getJoinableFlights = (user) => {
    return getAllUpcomingFlights().then(flights => {
        return flights.filter(f => !f.passengers.map(p => p.email).includes(user.email));
    });
};

export const joinFlight = (userID, flightID) => {
    return Promise.resolve();
};

export const createFlight = (flight) => {
    axios.post('/flights', flight);
    return Promise.resolve(flight.passengers.push({
        "name": 'Aaron',
        "email": 'akaplo@comcast.net',
        "id": 1,
        "phone": '800-call-aaron',
        "admin": true,
        "weight": 160
    }));
};

export const confirmAccessCode = (code) => {
    return Promise.resolve(code);
};

export const users = [
    {
        "name": 'Aaron',
        "email": 'akaplo@comcast.net',
        "id": 1,
        "phone": '800-call-aaron',
        "admin": true,
        "weight": 160
    },
    {
        "name": 'Jon Bohrer',
        "email": 'jbohrer@vmware.com',
        "id": 2,
        "phone": '845-802-7811',
        "admin": false,
        "weight": 180
    },
    {
        "name": 'Sophia Weisman',
        "email": 'sweisman@vmware.com',
        "id": 3,
        "phone": '999-000-1111',
        "admin": false,
        "weight": 120
    },
    {
        "name": 'Greg Daneault',
        "email": 'gdaneault@vmware.com',
        "id": 4,
        "phone": '987-456-9876',
        "admin": false,
        "weight": 190
    },
    {
        "name": 'Dylan Kaplowitz',
        "email": 'dkaps@yahoo.com',
        "id": 5,
        "phone": '501-000-1111',
        "admin": false,
        "weight": 165
    },
    {
        "name": 'Michael Leitken',
        "email": 'michael@somewhere.com',
        "id": 6,
        "phone": '999-000-1111',
        "admin": false,
        "weight": 150
    },
    {
        "name": 'Jill Lund',
        "email": 'jill@vmware.com',
        "id": 7,
        "phone": '999-000-1111',
        "admin": false,
        "weight": 160
    },
    {
        "name": 'Jimmy Desj',
        "email": 'jimd@vmware.com',
        "id": 8,
        "phone": '999-000-1111',
        "admin": false,
        "weight": 185
    },
    {
        "name": 'Johnny Gill',
        "email": 'johnny@vmware.com',
        "id": 9,
        "phone": '999-000-1111',
        "admin": false,
        "weight": 155
    },
    {
        "name": 'Kev Johnson',
        "email": 'showusyour@vmware.com',
        "id": 10,
        "phone": '999-000-1111',
        "admin": false,
        "weight": 135
    },
    {
        "name": 'Spence Gagn',
        "email": 'spencer@vmware.com',
        "id": 11,
        "phone": '999-000-1111',
        "admin": false,
        "weight": 120
    },
    {
        "name": 'Raina Galbiati',
        "email": 'raga@vmware.com',
        "id": 12,
        "phone": '999-000-1111',
        "admin": false,
        "weight": 175
    },
    {
        "name": 'VMWARE Aaron',
        "email": 'akaplowitz@vmware.com',
        "phone": '781781781871'
    }
];

// const flights = [
//     {
//         "flight_datetime": "2020-02-03T17:00:00.00Z",
//         "origin": "Plymouth",
//         "destination": "Portland",
//         "passengers": [{
//         "name": "Aaron",
//         "email": "akaplo@comcast.net",
//         "id": 1,
//         "phone": "800-call-aaron",
//         "admin": true,
//         "weight": 160
//     }, {
//         "name": "Jon Bohrer",
//         "email": "jbohrer@vmware.com",
//         "id": 2,
//         "phone": "845-802-7811",
//         "admin": false,
//         "weight": 180
//     }],
//         "id": "128AB",
//         "cost": 310.98
//     },
//     {
//         "flight_datetime": "2020-02-25T15:00:00.00Z",
//         "origin": "Plymouth",
//         "destination": "Chatham",
//         "passengers": [{
//         "name": "Aaron",
//         "email": "akaplo@comcast.net",
//         "id": 1,
//         "phone": "800-call-aaron",
//         "admin": true,
//         "weight": 160
//     }, {
//         "name": "Sophia Weisman",
//         "email": "sweisman@vmware.com",
//         "id": 3,
//         "phone": "999-000-1111",
//         "admin": false,
//         "weight": 120
//     }],
//         "id": "987DA"
//     },
//     {
//         "flight_datetime": "2020-02-10T12:00:00.00Z",
//         "origin": "Plymouth",
//         "destination": "Keene",
//         "passengers": [{
//         "name": "Aaron",
//         "email": "akaplo@comcast.net",
//         "id": 1,
//         "phone": "800-call-aaron",
//         "admin": true,
//         "weight": 160
//     }, {
//         "name": "Sophia Weisman",
//         "email": "sweisman@vmware.com",
//         "id": 3,
//         "phone": "999-000-1111",
//         "admin": false,
//         "weight": 120
//     }, {
//         "name": "Spence Gagn",
//         "email": "spencer@vmware.com",
//         "id": 11,
//         "phone": "999-000-1111",
//         "admin": false,
//         "weight": 120
//     }, {
//         "name": "Jill Lund",
//         "email": "jill@vmware.com",
//         "id": 7,
//         "phone": "999-000-1111",
//         "admin": false,
//         "weight": 160
//     }],
//         "id": "89172"
//     },
//     {
//         "flight_datetime": "2020-03-16T16:30:00.00Z",
//         "origin": "Plymouth",
//         "passengers": [{
//         "name": "Aaron",
//         "email": "akaplo@comcast.net",
//         "id": 1,
//         "phone": "800-call-aaron",
//         "admin": true,
//         "weight": 160
//     }, {
//         "name": "Johnny Gill",
//         "email": "johnny@vmware.com",
//         "id": 9,
//         "phone": "999-000-1111",
//         "admin": false,
//         "weight": 155
//     }, {
//         "name": "Michael Leitken",
//         "email": "michael@somewhere.com",
//         "id": 6,
//         "phone": "999-000-1111",
//         "admin": false,
//         "weight": 150
//     }],
//         "id": "5abf"
//     },
//     {
//         "flight_datetime": "2020-03-22T12:00:00.00Z",
//         "origin": "Plymouth",
//         "passengers": [{
//         "name": "Aaron",
//         "email": "akaplo@comcast.net",
//         "id": 1,
//         "phone": "800-call-aaron",
//         "admin": true,
//         "weight": 160
//     }, {
//         "name": "Jimmy Desj",
//         "email": "jimd@vmware.com",
//         "id": 8,
//         "phone": "999-000-1111",
//         "admin": false,
//         "weight": 185
//     }, {
//         "name": "Dylan Kaplowitz",
//         "email": "dkaps@yahoo.com",
//         "id": 5,
//         "phone": "501-000-1111",
//         "admin": false,
//         "weight": 165
//     }],
//         "id": "098"
//     },
//     {
//         "flight_datetime": "2020-03-30T12:00:00.00Z",
//         "origin": "Plymouth",
//         "destination": "Block Island",
//         "passengers": [{
//         "name": "Aaron",
//         "email": "akaplo@comcast.net",
//         "id": 1,
//         "phone": "800-call-aaron",
//         "admin": true,
//         "weight": 160
//     }, {
//         "name": "Kev Johnson",
//         "email": "showusyour@vmware.com",
//         "id": 10,
//         "phone": "999-000-1111",
//         "admin": false,
//         "weight": 135
//     }, {
//         "name": "Johnny Gill",
//         "email": "johnny@vmware.com",
//         "id": 9,
//         "phone": "999-000-1111",
//         "admin": false,
//         "weight": 155
//     }, {
//         "name": "Greg Daneault",
//         "email": "gdaneault@vmware.com",
//         "id": 4,
//         "phone": "987-456-9876",
//         "admin": false,
//         "weight": 190
//     }],
//         "id": "098"
//     },
//     {
//         "flight_datetime": "2019-09-10T12:00:00.00Z",
//         "origin": "Plymouth",
//         "destination": "Northampton",
//         "passengers": [{
//         "name": "Aaron",
//         "email": "akaplo@comcast.net",
//         "id": 1,
//         "phone": "800-call-aaron",
//         "admin": true,
//         "weight": 160
//     }, {
//         "name": "Dylan Kaplowitz",
//         "email": "dkaps@yahoo.com",
//         "id": 5,
//         "phone": "501-000-1111",
//         "admin": false,
//         "weight": 165
//     }, {
//         "name": "Jimmy Desj",
//         "email": "jimd@vmware.com",
//         "id": 8,
//         "phone": "999-000-1111",
//         "admin": false,
//         "weight": 185
//     }, {
//         "name": "Raina Galbiati",
//         "email": "raga@vmware.com",
//         "id": 12,
//         "phone": "999-000-1111",
//         "admin": false,
//         "weight": 175
//     }],
//         "id": "098"
//     },
// ];