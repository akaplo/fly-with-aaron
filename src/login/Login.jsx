import React, { useState } from 'react';
import { Button, Input } from "@material-ui/core";

const Login = ({ login }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    console.log(login)
    return (
        <div>
            <form noValidate autoComplete="off">
                <Input
                    placeholder={ 'example@aaron.com' }
                    inputProps={{ 'aria-label': 'description' }}
                    onChange={ e => setEmail(e.target.value) }
                    value={ email }
                />
                <Input
                    inputProps={{ 'aria-label': 'description' }}
                    onChange={ e => setPassword(e.target.value) }
                    type={ 'password' }
                    value={ password }
                />
            </form>
            <Button onClick={ () => login(email, password) } variant={ 'outlined'  }>Log In</Button>
        </div>
    );
};

export default Login;
