import React from 'react';
import { useLoaderData } from 'react-router-dom';

const PostDetails = () => {
    const data = useLoaderData();
    console.log(data);
    return (
        <div className="card w-96 bg-base-100 shadow-xl md:w-1/2 mx-auto">
            <div className="card-body">
                <h2 className="card-title">Posted by: {data?.name} </h2>
                <span><small>Email Address: <strong>{data?.email}</strong></small></span>
                <p>{data?.post}</p>
            </div>
            <figure><img src={data?.image} alt="Post" /></figure>
            <div className='ml-4 my-5 flex flex-col'>
                <span>Posted On: {data?.posted}</span><br />
                <span>Total Likes: {data?.like}</span>
                <span>Total Comments: {data?.comments?.length}</span>
            </div>
        </div>
    );
};

export default PostDetails;