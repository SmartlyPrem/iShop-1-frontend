import React, { useContext, useEffect } from 'react';
import { IoIosAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { Context } from '../../../Context/MainContext';
import axios from 'axios';

const View = () => {
    const { BASE_URL, products, PRODUCT_URL, ProdImgPath, openToast, fetchProducts } = useContext(Context);
    
    useEffect(
        ()=>{
            fetchProducts()
        },[]
    )

    const deleteProd = (id) => {
        axios.delete(BASE_URL + PRODUCT_URL + "/delete/" + id)
            .then(
                (success) => {
                    if (success.data.status) {
                        openToast(success.data.msg, "success");
                        fetchProducts();
                    } else {
                        openToast(success.data.msg, "error");
                    }
                }
            ).catch(
                (error) => {
                    openToast("Cliend side error", "error");
                }
            )
    }

    function changeStatus(id, new_status) {
        axios.patch(BASE_URL + PRODUCT_URL + "/change-status/" + id, { status: new_status })
            .then(
                (success) => {
                    if (success.data.status) {
                        openToast(success.data.msg, "success");
                        fetchProducts();
                    }
                }
            ).catch(
                (error) => {
                    openToast(error.data.msg, "error");
                }
            )
    }

    function chooseBestSeller(id, yes_no) {
        axios.patch(BASE_URL + PRODUCT_URL + "/change-selling/" + id, { status: yes_no })
            .then(
                (success) => {
                    if (success.data.status) {
                        openToast(success.data.msg, "success");
                        fetchProducts();
                    }
                }
            ).catch(
                (error) => {
                    openToast(error.data.msg, "error");
                }
            )
    }

    return (
        <div>
            <div className='mt-4 p-3 mb-14'>
                <button className='ml-auto block'>
                    <Link to="/admin/product/add" className='flex items-center mb-4 text-lg p-2 bg-blue-600 rounded-lg text-white gap-2'>
                        <IoIosAddCircle className='text-2xl' /> Add
                    </Link>
                </button>
                {
                    products?.map(
                        (prod, i) => {
                            return <div key={i} className="shadow p-2 mb-2">
                                <div className='flex justify-between items-center mb-3'>
                                    <h2 className='capitalize text-xl font-semibold'>{prod.name}</h2>
                                    <span className='lowercase border-b-2'>{prod.slug}</span>
                                </div>
                                <div className='grid grid-cols-2 mobile:grid-cols-3'>
                                    <div className='w-[120px] h-[120px]'>
                                        <img width={100} height={100} src={BASE_URL + ProdImgPath + prod.image} alt="" />
                                    </div>
                                    <div className='flex flex-col'>
                                        <span><b>Pirce</b> : ₹{prod.price}</span>
                                        <span><b>Discount</b> (%) : {prod.discount_per}</span>
                                        <span><b>Net Pirce</b> : ₹{prod.discount_price}</span>
                                    </div>
                                    <div className='flex flex-col col-span-2 mobile:col-span-1'>
                                        <span><b>Category</b> : {prod.category.name}</span>
                                        <div className='flex gap-2 my-2'><b>Colors</b>: <span className='flex gap-2'>
                                            {prod.color.map(
                                                (color) => {
                                                    return <span style={{ background: color.code }} className={`rounded-full p-3`}></span>
                                                }
                                            )}
                                        </span> </div>
                                    </div>
                                </div>
                                <div className="px-6 py-4 flex items-center justify-between text-xl gap-2">
                                    <div className='flex gap-2'>
                                        <button onClick={() => changeStatus(prod._id, !prod.status)} className={`${prod.status ? "bg-green-600" : "bg-orange-600"} text-white p-2 rounded text-sm mobile:text-lg`} >{prod.status == true ? "Active" : "Inactive"}</button>
                                        <button onClick={() => chooseBestSeller(prod._id, !prod.best_seller)} className={`${prod.best_seller ? "bg-orange-600" : "bg-green-600"} text-white p-2 rounded text-sm mobile:text-lg`} >{prod.best_seller == false ? "Yes" : "No"}</button>
                                    </div>
                                    <div className='flex gap-2'>
                                        <Link to={"/admin/product/edit/" + prod._id}>
                                            <button className={`bg-green-800 text-white p-2 rounded text-sm mobile:text-lg`} >Edit</button>
                                        </Link>
                                        <button onClick={() => deleteProd(prod._id)} className={`bg-red-600 text-white p-2 rounded text-sm mobile:text-lg`}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        }
                    )
                }
            </div>
        </div>
    );
}

export default View;
