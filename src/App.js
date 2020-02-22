import React, { useState } from 'react';
import './App.css';
import Login from "./login/Login";
import { login, users } from "./actions/actions";
import Dashboard from "./dashboard/Dashboard";

const App = ({}) => {
    const [ loggedIn, setLoggedIn] = useState(true);
    const [ user, setUser ] = useState(users[7]);
    const [ loginError, setLoginError ] = useState('');
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
        { loginError }
        {
            !loggedIn && <Login login={ handleLogin }/>
        }
        { loggedIn &&
            <Dashboard user={ user }/>
        }

    </div>
  );
};

export default App;
