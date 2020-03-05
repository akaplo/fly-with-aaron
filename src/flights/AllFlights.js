import React, { Fragment, useEffect, useState } from 'react';
import { getFlightsForUser } from "../actions/actions";
import Flight from "./Flight";

const AllFlights = ({ user }) => {
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        getFlightsForUser(user).then(flights => {
            setFlights(flights);
        });
    }, [user.email]);
    return (
        <div>
            <span>All Past Flights:</span>
            { flights.filter(f => new Date(f.flight_date) < new Date()).map(f =>
                <Fragment>
                    <div>---------------------------------</div>
                    <Flight flight={f} showAll={true}/>
                </Fragment>
            ) }
            <hr/>
            <span>All Upcoming Flight(s)</span>
            { flights.filter(f => new Date(f.flight_date) > new Date()).map(f =>
                <Fragment>
                    <div>---------------------------------</div>
                    <Flight flight={ f } showAll={ true }/>
                </Fragment>

            ) }

        </div>
    );
};

export default AllFlights;
