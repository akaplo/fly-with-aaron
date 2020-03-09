import React, { Fragment, useState} from 'react';
import {Button, Input, InputAdornment, InputLabel} from "@material-ui/core";
import { CognitoAuth } from 'amazon-cognito-auth-js';
import { confirmAccessCode } from "../actions/actions";
import { Redirect } from 'react-router-dom';
import TopBar from "../dashboard/TopBar";
import { makeStyles } from "@material-ui/core/styles";
import VpnKeyIcon from '@material-ui/icons/VpnKey';

export const initCognitoSDK = () => {
    const authData = {
        ClientId : '6requ0b4e047k3nae12omq18v', // Your client id here
        AppWebDomain : 'fly-with-aaron.auth.us-east-1.amazoncognito.com', // Exclude the "https://" part.
        TokenScopesArray : ['openid','email','phone', 'aws.cognito.signin.user.admin', 'profile'],
        RedirectUriSignIn : "http://localhost:3000/dashboard",
        RedirectUriSignOut : "http://localhost:3000/",
        UserPoolId : 'us-east-1_kIaLEFq20',
        AdvancedSecurityDataCollectionFlag : false
    };
    const auth = new CognitoAuth(authData);
    // You can also set state parameter
    // auth.setState(<state parameter>);
    auth.userhandler = {
        onSuccess: () => console.log('successful login'),
        onFailure: () => console.error('failed login?')
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
    let auth;
    auth = initCognitoSDK();
    auth.getSession();
    return null;
};


const ConfirmCode = ({ onConfirm }) => {
    const classes = styles();
    const [code, setCode] = useState('');
    const handleSubmit = () => confirmAccessCode(code).then(() => onConfirm(true)).catch(() => onConfirm(false));
    return (
        <div className={ classes.code }>
            <div>
                <Input
                    inputProps={{ 'aria-label': 'secret code' }}
                    onKeyDown={ (e) => e.keyCode === 13 && handleSubmit() }
                    onChange={ e => setCode(e.target.value) }
                    outlined
                    startAdornment={ <InputAdornment position={ 'start' }><VpnKeyIcon/></InputAdornment>}
                    value={ code }
                />
                <InputLabel>Access Code</InputLabel>
            </div>
            <Button
                className={ classes.button }
                color={ 'primary' }
                onClick={ handleSubmit }
                size={ 'small' }
                variant={ 'contained' }
            >
                Confirm
            </Button>
        </div>
    )
};

const styles = makeStyles({
    button: {
        height: '2rem',
        marginLeft: '2rem'
    },
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'

    },
    code: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '1rem'
    }
});

const Login = ({ user }) => {
    const classes = styles();

    const [codeConfirmed, setCodeConfirmed] = useState(undefined);
    if (user) {
        return <Redirect to={ '/dashboard' } user={ user }/>
    }
    return (
        <Fragment>
            <TopBar/>
            <div className={ classes.container }>
                { !codeConfirmed && <span>The global access code is required before logging in:</span> }
                { !codeConfirmed && <ConfirmCode onConfirm={ confirmed => setCodeConfirmed(confirmed)}/> }
                { codeConfirmed === true && <CognitoLogin/> }
                { codeConfirmed === false && <span>Bad code!</span>}
            </div>
        </Fragment>
    );
};

export default Login;
