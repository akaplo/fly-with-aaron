import React from 'react';
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { initCognitoSDK } from "../login/Login";

const styles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    name: {
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }
}));
const TopBar = ({ user }) => {
    const classes = styles();

    return (
        <AppBar position="static">
            <Toolbar variant={ 'dense' } className={ classes.flex }>
                <Typography variant={ 'h5' } className={classes.name}>
                    Fly With Aaron
                </Typography>
                { user.admin &&
                    <Typography variant={ 'h5' } className={classes.name}>
                        Administrator View
                    </Typography>
                }
                <div>
                    <Typography className={classes.name} >
                        { user.name } ({ user.email })
                    </Typography>
                    <Button onClick={ () => initCognitoSDK().signOut() }>Logout</Button>
                </div>

            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
