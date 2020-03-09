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

const styles = makeStyles({
    content: {
        padding: '1.5rem 1.5rem 0 1.5rem',
        backgroundColor: '#f5f0f0'
    }
});

function Dashboard({ flights, refreshFlights, refreshUser, user }) {
    const [allUsers, setAllUsers] = useState([]);
    const classes = styles();
    useEffect(() => {
        if (user && user.admin === true) {
            getAllUsers().then(setAllUsers);
        }
    }, [user]);

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
                    <div>Manually Add Flight</div>
                    <CreateFlight allUsers={ allUsers } user={ user }/>
                    <hr/>
                    <AllFlights allUsers={ allUsers } flights={ flights } refreshFlights={ refreshFlights } user={ user }/>
                    <hr/>
                    <Users allUsers={ allUsers } flights={ flights }/>
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
