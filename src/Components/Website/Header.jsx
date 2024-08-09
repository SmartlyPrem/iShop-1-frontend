import React, { useState } from 'react';
import { FaCaretDown } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FiShoppingCart } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { MdOutlineMenu } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducer/UserSlice';
import { emptyCart } from '../../reducer/CartSlice';
import { MdKeyboardArrowDown } from "react-icons/md";

const Header = () => {
    const [toggle, setToggle] = useState(false);
    const cart = useSelector(store => store.cart);
    const user = useSelector(store => store.user);
    const dispatcher = useDispatch();
    const [userBtn, setUserBtn] = useState(false);

    const menuItems = [
        {
            name: 'Home',
            url: '/'
        },
        {
            name: 'Store',
            url: '/store'
        },
        {
            name: 'iPhone',
            url: '/iphone'
        },
        {
            name: 'Ipade',
            url: '/ipade'
        },
        {
            name: 'Mackbook',
            url: '/mackbook'
        },
        {
            name: 'Accessories',
            url: '/accessories'
        },

    ]

    return (
        <>
            <div className='sticky top-0 left-0 bg-white z-[999] shadow'>
                <header className="container mx-auto px-3">
                    <div className='hidden mobile:flex justify-between py-3'>
                        <div className='flex gap-3'>
                            <span className='flex items-center gap-2'>En <FaCaretDown /></span>
                            <span className='flex items-center gap-2'>$ <FaCaretDown /></span>
                        </div>
                        <div className='flex gap-6'>
                            <span className='flex items-center gap-2'>
                                {
                                    user?.data == null ?
                                        <Link className='bg-blue-600 p-1 rounded text-white' to={"/login"}>
                                            Login
                                        </Link>
                                        : <>
                                            <Link className='bg-blue-600 p-1 rounded text-white' onClick={() => {
                                                dispatcher(logout());
                                                dispatcher(emptyCart());
                                            }}>
                                                Log out
                                            </Link>
                                            <div className='relative w-fit text-center' onClick={() => setUserBtn(!userBtn)}>
                                                <div className='flex items-center gap-2'>
                                                    <CgProfile />
                                                    <div className='capitalize cursor-pointer'>
                                                        Hii' <span className='border-b-2 border-blue-600'>{user?.data?.name}</span>
                                                    </div>
                                                       <span className={`${userBtn ? 'transform rotate-180' : ''}`}>
                                                       <MdKeyboardArrowDown />
                                                       </span>
                                                </div>
                                                <div className={`absolute w-full left-0 transition-1000 ${userBtn == true ? 'top-[40px] opacity-1 bg-blue-400 text-white p-1' : 'top-[-100px] opacity-0'}`}>
                                                    <Link className='block my-1' to={"/orders"}>
                                                        Your Orders
                                                    </Link>
                                                    <Link className='block my-1' to={"/profile"}>
                                                        Your Profile
                                                    </Link>
                                                </div>
                                            </div>
                                        </>
                                }
                            </span>
                            <span className='flex items-center'>
                                <Link to={"/cart"}>
                                    <span className={`flex items-center gap-2 ${cart.data.length == 0 ? '' : 'text-lg text-blue-600 font-semibold'}`}>
                                        <FiShoppingCart className='cursor-pointer' />
                                        {cart.data.length} Items
                                    </span>
                                </Link>
                            </span>
                            <span className='flex items-center gap-2'>
                                ${cart.total}
                            </span>
                            <span className='flex items-center ms-[20px] font-thin'>
                                <IoSearch />
                            </span>
                        </div>
                    </div>
                </header>
                <hr />
                <div className='w-full flex justify-between px-5 tablet:justify-center py-6 mt-3'>
                    <img src="img/Home/iSHOP Logo.png" alt="" />
                    <div onClick={() => setToggle(true)} className='flex justify-end text-3xl py-2 tablet:hidden'><MdOutlineMenu /></div>
                </div>
                <nav className='container mx-auto px-3'>
                    <ul className='hidden tablet:flex justify-center gap-8 uppercase font-semibold py-3'>
                        {
                            menuItems.map(
                                (item, index) => {
                                    return <li key={index}><Link to={item.url}>{item.name}</Link></li>
                                }
                            )
                        }
                    </ul>
                </nav>

                {/* Mobile Friendly */}
                <nav className={`${toggle == true ? 'block' : 'hidden'}`}>
                    <div className='fixed top-0 z-[99] flex flex-col justify-center items-center text-white font-semibold mobileMenu w-full h-full'>
                        <div><IoClose className='text-3xl font-bold fixed top-4 left-10 mt-3' onClick={() => setToggle(false)} /></div>
                        <header className="container mx-auto py-4">
                            <div className='mobile:flex w-[80%] mx-auto justify-between py-3 border-b-2'>
                                <div className='flex gap-3 text-center justify-center mb-3'>
                                    <span className='flex items-center gap-2'>En <FaCaretDown /></span>
                                    <span className='flex items-center gap-2'>$ <FaCaretDown /></span>
                                </div>
                                <div className='flex gap-6 justify-center'>
                                    <span className='flex items-center gap-2'>
                                        <CgProfile />
                                        {
                                            user.data == null ?
                                                <Link to={"/login"}>
                                                    Login
                                                </Link>
                                                : <>
                                                    <Link onClick={() => {
                                                        dispatcher(logout());
                                                        dispatcher(emptyCart());
                                                    }}>
                                                        Log out
                                                    </Link>
                                                    <Link className='capitalize'>
                                                        Hii' {user?.data?.name}
                                                    </Link>
                                                </>
                                        }
                                    </span>
                                    <Link onClick={() => setToggle(false)} to={"/cart"}>
                                        <span className={`flex items-center gap-2 ${cart.data.length == 0 ? '' : 'text-lg font-semibold'}`}>
                                            <FiShoppingCart />  {cart.data.length} Items
                                        </span>
                                    </Link>
                                    <span className='flex items-center gap-2'>
                                        ₹ ${cart.total}
                                    </span>
                                </div>
                            </div>
                        </header>
                        <div className='relative w-[80%]'>
                            <IoSearch className='absolute top-3 left-3 text-2xl text-black' />
                            <input className='w-full py-3 ps-14 rounded-xl mb-5 focus:outline-none text-gray-600' type="text" />
                        </div>
                        <div className='uppercase text-center'>
                            {
                                menuItems.map(
                                    (item, index) => {
                                        return <div key={index} className='my-2'><Link onClick={() => setToggle(false)} to={item.url}>{item.name}</Link></div>
                                    }
                                )
                            }
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}

export default Header;
