import React, { Fragment } from 'react';
import UpcomingFlights from "../flights/UpcomingFlights";
import JoinFlight from "../flights/JoinFlight";
import CreateFlight from "../flights/CreateFlight";
import AllFlights from "../flights/AllFlights";
import Users from "../users/Users";
import TopBar from "./TopBar";

function Dashboard({ flights, getFlights, getUser, user }) {
    return (
        <div>
            <TopBar user={ user }/>
            { !user.admin &&
                <Fragment>
                    <br/><br/>
                    <UpcomingFlights user={user}/>
                    <br/>
                    <JoinFlight flights={ flights } user={user}/>
                </Fragment>
            }
            <br/>
            { user.admin === true &&
                <Fragment>
                    <CreateFlight user={ user }/>
                    <hr/>
                    <AllFlights user={ user }/>
                    <hr/>
                    <Users/>
                </Fragment>
            }
        </div>
    );
}

Dashboard.defaultProps = {
    user: {}
};

export default Dashboard;
