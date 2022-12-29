import React from 'react';

const PopularPosts = ({ ppost }) => {
    return (
        <div>
            <div className="card-body my-10">
                <div className='flex gap-4'>
                    <img className='h-10 w-10 rounded-full' src={ppost?.url} alt="" />
                    <span className='flex gap-2 font bold'> {ppost?.name}</span>
                </div>
                <p>{ppost?.post}</p>
            </div>
            <figure><img className='w-full' src={ppost?.image} alt="Shoes" /></figure>
        </div>
    );
};

export default PopularPosts;