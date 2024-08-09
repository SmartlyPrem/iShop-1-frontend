import React, { useContext, useState } from 'react';
import { IoIosAddCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Context } from '../../../Context/MainContext';
import axios from 'axios';

const View = () => {
    const { BASE_URL, COLOR_URL, colors, openToast, fetchColor } = useContext(Context);

    function changeStatus(id, new_status) {
        axios.patch(BASE_URL + COLOR_URL + "/change-status/" + id, {status : new_status})
        .then(
            (success)=>{
                if(success.data.status){
                    openToast(success.data.msg, "success");
                    fetchColor();
                }
            }
        ).catch(
            (error)=>{
                openToast(error.data.msg, "error");
            }
        )
    }

    const deleteColor = (id) => {
        axios.delete(BASE_URL + COLOR_URL + "/delete/" + id)
        .then(
            (success)=>{
                if(success.data.status){
                    openToast(success.data.msg, "success");
                    fetchColor();
                }else{
                    openToast(success.data.msg, "error");
                }
            }
        ).catch(
            (error)=>{
                openToast("Cliend side error", "error");
            }
        )
    }

    return (
        <div className='mb-14'>
            <div className='mt-4 p-3'>
                <button className='ml-auto block'>
                    <Link to="/admin/color/add" className='flex items-center mb-4 text-lg p-2 bg-blue-600 rounded-lg text-white gap-2'>
                        <IoIosAddCircle className='text-2xl' /> Add
                    </Link>
                </button>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Sr No.
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Category name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Color
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                colors.map(
                                    (color, i) => {
                                        return <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-600 whitespace-nowrap dark:text-white">
                                                {i + 1}
                                            </td>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize">
                                                {color.name}
                                            </th>
                                            <td className="px-6 py-4">
                                                <span className='block py-3' style={{ background: color.code }}></span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button onClick={()=> changeStatus(color._id, !color.status)} className={`${color.status ? "bg-green-600" : "bg-red-600"} text-white p-2 rounded`} >{color.status == true ? "Active" : "Inactive"}</button>
                                            </td>
                                            <td className="px-6 py-4 flex items-center text-xl gap-2">
                                                <MdDeleteForever onClick={()=> deleteColor(color._id)} className='text-2xl cursor-pointer text-red-600' />
                                                <Link to={"/admin/color/edit/" + color._id}>
                                                    <FaEdit className='text-xl cursor-pointer text-blue-600' />
                                                </Link>
                                            </td>
                                        </tr>
                                    }
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default View;
