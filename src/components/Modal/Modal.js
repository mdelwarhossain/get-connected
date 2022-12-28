import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Modal = ({ currentUser, setCurrentUser, refetch }) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const imageHostKey = process.env.REACT_APP_imgbb_key;

    const navigate = useNavigate();


    const editProfile = data => {
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
                    const profile = {
                        name: data.name,
                        email: data.email,
                        birthday: data.birthday,
                        sex: data.sex,
                        phone: data.phone,
                        address: data.address,
                        image: imgData.data.url,
                    }
                    
                    console.log(profile);

                    // save product to the database
                    fetch(`http://localhost:5000/users/${currentUser.email}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(profile)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success('Your profile is updated successfully');
                            setCurrentUser(null)
                            refetch()
                            navigate('/about')
                        })
                }
            })
    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <h3 className="text-lg font-bold">{ }</h3>
                    <button onClick={() => setCurrentUser(null)} className='btn btn-accent text-white'>Everything looks fine</button>
                    <form onSubmit={handleSubmit(editProfile)} className='grid grid-cols-1 gap-3 mt-10'>
                        <input name="name" type="text" {...register("name")} defaultValue={currentUser?.name} placeholder="Your Name" className="input w-full input-bordered" />
                        <input name="email" type="email"
                            {...register("email")} defaultValue={currentUser?.email} placeholder="Email Address" className="input w-full input-bordered" />
                        <input name="sex" type="text" {...register("sex")} defaultValue={currentUser?.sex} placeholder="Product Name" className="input w-full input-bordered" />
                        <input name="birthday" {...register("birthday")} defaultValue={currentUser?.birthday} placeholder="Resale Price" className="input w-full input-bordered" />
                        <input name="phone" type="text" {...register("phone")} defaultValue={currentUser?.phone} placeholder="Phone Number" className="input w-full input-bordered" />
                        <input name="address" type="text" {...register("address")} defaultValue={currentUser?.address} placeholder="Address" className="input w-full input-bordered" />
                        <label className="label">
                            <span className="label-text">Chose your profile pic</span>
                        </label>
                        <input type="file" {...register("image")} className="input w-full max-w-xs" />
                        {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
                        <br />
                        <input className='btn btn-accent w-full' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default Modal;