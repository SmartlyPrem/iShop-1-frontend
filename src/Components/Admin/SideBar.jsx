import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { TfiAgenda } from "react-icons/tfi";
import { FaBoxOpen } from "react-icons/fa6";
import { IoIosColorPalette } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { BsCart4 } from "react-icons/bs";
import { CiMoneyBill } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import { signOut } from '../../reducer/AdminSlice';
import { Context } from '../../Context/MainContext';

const SideBar = () => {
    const {menuToggel, setMenuToggel}= useContext(Context);
    const dispatcher = useDispatch();
    const navigator = useNavigate();
    
    return (
        <>
            <div className={`bg-blue-900 tablet:block h-screen sticky top-0 left-0 ${menuToggel == true ? "block overscroll-none" : 'hidden'}`}>
                <h2 className='text-2xl desktop:text-3xl text-center text-white py-4 font-semibold'>iShop Admin</h2>
                <hr />
                <div className="navigation w-full h-full">
                    <ul className='pt-3'>
                        <li >
                            <Link onClick={()=> setMenuToggel(false)}  to='/admin' className='flex items-center ms-3'>
                                <span className="w-[30px] flex justify-center">
                                    <MdDashboard />
                                </span>
                                <span className="title">Dashbord</span>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={()=> setMenuToggel(false)} to='/admin/category' className='flex items-center ms-3'>
                                <span className="w-[30px] flex justify-center">
                                    <TfiAgenda />
                                </span>
                                <span className="title">Category</span>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={()=> setMenuToggel(false)} to='/admin/color' className='flex items-center ms-3'>
                                <span className="w-[30px] flex justify-center">
                                    <IoIosColorPalette className='text-2xl' />
                                </span>
                                <span className="title">Color</span>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={()=> setMenuToggel(false)} to='/admin/product' className='flex items-center ms-3'>
                                <span className="w-[30px] flex justify-center">
                                    <FaBoxOpen />
                                </span>
                                <span className="title">Product</span>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={()=> setMenuToggel(false)} to='/admin/orders' className='flex items-center ms-3'>
                                <span className="w-[30px] flex justify-center">
                                    <BsCart4 />
                                </span>
                                <span className="title">Orders</span>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={()=> setMenuToggel(false)} to='/admin/transition' className='flex items-center ms-3'>
                                <span className="w-[30px] flex justify-center">
                                    <CiMoneyBill />
                                </span>
                                <span className="title">Transaction</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/admin/author' className='flex items-center ms-3'>
                                <span className="w-[30px] flex justify-center">
                                    <RiAdminFill />
                                </span>
                                <span className="title">Author</span>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={() => {
                                dispatcher(signOut());
                                navigator("/admin/sign-in")
                            }} className='flex items-center ms-3'>
                                <span className="w-[30px] flex justify-center">
                                    <FaSignOutAlt />
                                </span>
                                <span className="title">Sign Out</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* <ul className=' text-white pl-6 mt-4 bg-black'>

                    <li className='py-2'>
                        <Link className='flex items-center gap-3 text-lg'>
                            Color
                        </Link>
                    </li>
                    <li className='py-2'>
                        <Link className='flex items-center gap-3 text-lg'>
                            Product
                        </Link>
                    </li>
                    <li className='py-2'>
                        <Link className='flex items-center gap-3 text-lg'>
                            Orders
                        </Link>
                    </li>
                    <li className='py-2'>
                        <Link className='flex items-center gap-3 text-lg'>
                            Transition
                        </Link>
                    </li>
                    <li className='py-2'>
                        <Link className='flex items-center gap-3 text-lg'>
                            Author
                        </Link>
                    </li>
                    <li className='py-2'>
                        <Link className='flex items-center gap-3 text-lg'>
                            Sign out
                        </Link>
                    </li>
                </ul> */}
            </div>
        </>
    );
}

export default SideBar;
