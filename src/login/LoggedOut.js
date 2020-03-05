import React, {useEffect, useState} from 'react';
import { Button, Input } from "@material-ui/core";
import {Link} from "react-router-dom";

const LoggedOut = () => (
        <div>
            Successfully logged out.
            <Link to={ '/' }>Return to login</Link>
        </div>
);

export default LoggedOut;
