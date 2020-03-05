import React, { Fragment, useEffect, useState } from 'react';
import { getFlightsForUser } from "../actions/actions";
import Flight from "./Flight";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles({
    container: {
        margin: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    headerText: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginBottom: '1rem',
        fontWeight: 'bold',
        fontSize: 'large',
        marginLeft: '0.5rem'
    }
});

const UpcomingFlights = ({ user }) => {
    const [flights, setFlights] = useState([]);
    const [pastFlights, setPastFlights] = useState([]);
    const classes = styles();

    useEffect(() => {
        getFlightsForUser(user).then(flights => {
            const futureFlights = flights.filter(f => new Date(f.flight_date) > new Date());
            const pastFlights = flights.filter(f => new Date(f.flight_date) < new Date());
            setFlights(futureFlights);
            setPastFlights(pastFlights);
        });
    }, [user.email]);
    return (
        <Fragment>
            <span className={ classes.headerText }>You have { flights.length } upcoming flight(s) with Aaron</span>
            <div  className={ classes.container }>
                { flights.map(f => <Flight flight={ f } showAll/>) }
                <br/><br/>
                <span>You have taken { pastFlights.length } flight(s) with Aaron</span>
        </div>
        </Fragment>
    );
};

export default UpcomingFlights;
