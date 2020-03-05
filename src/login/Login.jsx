import React, {Fragment, useEffect, useState} from 'react';
import { Button, Input } from "@material-ui/core";
import { CognitoAuth } from 'amazon-cognito-auth-js';
import TextField from "@material-ui/core/TextField";
import { confirmAccessCode } from "../actions/actions";

export const initCognitoSDK = () => {
    const authData = {
        ClientId : '6requ0b4e047k3nae12omq18v', // Your client id here
        AppWebDomain : 'fly-with-aaron.auth.us-east-1.amazoncognito.com', // Exclude the "https://" part.
        TokenScopesArray : ['openid','email','phone', 'aws.cognito.signin.user.admin', 'profile'],
        RedirectUriSignIn : "http://localhost:3000/dashboard",
        RedirectUriSignOut : "http://localhost:3000/logout",
        UserPoolId : 'us-east-1_kIaLEFq20',
        AdvancedSecurityDataCollectionFlag : false
    };
    const auth = new CognitoAuth(authData);
    // You can also set state parameter
    // auth.setState(<state parameter>);
    auth.userhandler = {
        onSuccess: () => {},
        onFailure: () => {}
        /** E.g.
         onSuccess: function(result) {
				alert("Sign in success");
				showSignedIn(result);
			},
         onFailure: function(err) {
				alert("Error!" + err);
			}*/
    };
    // The default response_type is "token", uncomment the next line will make it be "code".
    // auth.useCodeGrantFlow();
    return auth;
};

const CognitoLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    let auth;
    auth = initCognitoSDK();
    auth.getSession();
    return (
        <div>
            Great! Redirecting to alt login...
            {/*<form noValidate autoComplete="off">*/}
            {/*    <Input*/}
            {/*        placeholder={ 'example@aaron.com' }*/}
            {/*        inputProps={{ 'aria-label': 'description' }}*/}
            {/*        onChange={ e => setEmail(e.target.value) }*/}
            {/*        value={ email }*/}
            {/*    />*/}
            {/*    <Input*/}
            {/*        inputProps={{ 'aria-label': 'description' }}*/}
            {/*        onChange={ e => setPassword(e.target.value) }*/}
            {/*        type={ 'password' }*/}
            {/*        value={ password }*/}
            {/*    />*/}
            {/*</form>*/}
            {/*<Button onClick={ () => login(email, password) } variant={ 'outlined'  }>Log In</Button>*/}
        </div>
    );
};

const ConfirmCode = ({ onConfirm }) => {
    const [code, setCode] = useState('');
    const handleSubmit = () => confirmAccessCode(code).then(() => onConfirm(true)).catch(() => onConfirm(false));
    return (
        <div>
            <div>Enter your access code:</div>
            <form noValidate autoComplete="off" onSubmit={ handleSubmit }>
                <Input
                    inputProps={{ 'aria-label': 'secret code' }}
                    onChange={ e => setCode(e.target.value) }
                    value={ code }
                />
            </form>
            <Button
                onClick={ handleSubmit }
                variant={ 'outlined'  }>
                Confirm Code
            </Button>
        </div>
    )
};

const Login = () => {
    const [codeConfirmed, setCodeConfirmed] = useState(undefined);
    return (
        <Fragment>
            { !codeConfirmed && <ConfirmCode onConfirm={ confirmed => setCodeConfirmed(confirmed)}/> }
            { codeConfirmed === true && <CognitoLogin/> }
            { codeConfirmed === false && <span>Bad code!</span>}
        </Fragment>
    );
};

export default Login;
