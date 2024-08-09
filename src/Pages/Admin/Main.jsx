import React, { useEffect } from 'react';
import SideBar from '../../Components/Admin/SideBar';
import Header from '../../Components/Admin/Header';
import { Outlet, useNavigate } from 'react-router-dom';

const Main = () => {
    const navigator = useNavigate()

    useEffect(
        () => {
            const lsAdmin = localStorage.getItem("admin");
            if (!lsAdmin) {
                navigator("/admin/sign-in")
            }
        }, []
    )

    return (
        <div className='grid grid-cols-5'>
            <div className='col-span-5 tablet:col-span-1'>
                <SideBar />
            </div>
            <div className='col-span-5 tablet:col-span-4'>
                <Header />
                <Outlet />
            </div>
        </div>
    );
}

export default Main;
