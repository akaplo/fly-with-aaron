import React from 'react';
import { Link } from "react-router-dom";

const LoggedOut = () => (
        <div>
            Successfully logged out.
            <div><Link to={ '/' }>Return to login</Link></div>
        </div>
);

export default LoggedOut;
