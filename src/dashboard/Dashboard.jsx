import React, { Fragment } from 'react';
import UpcomingFlights from "../flights/UpcomingFlights";
import JoinFlight from "../flights/JoinFlight";
import CreateFlight from "../flights/CreateFlight";
import AllFlights from "../flights/AllFlights";
import Users from "../users/Users";
import TopBar from "./TopBar";

function Dashboard({ flights, getFlights, refreshUser, user }) {
    return (
        <div>
            <TopBar user={ user }/>
            { !user.admin &&
                <Fragment>
                    <br/><br/>
                    <UpcomingFlights user={user}/>
                    <br/>
                    <JoinFlight flights={ flights } refreshUser={ refreshUser } user={user}/>
                </Fragment>
            }
            <br/>
            { user.admin === true &&
                <Fragment>
                    <CreateFlight user={ user }/>
                    <hr/>
                    <AllFlights flights={ flights } user={ user }/>
                    <hr/>
                    <Users flights={ flights }/>
                </Fragment>
            }
        </div>
    );
}

Dashboard.defaultProps = {
    user: {},
    flights: []
};

export default Dashboard;
