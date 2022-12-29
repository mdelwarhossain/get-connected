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
    const { data: posts = [] } = useQuery({
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
    const handleShare = (id) => {
        setId(id);
        const commentData = {
            id,
            name: currentUser?.name,
            image: currentUser?.image,
            comment,

        }
        // save comments to the database
        fetch('https://social-media-server-phi.vercel.app/comments', {
            method: 'POST',
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


    const { data: comments, refetch } = useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
            try {
                const res = await fetch(`https://social-media-server-phi.vercel.app/comments/${id}`, {
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

    const handleLike = (id) => {
        console.log(id);
        let likeFieled = document.getElementById("like").innerText;
        console.log(likeFieled);
        const count = parseInt(likeFieled) + 1;
        console.log(count);
        const like = {
            like: count,
        }
        // save comments to the database
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

    console.log('comments', comments);

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
                    <div className='flex justify-evenly my-4 mx-4'>
                        <button onClick={() => handleLike(post?._id)} className=''>Like</button>
                        <span id='like'>{post?.like}</span>
                        <span className="collapse">
                            <input type="checkbox" />
                            <div className="collapse-title">
                                Comment
                            </div>
                            <div className="collapse-content">
                                <div className='flex gap-4'>
                                    <img src="" alt={currentUser?.image} />
                                    <input onChange={handleChange} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                    <button onClick={() => handleShare(post?._id)} className='btn btn-ghost'>Share</button>

                                </div>
                            </div>
                            <div>
                                {
                                    post._id === id &&
                                    comments?.map(data => <Comments
                                        id={comment._id}
                                        data={data}
                                    ></Comments>)
                                }
                            </div>
                        </span>
                        <span className='mt-4'><Link to={`/posts/${post._id}`} >Details</Link></span>
                    </div>
                </div>)
            }
        </div>
    );
};

export default Posts;