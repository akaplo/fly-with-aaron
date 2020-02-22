import React from 'react';
import { Input } from "@material-ui/core";
import UpcomingFlights from "../flights/UpcomingFlights";
import JoinFlight from "../flights/JoinFlight";

function Dashboard({ user }) {
    return (
        <div>
            Welcome { user.name }
            <br/><br/>
            <UpcomingFlights userID={ user.id }/>
            <br/>
            <JoinFlight userID={ user.id }/>
        </div>
    );
}

export default Dashboard;
