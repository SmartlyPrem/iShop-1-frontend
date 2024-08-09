import React, { useContext } from 'react';
import { FaStar } from "react-icons/fa";
import { Context } from '../../Context/MainContext';
import { useDispatch, useSelector } from 'react-redux';
import { BsCart4 } from "react-icons/bs";
import { addToCart } from '../../reducer/CartSlice';
import axios from 'axios';

const ProducBox = ({ name, _id, image, rating = 4, price, color, discount_per, discount_price, bestProdImg, best_seller }) => {
    const { BASE_URL, ProdImgPath, CART_URL, formatPrice } = useContext(Context);
    const user = useSelector(store => store.user);
    const dispatcher = useDispatch()
    const cart = useSelector(store => store.cart);

    function addTodbCart(pId) {
        if (user.data != null) {
            // !user.data
            axios.post(BASE_URL + CART_URL + "/add-to-cart", { user_id: user.data._id, pId: pId })
                .then(
                    (success) => { }
                )
                .catch(
                    (error) => { }
                )
        }
    }

    return (
        <div className="relative m-10 w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-md">
            <a href="#">
                <img
                    className='w-full h-[200px] p-2'
                    src={`${BASE_URL}${bestProdImg != null ? bestProdImg : ProdImgPath}${image}`}
                    alt="product image"
                />
            </a>
            {
                best_seller ? <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-red-600 text-center text-sm text-white">
                    Sale
                </span> : ''
            }
            <div className="mt-4 px-5 pb-5">
                <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-slate-900">
                        {name}
                    </h5>
                </a>
                <div className="my-2.5 flex items-center">
                    <span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                        {rating}.0
                    </span>
                    <Stars yellow={rating} />
                </div>
                <div>
                    {
                        color.map(
                            (color, i) => {
                                return <span key={i} style={{ backgroundColor: color.code }} className='px-[10px] me-2 rounded-full'></span>
                            }
                        )
                    }
                </div>

                <p>
                    {
                        discount_per != 0 ?
                            <>
                                <span className="text-2xl font-bold text-slate-900 me-2">₹{formatPrice(discount_price)}</span>
                                <span className='text-[#C1C8CE] line-through text-center'>₹ {price}</span>
                            </> : <span className="text-3xl font-bold text-slate-900">₹ {price}</span>
                    }
                </p>
                <div className="flex justify-center mt-2">
                    <button
                        onClick={() => {
                            dispatcher(addToCart({ price: discount_price, pId: _id, qty: 1 }));
                            addTodbCart(_id);
                        }}
                        className="relative rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                        {
                            cart.data.map(
                                (prod, i) => {
                                    return prod.pId == _id ? <div key={i} className='absolute top-[-5px] right-[-5px] bg-red-600 text-[15px] flex justify-center items-center text-white rounded-full h-[15px] w-[15px] p-3'>
                                        {prod.qty}
                                    </div> : ''
                                }
                            )
                        }

                    </button>
                </div>
            </div>
        </div>

    );
}

const Service = ({ services }) => {
    return (
        <div className='container mx-auto grid grid-cols-1 laptop:grid-cols-3 gap-20 my-10 p-2'>
            {
                services.map(
                    (ser, i) => {
                        return <div className='flex flex-col items-center' key={i}>
                            <img src={ser.img} alt="" />
                            <h3 className='my-4 font-semibold'>{ser.Name}</h3>
                            <p className='text-center text-gray-500'>{ser.desc}</p>
                        </div>
                    }
                )
            }
        </div>
    )
}

export default ProducBox;
export { Service };

function Stars({ yellow }) {
    let stars = [];
    for (var i = 1; i <= 5; i++) {
        if (i <= yellow) {
            stars.push(<FaStar key={i} color='#FFC600' />)
        } else {
            stars.push(<FaStar key={i} color='#C1C8CE' />)
        }
    }
    return <div className='flex justify-center'>{stars}</div>
}

export { Stars };