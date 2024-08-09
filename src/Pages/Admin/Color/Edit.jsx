import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../../Context/MainContext';
import axios from 'axios';

const Edit = () => {
    const {id} = useParams();
    const {BASE_URL, COLOR_URL, openToast, fetchColor} = useContext(Context);
    const [color, setColor] = useState({name : "", code : ""})
    const navigation = useNavigate();
    useEffect(
        ()=>{
            if(id != undefined){
                axios.get(BASE_URL + COLOR_URL + "/" + id)
                .then(
                    (success)=>{
                        if(success.data.status){
                            setColor(success.data.colors);
                        }else{
                            openToast(success.data.msg, "error")
                        }
                    }
                ).catch(

                )
            }
        },[id]
    )

    const formEditHandler = (e)=>{
        e.preventDefault();
        const name = e.target.name.value;
        const color = e.target.color.value;
        axios.put(BASE_URL + COLOR_URL + "/edit/" + id, {name, color})
        .then(
            (success)=>{
                if(success.data.status){
                    openToast(success.data.msg, "success");
                    fetchColor();
                    navigation("/admin/color")
                }
            }
        ).catch(
            (error)=>{
                openToast(error.data.msg, "error");
            }
        )
    }

    return (
        <div className='mb-14'>
            <div className='text-center text-2xl my-3 font-semibold'>Add Color</div>
            <form onSubmit={formEditHandler} className="w-full px-3 mx-auto mt-4">
                <div className='grid grid-cols-2 gap-2'>
                    <div className="mb-5">
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Color Name
                        </label>
                        <input
                            value={color?.name}
                            onChange={(e)=>{setColor({...color, name : e.target.value})}}
                            type="text"
                            id="name"
                            name="name"
                            className="bg-gray-50 border border-gray-300 capitalize text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter Color"
                            required=""
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="color"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Color
                        </label>
                        <input
                            value={color?.code}
                            onChange={(e)=> {setColor({...color, code : e.target.value})}}
                            type="color"
                            id="color"
                            name="color"
                            className="h-[45px] bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required=""
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Add
                </button>
            </form>
        </div>
    );
}

export default Edit;
