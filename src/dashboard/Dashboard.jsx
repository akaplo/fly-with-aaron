import React, { Fragment } from 'react';
import { Input } from "@material-ui/core";
import UpcomingFlights from "../flights/UpcomingFlights";
import JoinFlight from "../flights/JoinFlight";
import CreateFlight from "../flights/CreateFlight";

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
                    <CreateFlight userID={ user.id }/>
                </Fragment>
            }
        </div>
    );
}

export default Dashboard;
