import React, { Fragment, useEffect, useState } from 'react';
import UpcomingFlights from "../flights/UpcomingFlights";
import JoinFlight from "../flights/JoinFlight";
import CreateFlight from "../flights/CreateFlight";
import AllFlights from "../flights/AllFlights";
import Users from "../users/Users";
import TopBar from "./TopBar";
import { Redirect } from 'react-router-dom';
import { getAllUsers } from "../actions/actions";
import { makeStyles } from "@material-ui/core/styles";
import {Paper} from "@material-ui/core";

const styles = makeStyles({
    content: {
        padding: '3.5rem 1.5rem 0 1.5rem',
        backgroundColor: '#f5f0f0'
    },
    paper: {
        padding: '1rem'
    },
    header: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginBottom: '0.5rem',
        fontWeight: 'bold',
        fontSize: 'large',
        marginLeft: '0.5rem'
    }
});

function Dashboard({ flights, refreshFlights, refreshUser, user }) {
    const [allUsers, setAllUsers] = useState([]);
    const classes = styles();
    const refreshUsers = () => getAllUsers().then(setAllUsers);
    useEffect(() => {
        if (user && user.admin === true && allUsers.length === 0) {
            console.log('hi')
            setTimeout(() => refreshUsers(), 10000);
        }
    }, [user, allUsers]);

    if (!user) {
        return <div>Loading</div>
    }
    if (user && !user.access_confirmed) {
        return <Redirect to={ '/access_check' } user={ user }/>
    }

    return (
        <Fragment>
            <TopBar user={ user }/>
            <div className={ classes.content }>
                { !user.admin &&
                <Fragment>
                    <UpcomingFlights flights={ flights } user={user}/>
                    <br/>
                    <JoinFlight flights={ flights } refreshUser={ refreshUser } user={user}/>
                </Fragment>
                }
                <br/>
                { user.admin === true &&
                <Fragment>
                    <h3 className={ classes.header }>Add New Flight</h3>
                    <Paper>
                        <CreateFlight allUsers={ allUsers } user={ user }/>
                    </Paper>
                    <AllFlights allUsers={ allUsers } flights={ flights } refreshFlights={ refreshFlights } refreshUsers={ refreshUsers } user={ user }/>
                    <h3 className={ classes.header }>All Users</h3>
                    <Paper>
                        <Users allUsers={ allUsers } flights={ flights }/>
                    </Paper>
                </Fragment>
                }
            </div>
        </Fragment>
    );
}

Dashboard.defaultProps = {
    flights: []
};

export default Dashboard;
