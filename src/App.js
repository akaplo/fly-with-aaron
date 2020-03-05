import React, {useEffect, useState} from 'react';
import './App.css';
import { Switch, Route, BrowserRouter as Router, useLocation } from 'react-router-dom';
import Login from "./login/Login";
import { login, users } from "./actions/actions";
import Dashboard from "./dashboard/Dashboard";
import LoggedOut from "./login/LoggedOut";
const AppNR = ({ }) => {
    const [ loggedIn, setLoggedIn] = useState(false);
    const [ user, setUser ] = useState(undefined);
    const [ loginError, setLoginError ] = useState('');
    const location = useLocation();
    console.log(location);
    useEffect(() => {
        try {
            setUser(JSON.parse(atob(location.hash.split('&')[0].split('.')[1])));
        } catch (e) {
            console.error(e);
        }
    }, [location.hash])
    const handleLogin = (uname, pw) => {
        console.log(uname)
        login(uname, pw).then(user => {
            setLoggedIn(true);
            setUser(user);

        }).catch(err => {
            setLoggedIn(false);
            setLoginError(err);
            setUser({});
        })
    };

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
                            user={ user }
                        />
                }
                isPrivate
            />
            <Route path={ '/logout' } component={ LoggedOut } />
        </Switch>
        { loginError }
        {/*{*/}
        {/*    !loggedIn && <Login login={ handleLogin }/>*/}
        {/*}*/}
        {/*{ loggedIn &&*/}
        {/*    <Dashboard user={ user }/>*/}
        {/*}*/}

    </div>
  );
};

const App = () => <Router><AppNR/></Router>;
export default App;
