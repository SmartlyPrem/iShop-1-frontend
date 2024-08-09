import React, { createContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { dbToCart } from '../reducer/CartSlice';
import { useDispatch, useSelector } from 'react-redux';

const Context = createContext();

const MainContext = (props) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const CATEGORY_URL = process.env.REACT_APP_CATEGORY_URL;
    const COLOR_URL = process.env.REACT_APP_COLOR_URL;
    const PRODUCT_URL = process.env.REACT_APP_PRODCUT_URL;
    const USER_URL = process.env.REACT_APP_USER_URL;
    const CART_URL = process.env.REACT_APP_CART_URL;
    const ORDER_URL = process.env.REACT_APP_ORDER_URL;

    const openToast = (msg, flag) => {
        toast(msg, { type: flag })
    }

    const [categories, setCategory] = useState([]);
    const [colors, setColor] = useState([]);
    const [products, setProducts] = useState([]);
    const [categoryImageUrl, setCategoryImageUrl] = useState("");
    const [ProdImgPath, setProdImgPath] = useState("");
    const dispatcher = useDispatch();
    const cart = useSelector(store => store.cart);

    function fetchCategoryData() {
        axios.get(BASE_URL + CATEGORY_URL + "/get-data")
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        setCategory(success.data.data);
                        setCategoryImageUrl(success.data.imageBaseUrl);
                    }
                }
            ).catch(
                (error) => {

                }
            )
    }

    function fetchColor() {
        axios.get(BASE_URL + COLOR_URL)
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        setColor(success.data.colors);
                    }
                }
            ).catch(
                (error) => {

                }
            )
    }

    function fetchProducts(limit = 0, color = null, category_slug = null) {
        const urlQuery = new URLSearchParams({ limit, color, category_slug });
        axios.get(BASE_URL + PRODUCT_URL + "/get-product/" + `?${urlQuery.toString()}`)
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        setProducts(success.data.product);
                        setProdImgPath(success.data.imagePath);
                    }
                }
            ).catch(
                (error) => {

                }
            )
    }

    const stateToCart =(userId)=>{
        axios.post(BASE_URL + CART_URL + "/state-to-cart/" + userId, {state_cart : cart.data})
        .then(
            (success)=>{
                if(success.data.status == 1){
                    let total = 0;
                    const cartData = success.data.userCart.map(
                        (c)=>{
                            total += (c.pId.discount_price * c.qty) 
                            return {
                                pId : c.pId._id,
                                qty : c.qty
                            }
                        }
                    )
                    dispatcher(dbToCart({data : cartData, total}))
                }else{
                }
            }
        ).catch(
            (error)=>{
                
            }
        )
    }

    const [userDetails, setUserDetails] = useState(null);

    function profileGet(user_id) {
        axios.get(BASE_URL + USER_URL + "/get-user/" + user_id)
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        setUserDetails(success.data.user)
                    }
                }
            ).catch(
                (error) => {

                }
            )
    }

    useEffect(
        () => {
            fetchCategoryData();
            fetchColor();
        }, []
    )

    function formatPrice(price) {
        // Convert the price to a string and split it into an array
        const priceParts = price.toString().split('.');
        // Add commas every three digits from the right in the integer part
        priceParts[0] = priceParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        // Join the integer and decimal parts with a period
        return priceParts.join('.');
      }

    const [menuToggel, setMenuToggel] = useState(false);

    return (
        <Context.Provider value={{ openToast, userDetails, profileGet, fetchColor, stateToCart, products, CART_URL, PRODUCT_URL, USER_URL, categories, colors, COLOR_URL, categoryImageUrl, fetchCategoryData, CATEGORY_URL, fetchProducts, BASE_URL, ProdImgPath, ORDER_URL, formatPrice, menuToggel, setMenuToggel }}>
            <ToastContainer />
            {props.children}
        </Context.Provider>
    );
}

export default MainContext;
export { Context };
