import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../Context/MainContext';
import axios from 'axios';
import { emptyCart } from '../../reducer/CartSlice';
import useRazorpay from "react-razorpay";

const Checkout = () => {
    const [Razorpay] = useRazorpay();
    const { products, fetchProducts, ProdImgPath, BASE_URL, ORDER_URL, formatPrice} = useContext(Context);
    const cart = useSelector(store => store.cart);
    const user = useSelector(store => store.user);
    const dispatcher = useDispatch();
    const navigator = useNavigate();
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(
        () => {
            const data = []
            for (let p of products) {
                for (let c of cart.data) {
                    if (c.pId == p._id) {
                        data.push(
                            {
                                ...c, ...p
                            }
                        )
                    }
                }
            }
            setCartProducts(data)
        }, [cart, products]
    )

    useEffect(
        () => {
            fetchProducts();
        }, []
    )

    const CheckoutHandler = (e) => {
        e.preventDefault();
        const shipping_details = {
            name: e.target.name.value,
            email: e.target.email.value,
            contact: e.target.contact.value,
            address: e.target.address.value,
            pincode: e.target.pincode.value,
        }
        const payment_method = e.target.payment_method.value;
        const order_total = cart.total + (payment_method == "1" ? 50 : 0);
        axios.post(BASE_URL + ORDER_URL + "/place-order", {
            payment_method,
            order_total,
            shipping_details,
            product_details: cartProducts,
            user_id: user.data._id
        }).then(
            (success) => {
                if (success.data.status == 1) {
                    if (payment_method == 1) {
                        // thank you 
                        dispatcher(emptyCart())
                        navigator("/order-placed/" + success.data.order_id)
                    } else {
                        // online payment
                        initRazorpayOrder(success.data.order_id, order_total, success.data.razor_order.id, shipping_details)
                    }
                }
            }
        ).catch(
            () => {
            }
        )
    }

    function initRazorpayOrder(order_id, amount, razorpay_order_id, userData) {
        const options = {
            key: "rzp_test_2cBbihgiE7gQdd", // Enter the Key ID generated from the Dashboard
            amount: amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "iSHOP",
            description: "Apaki Apani Dukan",
            image: "http://localhost:3000/img/Home/iSHOP%20Logo.png",
            order_id: razorpay_order_id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
            handler: function (razorpay_response) {
            axios.post(BASE_URL + ORDER_URL + "/payment-success", { order_id, razorpay_response, user_id: user.data._id })
                    .then(
                        (success) => {
                            if (success.data.status == 1) {
                                navigator("/order-placed/" + success.data.order_id)
                                dispatcher(emptyCart());
                            } else {

                            }
                        }
                    ).catch(
                        (error) => {

                        }
                    )
            },
            prefill: {
                name: userData.name,
                email: userData.email,
                contact: userData.contact,
            },
            theme: {
                color: "#ff4252",
            },
        };

        const rzp1 = new Razorpay(options);

        rzp1.on("payment.failed", function (response) {
            const razorpay_response = {
                razorpay_order_id : response.error.metadata.order_id,
                razorpay_payment_id : response.error.metadata.payment_id,
            }
            axios.post(BASE_URL + ORDER_URL + "/payment-failed", {
                order_id, 
                razorpay_response
            })
            // alert(response.error.code);
            // alert(response.error.description);
            // alert(response.error.source);
            // alert(response.error.step);
            // alert(response.error.reason);
            // alert(response.error.metadata.order_id);
            // alert(response.error.metadata.payment_id);
        });

        rzp1.open();
    }

    return (
        <>
            <div className='block laptop:flex container mx-auto my-5 gap-4 w-full'>
                <div className='border order-2 laptop:order-1 rounded shadow-sm p-3 w-[90%] mobile:w-3/4 mx-auto laptop:w-[40%]'>
                    <form onSubmit={CheckoutHandler}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                defaultValue={user.data?.name}
                                className="mt-1 block w-full border-gray-300 rounded shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 p-1 capitalize"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                defaultValue={user.data?.email}
                                className="mt-1 block w-full border-gray-300 rounded shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 p-1"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="contact"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Contact
                            </label>
                            <input
                                type="tel"
                                id="contact"
                                name="contact"
                                className="mt-1 block w-full border-gray-300 rounded shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 p-1"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="address"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Address
                            </label>
                            <textarea
                                id="address"
                                name="address"
                                rows={3}
                                className="mt-1 block w-full border-gray-300 rounded shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 p-1 capitalize"
                                defaultValue={""}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="pincode"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Pincode
                            </label>
                            <input
                                type="number"
                                id="pincode"
                                name="pincode"
                                className="mt-1 block w-full border-gray-300 rounded shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 p-1"
                            />
                        </div>
                        <div className="mb-4">
                            <span className="block text-sm font-medium text-gray-700 mb-2">
                                Payment Method
                            </span>
                            <div className="flex items-center space-x-4">
                                <input
                                    type="radio"
                                    id="cod"
                                    name="payment_method"
                                    defaultValue="1"
                                    className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                                />
                                <label htmlFor="cod" className="font-medium text-gray-700">
                                    COD (₹50 extra)
                                </label>
                                <input
                                    type="radio"
                                    id="online"
                                    name="payment_method"
                                    defaultValue="2"
                                    checked
                                    className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                                />
                                <label htmlFor="online" className="font-medium text-gray-700">
                                    Online Payment
                                </label>
                            </div>
                        </div>
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                            >
                                Place Order
                            </button>
                        </div>
                    </form>
                </div>
                <div className='order-1 laptop:order-2 w-[90%] mobile:w-3/4 mx-auto laptop:w-[60%] mt-5'>
                    {
                        cart.data.length != 0 ? <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Product name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Price
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Total Price
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cartProducts?.map(
                                            (prod, i) => {
                                                return <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th
                                                        scope="row"
                                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center gap-3 capitalize"
                                                    >
                                                        <img width={130} src={BASE_URL + ProdImgPath + prod?.image} alt="" />
                                                        {prod?.name}
                                                    </th>
                                                    <td className="px-6 py-4">{formatPrice(prod?.discount_price)} x {prod?.qty}</td>
                                                    <td className="px-6 py-4">{formatPrice(prod?.discount_price * prod?.qty)}</td>
                                                </tr>
                                            }
                                        )
                                    }

                                </tbody>
                            </table>
                            <div className='py-3 text-xl font-semibold text-right'>
                                <span className='text-orange-600'>Total price: </span> ₹{formatPrice(cart.total)}
                            </div>
                        </div> : <div className='container mx-auto text-3xl my-3'>
                            Please add any product
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default Checkout;
