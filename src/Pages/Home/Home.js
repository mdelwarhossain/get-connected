import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import LeftSide from '../../components/LeftSide/LeftSide';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import Loading from '../Shared/Loading';
import './Home.css'

const Home = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user } = useContext(AuthContext);

    const imageHostKey = process.env.REACT_APP_imgbb_key;

    const navigate = useNavigate();

    const { data: currentUser, isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/users/${user?.email}`, {
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
                    }

                    // save product to the database
                    fetch('http://localhost:5000/post', {
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

    if (isLoading) {
        return <Loading></Loading>
    }

    console.log(currentUser);

    return (
        <div className='home grid grid-cols-1 md:grid-cols-2 justify-items-start rounded-md'>
            <div className='leftside md:w-[18rem]'>
                <LeftSide
                    key={currentUser?._id}
                    currentUser={currentUser}
                ></LeftSide>
            </div>
            <form onSubmit={handleSubmit(handleAddPost)}>
                <div className='gap-8'>
                    <div className='flex gap-4 mb-4'>
                    <img className='h-10 w-10 rounded-full' src={currentUser?.image} alt="" />
                        <p>{currentUser?.name}</p>
                    </div>
                    <div className="form-control w-full max-w-xs">

                        <input type="text" {...register("post", {
                            required: "Name is Required"
                        })} placeholder="What's on your mind" className="input input-bordered w-full max-w-xs" />
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
                    <input className='btn btn-ghost' value="Share" type="submit" />
                </div>
                <div className='my-5'>

                </div>
            </form>
        </div>
    );
};

export default Home;