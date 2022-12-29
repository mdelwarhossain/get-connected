import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import Modal from '../../components/Modal/Modal';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import Loading from '../Shared/Loading';

const About = () => {
    const [currentUser, setCurrentUser] = useState(null); 
    const { user } = useContext(AuthContext);
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            try {
                const res = await fetch(`https://social-media-server-phi.vercel.app/users/${user?.email}`, {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                setCurrentUser(data)
                return data;
            }
            catch (error) {

            }
        }
    });
    console.log(currentUser);

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className="md:w-1/2 mx-auto card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={data?.image} alt="User" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{data?.name}</h2>
                <p>{data?.email}</p>
                <p>{data?.birthday}</p>
                <p>{data?.sex}</p>
                <div className="card-actions">
                    <label
                        htmlFor="booking-modal"
                        className="btn btn-accent text-white"
                        onClick={()=> setCurrentUser(data)}
                    >Edit Profile</label>
                </div>
            </div>
            {
                    currentUser &&
                    <Modal
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                    refetch={refetch}
                ></Modal>
                }
        </div>
    );
};

export default About;