import { useQuery } from '@tanstack/react-query';
import { data } from 'autoprefixer';
import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import Comments from '../Comments/Comments';
import Loading from '../Shared/Loading';

const Posts = () => {
    const [id, setId] = useState(null);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { data: posts = [], refetch } = useQuery({
        queryKey: ['allbuyers'],
        queryFn: async () => {
            const res = await fetch('https://social-media-server-phi.vercel.app/posts', {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    });
    console.log(posts);

    const { data: currentUser, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            try {
                const res = await fetch(`https://social-media-server-phi.vercel.app/users/${user?.email}`, {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;
            }
            catch (error) {

            }
        }
    });

    let comment = {};

    const handleChange = (event) => {
        comment = event.target.value;
    }
    const handleSubmit = (id) => {
        // setId(id);
        const commentData = {
            name: currentUser?.name,
            image: currentUser?.image,
            comment,

        }

        // save comments to the database
        fetch(`https://social-media-server-phi.vercel.app/comments/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(commentData)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                toast.success('Your post is added successfully');
                // navigate('/posts')
                refetch()
            })
    }

    const handleLike = (id) => {
        console.log(id);
        let likeFieled = document.getElementById("like").innerText;
        console.log(likeFieled);
        const count = parseInt(likeFieled) + 1;
        console.log(count);
        const like = {
            like: count,
        }
        // save like to the database
        fetch(`https://social-media-server-phi.vercel.app/like/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(like)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                toast.success('Your like is added successfully');
                refetch()
                // navigate('/posts')
            })
        // return count;
    }

    if (isLoading) {
        return <Loading></Loading>
    }


    return (
        <div>
            {

                posts?.map(post => <div key={post._id} className="card w-96 bg-base-100 shadow-xl md:w-1/2 md:mx-auto gap-4 my-10">
                    <div className="card-body">
                        <div className='flex gap-4'>
                            <img className='h-10 w-10 rounded-full' src={post?.url} alt="" />
                            <span className='flex gap-2 font bold'> {post?.name}</span>
                        </div>
                        <p>{post?.post}</p>
                    </div>
                    <figure><img className='w-full' src={post?.image} alt="Shoes" /></figure>
                    <div className='my-4 mx-4'>
                        <div className='mt-4 flex justify-around '>
                            <div>
                            <button onClick={() => handleLike(post?._id)}>Like</button>
                            <span className='ml-2' id='like'>{post?.like}</span>
                            </div>
                            <span>Comment {post?.comments?.length}</span>
                            <span className=''><Link to={`/posts/${post._id}`} >Details</Link></span>
                        </div>
                        <div className='flex gap-4 mt-6 w-2/3 mx-auto'>
                            <img className='h-10 w-10 rounded-full' src={currentUser?.image} alt="" />
                            <input onChange={handleChange} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                            <button onClick={() => handleSubmit(post?._id)} className='btn btn-ghost'>Submit</button>
                        </div>
                        
                        
                    </div>
                    <div className='gap-4 ml-10'>
                            {
                                post?.comments?.map(data => <Comments
                                    id={comment._id}
                                    data={data}
                                ></Comments>)
                            }

                        </div>
                </div>)
            }
        </div>
    );
};

export default Posts;