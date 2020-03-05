import React, { Fragment } from 'react';
import { Input } from "@material-ui/core";
import UpcomingFlights from "../flights/UpcomingFlights";
import JoinFlight from "../flights/JoinFlight";
import CreateFlight from "../flights/CreateFlight";
import AllFlights from "../flights/AllFlights";
import Users from "../users/Users";
import TopBar from "./TopBar";
import {users} from "../actions/actions";

function Dashboard({ user }) {
    console.log(user)
    return (
        <div>
            <TopBar user={ user }/>
            { !user.admin &&
                <Fragment>
                    <br/><br/>
                    <UpcomingFlights user={user}/>
                    <br/>
                    <JoinFlight user={user}/>
                </Fragment>
            }
            <br/>
            { user.admin &&
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
    user: users[0]
};

export default Dashboard;
