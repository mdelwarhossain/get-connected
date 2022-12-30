import React from 'react';

const Comments = ({data, postId}) => {
    return (
        <div className='flex gap-4 py-4'>
            <img className='w-10 h-10' src={data?.comment.image} alt='' />
            <div className='bg-slate-100 bordered'>
                <p className='font-bold'>{data?.comment.name}</p>
                <p className='min-w-full italic'>{data?.comment.comment}</p>
            </div>
        </div>
    );
};

export default Comments;