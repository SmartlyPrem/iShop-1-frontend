import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../Context/MainContext';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdFileDownloadDone } from "react-icons/md";
import { MdOutlinePending } from "react-icons/md";

const YourOrder = () => {
    const { BASE_URL, ORDER_URL, formatPrice } = useContext(Context);
    const user = useSelector(store => store.user);
    const [orders, setOrder] = useState();
    const navigator = useNavigate();
    const [ProdImgPath, setProdImgPath] = useState()
    useEffect(
        () => {
            const lsUser = localStorage.getItem("user");
            if (!lsUser) {
                navigator("/login")
            }
        }, []
    )

    function fetchOrders() {
        axios.get(BASE_URL + ORDER_URL + "/get-orders?user_id=" + user.data?._id, {
            headers: {
                Authorization: user.token
            }
        })
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        setOrder(success.data.orders)
                        setProdImgPath(success.data.ProdImgPath);
                    }
                }
            ).catch(
                (error) => {

                }
            )
    }

    useEffect(
        () => {
            if (user.data) {
                fetchOrders();
            }
        }, [user]
    )
    const [newOrders, setNewOrders] = useState([]);
    useEffect(
        () => {
            if (orders) {
                setNewOrders(orders.reverse())
            }
        }, [orders]
    )

    function cancelOrder(id) {
        axios.delete(BASE_URL + ORDER_URL + "/delete-order/" + id, {
            headers: {
                Authorization: user.token
            }
        })
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        fetchOrders();
                    }
                }
            ).catch(
                (error) => {

                }
            )
    }
    return (
        <div>
            <section className="py-24 relative">
                <div className="w-full max-w-7xl px-4 tablet:px-5 lg-6 mx-auto">
                    {newOrders?.length != 0 ?
                        newOrders?.map(
                            (d, i) => {
                                return (
                                    <div key={i} className="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-laptop:mx-auto laptop:max-w-full mb-3">
                                        <div className="flex flex-col laptop:flex-row laptop:items-center justify-between px-6 pb-6 border-b border-gray-200">
                                            <div className="data">
                                                <p className="font-semibold text-base leading-7 text-black">
                                                    Order Id :
                                                    <span className="text-indigo-600 font-medium"> {d._id}</span>
                                                </p>
                                                <p className="font-semibold text-base leading-7 text-black mt-4">
                                                    Order Date :{" "}
                                                    <span className="text-gray-400 font-medium"> {new Date(d.createdAt).toDateString()}</span>
                                                </p>
                                            </div>
                                            <button className="rounded-full py-3 px-7 font-semibold text-sm leading-7 text-white bg-indigo-600 max-laptop:mt-5 shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">
                                                Track Your Order
                                            </button>
                                        </div>
                                        <div className="w-full px-3 min-[400px]:px-6">
                                            {
                                                d?.product_details?.map(
                                                    (data, index) => {
                                                        return (

                                                            <div key={index} className="flex flex-col laptop:flex-row items-center py-6 gap-6 w-full">
                                                                <div className="img-box max-laptop:w-full">
                                                                    <img
                                                                        src={BASE_URL + ProdImgPath + data.image}
                                                                        alt={`${data.name} image`}

                                                                        className="aspect-square w-[35%] laptop:w-full laptop:max-w-[140px]"
                                                                    />
                                                                </div>
                                                                <div className="flex flex-row items-center w-full ">
                                                                    <div className="grid grid-cols-1 laptop:grid-cols-2 w-full">
                                                                        <div className="flex items-center">
                                                                            <div className="">
                                                                                <h2 className="font-semibold capitalize text-xl leading-8 text-black mb-3 ">
                                                                                    {data.name}
                                                                                </h2>
                                                                                <p className="font-normal text-lg leading-8 text-gray-500 mb-3">
                                                                                    {data.best_seller ? "Best Deal" : 'Best Product'}
                                                                                </p>
                                                                                <div className="flex items-center  ">
                                                                                    <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                                                                                        Size: <span className="text-gray-500">Regular</span>
                                                                                    </p>
                                                                                    <p className="font-medium text-base leading-7 text-black ">
                                                                                        Qty: <span className="text-gray-500">{data.qty}</span>
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="grid grid-cols-5">
                                                                            <div className="col-span-5 laptop:col-span-1 flex items-center max-laptop:mt-3">
                                                                                <div className="flex gap-3 laptop:block">
                                                                                    <p className="font-medium text-sm leading-7 text-black">
                                                                                        price
                                                                                    </p>
                                                                                    <p className="laptop:mt-4 font-medium text-sm leading-7 text-indigo-600">
                                                                                        ₹{formatPrice(data?.discount_price)}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-span-5 laptop:col-span-2 flex items-center max-laptop:mt-3 ">
                                                                                <div className="flex gap-3 laptop:block">
                                                                                    <p className="font-medium text-sm leading-7 text-black">
                                                                                        Status
                                                                                    </p>
                                                                                    <p className="font-medium text-sm leading-6 py-0.5 px-3 whitespace-nowrap rounded-full laptop:mt-3 bg-indigo-50 text-indigo-600">
                                                                                        {d?.order_status == 1 ? "Pending" : "Done"}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-span-5 laptop:col-span-2 flex items-center max-laptop:mt-3">
                                                                                <div className="flex gap-3 laptop:block">
                                                                                    <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">
                                                                                        Expected Delivery Time
                                                                                    </p>
                                                                                    <p className="font-medium text-base whitespace-nowrap leading-7 laptop:mt-3 text-emerald-500">
                                                                                        23rd March 2021
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                )
                                            }

                                        </div>
                                        <div className="w-full border-t border-gray-200 px-6 flex flex-col laptop:flex-row items-center justify-between ">
                                            <div className="flex flex-col mobile:flex-row items-center max-laptop:border-b border-gray-200">
                                                <button onClick={() => cancelOrder(d._id)} className="flex outline-0 py-6 mobile:pr-6  mobile:border-r border-gray-200 whitespace-nowrap gap-2 items-center justify-center font-semibold group text-lg text-black bg-white transition-all duration-500 hover:text-indigo-600">
                                                    <svg
                                                        className="stroke-black transition-all duration-500 group-hover:stroke-indigo-600"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width={22}
                                                        height={22}
                                                        viewBox="0 0 22 22"
                                                        fill="none"
                                                    >
                                                        <path
                                                            d="M5.5 5.5L16.5 16.5M16.5 5.5L5.5 16.5"
                                                            stroke=""
                                                            strokeWidth="1.6"
                                                            strokeLinecap="round"
                                                        />
                                                    </svg>
                                                    Cancel Order
                                                </button>
                                                <p className="font-medium text-lg text-gray-900 pl-6 py-3 max-laptop:text-center">
                                                    {d?.payment_method == 1 ? "Cash on Delivery" : <>
                                                        Paid using Credit Card{" "}
                                                        <span className="text-gray-500">ending with 8822</span>
                                                    </>}

                                                </p>
                                            </div>
                                            <p className="font-semibold text-lg text-black py-6">
                                                Total Price: <span className="text-indigo-600"> ₹{formatPrice(d.order_total)}</span>
                                            </p>
                                        </div>
                                    </div>
                                )
                            }
                        ) : "Please wait untill your products was fetching"
                    }
                </div>
            </section>
        </div>
    );
}

export default YourOrder;
