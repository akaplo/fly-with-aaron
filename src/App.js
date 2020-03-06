import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import { Switch, Route, BrowserRouter as Router, useLocation } from 'react-router-dom';
import Login from "./login/Login";
import Dashboard from "./dashboard/Dashboard";
import LoggedOut from "./login/LoggedOut";
import {addFlightDataToUser, getAllFlights, getFlightsForUser, getUser} from "./actions/actions";

const AppNR = () => {
    // Set base URL on app bootstrap
    axios.defaults.baseURL = 'https://u61sge0e1j.execute-api.us-east-1.amazonaws.com';
    const [ user, setUser ] = useState(undefined);
    const [flights, setFlights] = useState([]);
    const location = useLocation();
    const updateUser = (email, userToMutate={}) => getUser(email).then(u => {
        const updatedUser = { ...userToMutate, ...u };
        setUser(updatedUser);
        if (flights.length > 0) {
            setUser(addFlightDataToUser(updatedUser, flights))
        } else {
            setUser(updatedUser);
        }
        return Promise.resolve({ ...userToMutate, ...u });

    });
    const updateFlights = () => getAllFlights().then(res => {
        setFlights(res.data.Items);
        return Promise.resolve(res.data.Items);
    });
    const updateUserWithFlights = (email, userToMutate={}) => {
      const userPromise = updateUser(email, userToMutate);
      const flightPromise = updateFlights();
      return Promise.all([userPromise, flightPromise])
          .then((reses) => {
              console.log(reses[0])
              setUser(addFlightDataToUser(reses[0], reses[1]))
          })
    };
    // When URL hash changes, likely means a successful login
    useEffect(() => {
        try {
            const authToken = location.hash.split('&')[0].replace('#id_token=', '');
            axios.defaults.headers.common['Authorization'] = authToken;
            const user = JSON.parse(atob(authToken.split('.')[1]));
            updateUserWithFlights(user.email, user).catch(e => console.error(e));
        } catch (e) {
            console.error(e);
        }
    }, [location.hash]);
    return (
    <div className="App">
        <Switch>
            <Route path={ '/' } exact component={ Login }/>
            <Route
                path={ '/dashboard' }
                render={
                    (props) =>
                        <Dashboard
                            { ...props }
                            flights={ flights }
                            getFlights={ updateFlights }
                            refreshUser={ updateUser }
                            user={ user }
                        />
                }
                isPrivate
            />
            <Route path={ '/logout' } component={ LoggedOut } />
        </Switch>
    </div>
  );
};

const App = () => <Router><AppNR/></Router>;
export default App;
