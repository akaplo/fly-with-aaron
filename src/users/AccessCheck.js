import React, { Fragment, useState } from 'react';
import { Button, Input } from "@material-ui/core";
import { confirmUser } from "../actions/actions";
import { Redirect } from 'react-router-dom';
const AccessCheck = ({ refreshUser, user }) => {
    const [code, setCode ] = useState('');
    const [userConfirmed, setConfirmed] = useState(false);

    if (userConfirmed) {
        return <Redirect to={ '/' }/>;
    }
    return (
        <Fragment>
            <div>Access check for { user && user.name }</div>
            <Input onChange={ e => setCode (e.target.value) }/>
            <Button
                onClick={ () =>
                    confirmUser(user, code)
                        .then(() => {
                            refreshUser(user.email).then(() => setConfirmed(true));
                        })
                        .catch(e => console.error(e))
                }
            >
                Confirm
            </Button>
        </Fragment>
    )
};

export default AccessCheck;