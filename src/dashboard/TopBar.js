import React, { useState } from 'react';
import {AppBar, Toolbar, Typography, Button, Menu, MenuItem, ListItemIcon} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { initCognitoSDK } from "../login/Login";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import CallToActionIcon from '@material-ui/icons/CallToAction';
import LockIcon from '@material-ui/icons/Lock';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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
        color: '#fff'
    },
    logout: {
        width: '100%'
    }
}));
const TopBar = ({ user }) => {
    const classes = styles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        initCognitoSDK().signOut();
    };

    return (
        <AppBar position="fixed">
            <Toolbar variant={ 'dense' } className={ classes.flex }>
                <Typography variant={ 'h5' } className={classes.name}>
                    FlywithAaron
                </Typography>
                { user && user.admin &&
                    <Typography variant={ 'h5' } className={classes.name}>
                        Administrator View
                    </Typography>
                }
                {
                    user &&
                    <div>
                        <Button
                            onClick={ handleMenu }
                        >
                            <Typography className={classes.name} >
                                <span>{ user ? user.name : '' }</span>
                            </Typography>
                        </Button>
                        <Menu
                            anchorEl={ anchorEl }
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={ Boolean(anchorEl) }
                            onClose={ handleClose }
                        >
                            <MenuItem disabled onClick={ handleClose }>
                                <ListItemIcon><MailOutlineIcon/></ListItemIcon>
                                { user.email }
                            </MenuItem>
                            <MenuItem disabled onClick={ handleClose }>
                                <ListItemIcon><CallToActionIcon/></ListItemIcon>
                                { user.weight + 'lbs' || 'Missing weight' }
                            </MenuItem>
                            <MenuItem onClick={ handleClose }>
                                <ListItemIcon><LockIcon/></ListItemIcon>
                                <span className={ classes.logout } onClick={ handleLogout }>Logout</span>
                            </MenuItem>
                        </Menu>
                    </div>
                }
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
