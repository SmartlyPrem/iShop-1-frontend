import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Context } from '../../Context/MainContext';

const PlaceOrder = () => {
    const { BASE_URL, ORDER_URL, } = useContext(Context);
    const { order_id } = useParams();
    const [orderDetails, setOrderDetails] = useState();

    function thankYou() {
        axios.get(BASE_URL + ORDER_URL + "/get-orders?order_id=" + order_id)
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        setOrderDetails(success.data.orders[0])
                    }
                }
            ).catch(
                (error) => {

                }
            )
    }
    
    useEffect(
        () => {
            thankYou(order_id)
        }, []
    )

    return (
        <div>
            <div className="flex items-center justify-center h-screen">
                <div className="p-1 rounded shadow-lg bg-gradient-to-r from-purple-500 via-green-500 to-blue-500">
                    <div className="flex flex-col items-center p-4 space-y-2 bg-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-green-600 w-28 h-28"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <h1 className="text-4xl font-bold laptop:font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                            Thank You ! {orderDetails?.shipping_details?.name}
                        </h1>
                        <p>
                            Thank you for your interest! Check your email for a link to the guide.
                        </p>
                        <p>
                            <span className='text-blue-600 font-semibold'>Total order:</span> ₹{orderDetails?.order_total.toLocaleString()}
                        </p>
                        <Link to={"/"} className="inline-flex items-center px-4 py-2 text-white bg-indigo-600 border border-indigo-600 rounded laptop:rounded-full hover:bg-indigo-700 focus:outline-none focus:ring cursor-pointer">
                            <svg
                                // xmlns="http://www.w3.org/2000/svg"
                                className="w-3 h-3 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                                />
                            </svg>
                            <span className="text-sm font-medium">Home</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlaceOrder;
