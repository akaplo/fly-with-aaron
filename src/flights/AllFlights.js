import React, { Fragment } from 'react';
import { getFlightsForUser } from "../actions/actions";
import Flight from "./Flight";

const AllFlights = ({ flights, user }) => {
    return (
        <div>
            <span>All Past Flights:</span>
            { flights
                .filter(f => new Date(f.flight_datetime) < new Date())
                .sort((a, b) => {
                    const aDate = new Date(a.flight_datetime);
                    const bDate = new Date(b.flight_datetime);
                    if (aDate < bDate) return -1;
                    if (aDate > bDate) return 1;
                    return 0;
                })
                .map(f =>
                    <Fragment>
                        <div key={ f.id }>---------------------------------</div>
                        <Flight flight={f} key={ f.id } showAll={true}/>
                    </Fragment>
            ) }
            <hr/>
            <span>All Upcoming Flight(s)</span>
            { flights.filter(f => new Date(f.flight_datetime) > new Date()).map(f =>
                <Fragment>
                    <div key={ f.id }>---------------------------------</div>
                    <Flight flight={ f } key={ f.id } showAll={ true }/>
                </Fragment>
            ) }
        </div>
    );
};

export default AllFlights;
