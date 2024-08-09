import React, { useContext, useEffect } from 'react';
import { Context } from '../../../Context/MainContext';
import { Link, useNavigate } from 'react-router-dom';
import { FcBusinessman, FcBusinesswoman } from "react-icons/fc";
import { GrUserManager } from "react-icons/gr";
import { CiEdit } from "react-icons/ci";
import { CiImageOn } from "react-icons/ci";
import { useSelector } from 'react-redux';

const Profile = () => {
    const {profileGet, userDetails} = useContext(Context);
    const user = useSelector(store => store.user);
    const user_id = user?.data?._id;
    const navigator = useNavigate();

    useEffect(
        () => {
            const lsUser = localStorage.getItem("user");
            if(!lsUser){
                navigator("/login")
            }
        }, []
    )

    function ProfileImg(e){
        const image = e.target.name.files;
        console.log(image)
    }
    
    useEffect(
        () => {
            profileGet(user_id)
        }, [user]
    )


    return (
        <>
            <div className='bg-my-h-color w-max-full h-screen flex justify-center items-center'>
                <div className='w-[500px] bg-white relative'>
                    <div className='relative img-p-h'>
                        <div className='relative'>
                            {
                                userDetails?.gender == 1 ? <FcBusinessman className='w-[100px] h-[100px] p-1 bg-white absolute top-[-50px] left-[40%] border-2 border-blue-600 border-b-black rounded-full' /> : userDetails?.gender == 2 ? <FcBusinesswoman className='w-[100px] h-[100px] p-1 bg-white absolute top-[-50px] left-[40%] border-2 border-blue-600 border-b-black rounded-full' /> : <GrUserManager className='w-[100px] h-[100px] p-1 bg-white absolute top-[-50px] left-[40%] border-2 border-blue-600 border-b-black rounded-full' />
                            }
                            <span className='tr-c opacity-0 transition-500 absolute top-[-50px] left-[40%] w-[100px] h-[100px] rounded-full bg-[rgba(0,0,0,0.6)]'></span>
                        </div>
                        <span className='absolute bottom-[-45px] left-[55%] bg-blue-600 text-white p-1 rounded-full px-2'>
                            {
                                userDetails?.gender == 1 ? 'M' : userDetails?.gender == 2 ? 'F' : userDetails?.gender == 3 ? "O" : "O"
                            }
                        </span>
                        <span onClick={ProfileImg} className='img-tr-c hidden absolute bottom-[-12px] left-[47%] text-3xl'>
                            <CiImageOn color='white' />
                            <input name="profileImg" className='w-8 h-8 absolute top-0 opacity-0 cursor-pointer' type="file" />
                        </span>
                    </div>
                    <div className='mt-16 p-2'>
                        <h2 className='text-2xl font-semibold border-black border-b-2'>{userDetails?.name}</h2>
                        <h3 className='py-1 mt-2'><span className='font-semibold'>Email :</span> {userDetails?.email}</h3>
                        <h3 className='py-1 flex items-center gap-2'><span className='font-semibold'>Contact :</span>
                            {
                                userDetails?.contact != undefined ? userDetails?.contact : <CiEdit className='cursor-pointer' />
                            }
                        </h3>
                        <p className='py-1 flex items-center gap-2'>
                            <span className='font-semibold'>Bio :</span> {
                                userDetails?.bio != undefined ? userDetails?.bio : <CiEdit className='cursor-pointer' />
                            }
                        </p>
                        <p className='py-1 flex items-center gap-2'>
                            <span className='font-semibold'>Address :</span> {
                                userDetails?.address?.state != null ? userDetails?.address?.state : <CiEdit className='cursor-pointer' />
                            }
                        </p>
                        <Link
                            className="w-[100px] mt-2 block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            to={"/edit-profile"}
                        >
                            Edit
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
