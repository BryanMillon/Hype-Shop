import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';

const IsAuthenticated = () => {
    const { isAuthenticated } = useAuth0();
    return (
        <div className='flex justify-around'>
            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
            <Profile />
        </div>
    )
}

export default IsAuthenticated