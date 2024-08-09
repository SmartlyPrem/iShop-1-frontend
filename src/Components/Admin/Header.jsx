import React, { useContext } from 'react';
import { MdAccountCircle } from "react-icons/md";
import { Link } from 'react-router-dom';
import { TfiAlignCenter } from "react-icons/tfi";
import { Context } from '../../Context/MainContext';
import { CiSearch } from "react-icons/ci";

const Header = () => {
    const { setMenuToggel } = useContext(Context);

    return (
        <div className='w-full bg-white shadow rounded p-2 sticky top-0 z-999999999 flex justify-between'>
            <div className="topbar">
                <div className="search">
                    <label className='relative'>
                        <input type="text" placeholder="Search here" />
                        <CiSearch  className='absolute top-0 left-[10px]' />
                    </label>
                </div>
                <div className='flex items-center gap-3'>
                    <div className='tablet:hidden' onClick={() => setMenuToggel(true)}>
                        <TfiAlignCenter className='text-[20px] cursor-pointer' />
                    </div>
                    <Link to="/admin/profile">
                        <MdAccountCircle className='text-3xl cursor-pointer' />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Header;
