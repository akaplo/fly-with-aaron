import React, { Fragment, useEffect, useState } from 'react';
import UpcomingFlights from "../flights/UpcomingFlights";
import JoinFlight from "../flights/JoinFlight";
import CreateFlight from "../flights/CreateFlight";
import AllFlights from "../flights/AllFlights";
import Users from "../users/Users";
import TopBar from "./TopBar";
import { Redirect } from 'react-router-dom';
import {getAllUsers} from "../actions/actions";

function Dashboard({ flights, refreshFlights, refreshUser, user }) {
    const [allUsers, setAllUsers] = useState([]);

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
        <div>
            <TopBar user={ user }/>
            { !user.admin &&
                <Fragment>
                    <br/><br/>
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
    );
}

Dashboard.defaultProps = {
    flights: []
};

export default Dashboard;
