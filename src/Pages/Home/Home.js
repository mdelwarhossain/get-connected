import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import LeftSide from '../../components/LeftSide/LeftSide';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import PopularPosts from '../Posts/PopularPosts';
import Loading from '../Shared/Loading';
import './Home.css'

const Home = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user } = useContext(AuthContext);

    const imageHostKey = process.env.REACT_APP_imgbb_key;

    const navigate = useNavigate();

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




    const handleAddPost = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url);
                    const post = {
                        name: currentUser?.name,
                        email: currentUser?.email,
                        post: data.post,
                        url: currentUser?.image,
                        image: imgData.data.url,
                        posted: new Date(),
                        like: 0,
                    }

                    // save post to the database
                    fetch('https://social-media-server-phi.vercel.app/post', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(post)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success('Your post is added successfully');
                            navigate('/posts')
                        })
                }
            })
    }

    // get popular posts
    const { data: popularposts, refetch } = useQuery({
        queryKey: ['popularposts'],
        queryFn: async () => {
            try {
                const res = await fetch('https://social-media-server-phi.vercel.app/popularposts', {
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
    console.log(popularposts);

    if (isLoading) {
        return <Loading></Loading>
    }

    console.log(currentUser);

    return (
        <div className='md:flex justify-between rounded-md mr-5'>
            <div className='leftside col-span-1'>
                <LeftSide
                    key={currentUser?._id}
                    currentUser={currentUser}
                ></LeftSide>
            </div>
            <div className='w-full mx-7'>
                <div className="bg-base-100 shadow-xl my-6">
                    <form onSubmit={handleSubmit(handleAddPost)} className='ml-5 mt-2'>
                        <div className='gap-8'>
                            <div className='flex gap-4 mb-4'>
                                <img className='h-10 w-10 rounded-full' src={currentUser?.image} alt="" />
                                <p className='mt-2'>{currentUser?.name}</p>
                            </div>
                            <div className="form-control w-full max-w-xs">

                                <input type="text" {...register("post", {
                                    required: "Name is Required"
                                })} placeholder="What's on your mind" className="input input-bordered w-full max-w-xs bg-gray-200" />
                                {errors.post && <p className='text-red-500'>{errors.title.message}</p>}
                            </div>
                        </div>
                        <div className='flex my-5'>
                            <div className="form-control w-full max-w-xs">
                                <input type="file" {...register("image", {
                                    required: "Photo is Required"
                                })} className="input w-full max-w-xs" />
                                {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
                            </div>
                            <input className='btn btn-ghost mb-5' value="Share" type="submit" />
                        </div>
                    </form>
                </div>
                <div className="bg-base-100 shadow-xl mt-5 col-start-2 col-end-auto">
                    {
                        popularposts?.map(ppost => <PopularPosts
                            key={ppost._id}
                            ppost={ppost}
                        ></PopularPosts>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;