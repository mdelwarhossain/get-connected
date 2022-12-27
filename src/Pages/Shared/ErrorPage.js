import React, { useContext } from 'react';
import {  useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const DisplayError = () => {
    const { logOut } = useContext(AuthContext);
    const error = useRouteError();
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/login');
             })
            .catch(err => console.log(err));
    }

    return (
        <div className='w-1/2 mx-auto mt-10'>
            <p className='text-red-500'>Something went wrong!!!</p>
            <p className='text-red-400'>{error.statusText || error.message}</p>
            <h4 className="text-3xl"> Please <button onClick={handleLogOut} className='text-warning'>Sign out</button> and <span to='/login' className='text-success'>log back in</span></h4>
        </div>
    );
};

export default DisplayError;