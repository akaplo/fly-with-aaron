import React, { Fragment, useEffect, useState } from 'react';
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
    const classes = styles();
    const futureFlights = user.flights ? user.flights.filter(f => new Date(f.flight_datetime) > new Date()) : [];
    const pastFlights = user.flights ? user.flights.filter(f => new Date(f.flight_datetime) < new Date()) : [];

    return (
        <Fragment>
            <span className={ classes.headerText }>Your upcoming flight(s)</span>
            <div  className={ classes.container }>
                { futureFlights.map(f => <Flight flight={ f } key={ f.id } showAll/>) }
                <br/><br/>
                <span>{ pastFlights.length } flight(s) taken.</span>
        </div>
        </Fragment>
    );
};

export default UpcomingFlights;
