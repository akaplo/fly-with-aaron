import React from 'react';

const User = ({ user }) => {
    return (
        <div>
            <div>{ user.name }</div>
            <div>{ user.email }</div>
            <div>{ user.phone }</div>
        </div>
    );
};

export default User;
