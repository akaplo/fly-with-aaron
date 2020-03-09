import React, { Fragment } from 'react';
import Flight from "./Flight";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { Alert } from "@material-ui/lab";

const styles = makeStyles(theme => ({
    container: {
        display: 'flex',
        alignItems: 'flex-start',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
        },
        justifyContent: 'space-around'
    },
    headerText: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginBottom: '1rem',
        fontWeight: 'bold',
        fontSize: 'large',
        marginLeft: '0.5rem'
    },
    flightsPaper: {
        margin: '0 1rem',
        padding: '0 1rem 1rem 1rem',
        height: '13rem',
        overflow: 'scroll'
    },
    flightMargin: {
        overflow: 'scroll',
        margin: '1rem 0rem'
    },
    pastFlights: {
        width: '33%',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        },
    },
    upcomingFlights: {
        width: '67%',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '2rem',
            width: '100%'
        },
    },
    noFlights: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center'
    }
}));

const UpcomingFlights = ({ flights, user }) => {
    const classes = styles();
    const userFlights = flights ? flights.filter(f => user.flights.includes(f.id)) : [];
    console.log(flights, user)
    const futureFlights = user.flights ? userFlights.filter(f => new Date(f.flight_datetime) > new Date()) : [];
    const pastFlights = user.flights ? userFlights.filter(f => new Date(f.flight_datetime) < new Date()) : [];
    return (
        <Fragment>
            <div className={ classes.container }>
                <div className={ classes.upcomingFlights }>
                    <Typography className={ classes.headerText }>
                        Upcoming flights
                    </Typography>
                    <Paper className={ classes.flightsPaper } elevation={ 2 }>
                        { futureFlights.map(f => <Fragment>
                                <div className={ classes.flightMargin }>
                                    <Flight calColor={ '#3f51b5' } flight={ f } key={ f.id } showAll user={ user }/>
                                </div>
                                <Divider/>
                            </Fragment>
                        )}
                        { futureFlights.length === 0 && <div className={ classes.noFlights }><Alert  severity="info">None yet!</Alert></div> }
                    </Paper>
                </div>
                <div className={ classes.pastFlights }>
                    <Typography className={ classes.headerText }>
                        Past flights
                    </Typography>
                    <Paper className={ classes.flightsPaper } elevation={ 2 }>
                        { pastFlights.map(f =>
                            <Fragment>
                                <div className={ classes.flightMargin }>
                                    <Flight calColor={ 'lightgrey'} flight={ f } key={ f.id } showAll user={ user }/>
                                </div>
                                <Divider/>
                            </Fragment>
                        )}
                        { pastFlights.length > 2 && <span>and { pastFlights.length - 2 } more.</span>}
                        { pastFlights.length === 0 && <div className={ classes.noFlights }><Alert  severity="info">None yet!</Alert></div> }
                    </Paper>
                </div>
        </div>
        </Fragment>
    );
};

export default UpcomingFlights;
