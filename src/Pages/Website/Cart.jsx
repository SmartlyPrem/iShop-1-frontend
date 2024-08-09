import React, { useContext, useEffect } from 'react';
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { Context } from '../../Context/MainContext';
import { changeCartQty, removeFromCart } from '../../reducer/CartSlice';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { checkoutClick } from '../../reducer/CheckoutSlice';

const Cart = () => {
    const { products, fetchProducts, ProdImgPath, BASE_URL, CART_URL, formatPrice } = useContext(Context);
    const cart = useSelector(store => store.cart);
    const user = useSelector(store => store.user);
    const dispatcher = useDispatch();
    const navigator = useNavigate();

    const cartProducts = [];
    for (let p of products) {
        for (let c of cart.data) {
            if (c.pId == p._id) {
                cartProducts.push(
                    {
                        ...c, ...p
                    }
                )
            }
        }
    }

    useEffect(
        () => {
            fetchProducts();
            // getCartProd();
        }, []
    )

    const changeDbCart = (pId, newQty) => {
        if (user.data != null) {
            axios.put(BASE_URL + CART_URL + "/change-qty", {
                user_id: user.data._id,
                pId,
                newQty
            })
                .then(
                    (success) => {
                    }
                ).catch(
                    (error) => {
                    }
                )
        }
    }

    function removeFromDbCart(pId) {
        if (user.data != null) {
            axios.post(BASE_URL + CART_URL + "/remove-from-cart", { pId, user_id: user.data._id })
                .then(() => { })
                .catch(() => { })

        }
    }

    const checkout = ()=>{
        if(user.data == null){
            navigator("/login");
            dispatcher(checkoutClick())
        }else {
            navigator("/checkout");
        }
    }

    return (
        <div>
            <div className='bg-my-h-color w-max-full py-3 text-center'>Cart</div>
            {
                cart.data.length != 0 ? <div className='container mx-auto my-16'>
                <div className='hidden laptop:flex text-center font-semibold border-b pb-5 mb-10'>
                    <div className='w-[70%]'>PRODUCTS</div>
                    <div className='w-[20%]'>PRICE</div>
                    <div className='w-[10%]'>QTY</div>
                </div>
                {
                    cartProducts?.map(
                        (prod, i) => {
                            return <div key={i} className='flex relative tablet:w-[75%] laptop:w-full tablet:mx-auto gap-3 my-16 px-1 tablet:px-0 border-b pb-6'>
                                <div className=' flex justify-center items-center laptop:w-[20%]'>
                                    <img width={130} src={BASE_URL + ProdImgPath + prod?.image} alt="" />
                                </div>
                                <div className='laptop:flex laptop:items-center w-full laptop:w-[80%]'>
                                    <h2 className='capitalize w-full laptop:w-[60%]'>{prod?.name}</h2>
                                    <div className='flex laptop:items-center laptop:flex-row gap-5 my-3 laptop:w-[30%]'>
                                        <div className='flex justify-center w-[30%] laptop:w-[70%] h-10 items-center gap-1 mobile:gap-2 laptop:gap-3 bg-my-h-color'>
                                            <button disabled={prod.qty == 1 ? 'disabled' : ''} onClick={() => {
                                                dispatcher(changeCartQty({
                                                    pId: prod?._id,
                                                    flag: false,
                                                    price: prod.discount_price
                                                }));

                                                changeDbCart(prod._id, prod.qty - 1)
                                            }} className='py-1 px-2 rounded text-black font-bold'>-</button>

                                            <span className='text-lg'>{prod?.qty}</span>
                                            <button onClick={() => {
                                                dispatcher(changeCartQty({
                                                    pId: prod?._id,
                                                    flag: true,
                                                    price: prod.discount_price
                                                }));

                                                changeDbCart(prod._id, prod.qty + 1)
                                            }} className='py-1 px-2 rounded text-black font-bold'>+</button>
                                        </div>
                                        <div className='laptop:w-[30%]'>₹ {formatPrice(prod?.discount_price * prod?.qty)}</div>
                                    </div>
                                    <div className='absolute laptop:flex justify-center laptop:static top-[-12px] right-4 laptop:w-[10%]'><MdCancel color='orange' onClick={() => {
                                        dispatcher(removeFromCart({
                                            pId: prod._id,
                                            total_price: prod?.discount_price * prod?.qty
                                        }));
                                        removeFromDbCart(prod._id)
                                    }} className='text-xl cursor-pointer' /></div>
                                </div>
                            </div>
                        }
                    )
                }

            </div> : 
            <div className='container mx-auto text-3xl my-3'>
                Please add any product
            </div>
            }
            <div className='container flex flex-col items-center tablet:grid grid-cols-1 tablet:grid-cols-2 tablet:w-[75%] laptop:w-full mx-auto my-10'>
                <div className='flex justify-center h-fit pb-8 w-3/4'>
                    <input className='border focus:outline-none w-full p-2 tablet:w-[300px] ' placeholder='Voucher Code' type="text" /> <button className='p-3 bg-blue-500 text-white'>Redeem</button>
                </div>
                <div className='w-3/4 tablet:ms-auto'>
                    <div className='border-b'>
                        <div className='flex justify-between py-2'><span>Subtotal</span><span>₹ 333</span></div>
                        <div className='flex justify-between py-2'><span>Shopping fee</span><span>₹ 53</span></div>
                        <div className='flex justify-between py-2'><span>Coupon</span><span>No</span></div>
                    </div>
                    <div className='flex justify-between py-2 font-semibold text-2xl'><span>Total :</span><span>₹{formatPrice(cart.total)}</span></div>
                    <button onClick={checkout} className='w-full p-3 bg-blue-500 text-white my-3'>Check Out</button>
                </div>
            </div>
        </div>
    );
}

export default Cart;

