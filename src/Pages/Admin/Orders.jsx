import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../Context/MainContext';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { lsToCurrentState } from '../../reducer/AdminSlice';

const Orders = () => {
    const { BASE_URL, formatPrice} = useContext(Context);
    const admin = useSelector(store => store.admin);
    const navigator = useNavigate();
    const dispatcher = useDispatch();
    const [orders, setOrder] = useState([]);

    useEffect(
        () => {
            dispatcher(lsToCurrentState());

            const lsAdmin = localStorage.getItem("admin");
            if (!lsAdmin) {
                navigator("/admin/sign-in")
            }
        }, []
    )

    useEffect(
        () => {
            axios.get(BASE_URL + "/order/get-orders", {
                headers: {
                    Authorization: admin.token
                }
            })
                .then(
                    (success) => {
                        if (success.data.status === 1) {
                            setOrder(success.data.orders);
                        }
                    }
                ).catch(
                    (error) => {

                    }
                )
        }, [admin]
    )

    return (
        <div>
            <div className=" overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                #
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Order Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Customer Details
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders?.map(
                                (order, i) => {
                                    return <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="p-2 text-center">{i + 1}</td>
                                        <th
                                            scope="row"
                                            className="p-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {order._id}
                                        </th>
                                        <td className="p-2">
                                            {
                                                order?.product_details.map(
                                                    (prod, i) => {
                                                        return <div key={i} className='flex gap-3 capitalize'>
                                                            {prod.name} <span className='font-semibold'>Qty: {prod.qty}</span>
                                                        </div>
                                                    }
                                                )
                                            }
                                        </td>
                                        <td className="p-2 capitalize">
                                            <b> name :</b> {order.shipping_details.name}
                                            <br />
                                            <b>adress :</b> {order.shipping_details.address}
                                        </td>
                                        <td className="w-[10%] p-2">{new Date(order.createdAt).toLocaleString()}</td>
                                        <td className="p-2">₹{formatPrice(order.order_total)}</td>
                                        <td className="p-2">

                                            {
                                                order.order_status == 1 ? <span className='border-2 p-2 rounded-full border-orange-600 text-orange-600'>Pending</span> : order.order_status == 2 ? <span className='border-2 p-2 rounded-full border-green-600 text-green-600'>Success</span> : ""
                                            }
                                        </td>
                                    </tr>
                                }
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div >
    );
}

export default Orders;
