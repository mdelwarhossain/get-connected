import React, { useContext } from 'react';
import { FaUserFriends, FaPhotoVideo } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const LeftSide = ({currentUser}) => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/')
            })
            .catch(err => console.log(err));
    }
    console.log(user);

    return (
        <div className='ml-5'>
            <div className='flex gap-4'>
                <img className='h-10 w-10 rounded-full' src={currentUser?.image} alt="" />
                <span className='flex gap-2'> {currentUser?.name}</span>
            </div>
            <div className='flex flex-col justify-center'>
                <button className='flex gap-4 btn-ghost px-4 py-2'><FaUserFriends></FaUserFriends> Friends</button>
                <button className='flex gap-4 btn-ghost px-4 py-2'><FaUserFriends></FaUserFriends> Groups</button>
                <button className='flex gap-4 btn-ghost px-4 py-2'><FaPhotoVideo></FaPhotoVideo> Watch</button>
                <button onClick={handleLogOut} className='flex gap-4 btn-ghost px-4 py-2'><FaPhotoVideo></FaPhotoVideo> Logout</button>
                
            </div>
        </div>
    );
};

export default LeftSide;