import React from 'react';
import { useLoaderData } from 'react-router-dom';

const PostDetails = () => {
    const data = useLoaderData();
    console.log(data);
    return (
        <div className="card w-96 bg-base-100 shadow-xl md:w-1/2 mx-auto">
            <div className="card-body">
                <h2 className="card-title">Posted by: {data?.name} </h2>
                <p>{data?.post}</p>
            </div>
            <figure><img src={data?.image} alt="Post" /></figure>
            <div className='ml-4 my-5'>
            <span>Posted On: {data?.posted}</span><br />
            <span>Email Address: {data?.email}</span>
            </div>
        </div>
    );
};

export default PostDetails;