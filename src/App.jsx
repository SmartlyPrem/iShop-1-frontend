import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import WebsiteMain from './Pages/Website/Main';
import AdminMain from './Pages/Admin/Main';
import Home from './Pages/Website/Home';
import Store from './Pages/Website/Store';
import Dashboard from './Pages/Admin/Dashboard';
import CategoryView from './Pages/Admin/Category/View';
import ProductView from './Pages/Admin/Product/View';
import ColorView from './Pages/Admin/Color/View';
import ColorAdd from './Pages/Admin/Color/Add';
import ColorEdit from './Pages/Admin/Color/Edit';
import ProductAdd from './Pages/Admin/Product/Add';
import ProductEdit from './Pages/Admin/Product/Edit';
import { useDispatch } from 'react-redux';
import { locStoreToCart } from './reducer/CartSlice';
import Cart from './Pages/Website/Cart';
import WebsiteLogin from './Pages/Website/Login';
import Signup from './Pages/Website/Signup';
import { lsLogin } from './reducer/UserSlice';
import Checkout from './Pages/Website/Checkout';
import Iphone from './Pages/Website/Iphone';
import PlaceOrder from './Pages/Website/PlaceOrder';
import YourOrder from './Pages/Website/YourOrder';
import Profile from './Pages/Website/profile/Profile';
import EditProfile from './Pages/Website/profile/EditProfile';
import SignIn from './Pages/Admin/SignIn';
import AdminOrders from './Pages/Admin/Orders';
import AdminProfile from './Pages/Admin/AdminProfile';
import Transition from './Pages/Admin/Transition';
import Author from './Pages/Admin/Author';

const App = () => {
    const dispatcher = useDispatch();

    useEffect(
        () => {
            dispatcher(locStoreToCart());
            dispatcher(lsLogin())
        }, []
    )

    const routes = createBrowserRouter([
        {
            path: "/",
            element: <WebsiteMain />,
            children: [
                {
                    path: '',
                    element: <Home />
                },
                {
                    path: 'store/:category_slug?',
                    element: <Store />
                },
                {
                    path: "cart",
                    element: <Cart />
                },
                {
                    path: "checkout",
                    element: <Checkout />
                },
                {
                    path: "iphone",
                    element: <Iphone />
                },
                {
                    path: "order-placed/:order_id",
                    element: <PlaceOrder />
                },
                {
                    path: "orders",
                    element: <YourOrder />
                },
            ]
        },
        {
            path: "/login",
            element: <WebsiteLogin />
        },
        {
            path: "/signup",
            element: <Signup />
        },
        {
            path: "/profile",
            element: <Profile />
        },
        {
            path: "/edit-profile",
            element: <EditProfile />
        },
        {
            path: '/admin/sign-in',
            element: <SignIn />
        },
        {
            path: '/admin/author',
            element: <Author />
        },
        {
            path: "/admin",
            element: <AdminMain />,
            children: [
                {
                    path: '',
                    element: <Dashboard />
                },
                {
                    path: 'category',
                    element: <CategoryView />
                },
                {
                    path: 'product',
                    element: <ProductView />
                },
                {
                    path: 'color',
                    element: <ColorView />
                },
                {
                    path: 'color/add',
                    element: <ColorAdd />
                },
                {
                    path: 'color/edit/:id?',
                    element: <ColorEdit />
                },
                {
                    path: 'product',
                    element: <ProductView />
                },
                {
                    path: 'product/add',
                    element: <ProductAdd />
                },
                {
                    path: 'product/edit/:id?',
                    element: <ProductEdit />
                },
                {
                    path: 'orders',
                    element: <AdminOrders />
                },
                {
                    path: 'profile',
                    element: <AdminProfile />
                },
                {
                    path: 'transition',
                    element: <Transition />
                }
            ]
        }
    ])
    return (
        <RouterProvider router={routes} />
    );
}

export default App;
