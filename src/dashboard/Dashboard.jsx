import React, { Fragment } from 'react';
import { Input } from "@material-ui/core";
import UpcomingFlights from "../flights/UpcomingFlights";
import JoinFlight from "../flights/JoinFlight";
import CreateFlight from "../flights/CreateFlight";
import AllFlights from "../flights/AllFlights";
import Users from "../users/Users";
function Dashboard({ user }) {
    return (
        <div>
            Welcome { user.name }
            { !user.admin &&
                <Fragment>
                    <br/><br/>
                    <UpcomingFlights userID={user.id}/>
                    <br/>
                    <JoinFlight userID={user.id}/>
                </Fragment>
            }
            <br/>
            { user.admin &&
                <Fragment>
                    (administrator console)
                    <br/><br/>
                    <hr/>
                    <CreateFlight userID={ user.id }/>
                    <hr/>
                    <AllFlights userID={ user.id }/>
                    <hr/>
                    <Users/>
                </Fragment>
            }
        </div>
    );
}

export default Dashboard;
