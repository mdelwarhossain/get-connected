import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';

const Posts = () => {
    const { data: posts = [], refetch } = useQuery({
        queryKey: ['allbuyers'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/posts', {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    });

    

    console.log(posts);
    return (
        <div className='md:w-1/2 md:mx-auto'>
            {
                posts?.map(post => <div
                    key={post._id}
                >
                    <div className='flex gap-4'>
                    <img className='h-10 w-10 rounded-full' src={post?.url} alt="" />
                <span className='flex gap-2'> {post?.name}</span>
                    </div>
                
                    <div>
                        <p>{post?.post}</p>
                        <img src={post?.image} alt="" />
                    </div>
                    <div className='flex justify-evenly mt-2'>
                        <span>Like</span>
                        <span>Comments</span>
                        <span><Link to={`/posts/${post._id}`} >Details</Link></span>
                    </div>
                </div>)
            }
        </div>
    );
};

export default Posts;