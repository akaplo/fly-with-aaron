import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import { Switch, Route, BrowserRouter as Router, useLocation } from 'react-router-dom';
import Login from "./login/Login";
import Dashboard from "./dashboard/Dashboard";
import LoggedOut from "./login/LoggedOut";

const AppNR = () => {
    // Set base URL on app bootstrap
    axios.defaults.baseURL = 'https://u61sge0e1j.execute-api.us-east-1.amazonaws.com';
    const [ user, setUser ] = useState(undefined);
    const location = useLocation();
    // When URL hash changes, likely means a successful login
    useEffect(() => {
        try {
            const authToken = location.hash.split('&')[0].replace('#id_token=', '');
            console.log(authToken);
            axios.defaults.headers.common['Authorization'] = authToken;
            const user = atob(authToken.split('.')[1]);
            setUser(JSON.parse(user));
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
                            user={ { ...user, admin: user && user.email === 'akaplo@comcast.net'} }
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
