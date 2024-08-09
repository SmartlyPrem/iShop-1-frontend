import React, { useContext, useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import { Context } from '../../../Context/MainContext';

const fileTypes = ["JPG", "PNG", "GIF"];

const Add = () => {
    const { openToast, BASE_URL, PRODUCT_URL, fetchCategoryData, categories, fetchColor, colors, fetchProducts } = useContext(Context);
    const discPriceRef = useRef();
    const discPerRef = useRef();
    const priceRef = useRef();
    const nameRef = useRef();
    const slugRef = useRef();
    const [prodCate, setProdCate] = useState();
    const [prodColor, setProdColor] = useState();
    const navigation = useNavigate();

    const formSubmitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", e.target.name.value);
        formData.append("slug", e.target.slug.value);
        formData.append("price", e.target.price.value);
        formData.append("discount_Per", e.target.discount_Per.value);
        formData.append("discount_price", e.target.discount_price.value);
        formData.append("image", file);
        formData.append("category", prodCate);
        formData.append("color", JSON.stringify(prodColor));
        axios.post(BASE_URL + PRODUCT_URL + "/create", formData)
        .then(
            (success)=>{
                if(success.data.status == 1){
                    openToast(success.data.msg, "success");
                    navigation('/admin/product');
                    fetchProducts();
                }else{
                    openToast(success.data.msg, "error");
                }
            }
        ).catch(
            (error)=>{
                console.log("client error - > " , error);
                openToast("Client side error", "error");
            }
        )
    }

    function titletoslug() {
        const string = nameRef.current.value;
        const newString = string.toLowerCase().replaceAll(" ", "-").trim().replaceAll("'", "");
        slugRef.current.value = newString;
    }

    function calDiscount() {
        const price = priceRef.current.value;
        const disountPer = discPerRef.current.value;
        if (price != "" && disountPer != "") {
            const d = price * (disountPer / 100)
            discPriceRef.current.value = price - d;
        }
    }

    const categoryOptions = categories.map(
        (cat) => {
            return {
                label: cat.name,
                value: cat._id
            }
        }
    )

    const colorOptions = colors.map(
        (color) => {
            return {
                label: color.name,
                value: color._id
            }
        }
    )

    const [file, setFile] = useState(null);
    const handleChange = (file) => {
        setFile(file);
    };

    useEffect(
        () => {
            fetchCategoryData();
            fetchColor();
        },
        []
    )

    return (
        < div className=' mb-14'>
            <div className='text-center text-2xl my-3 font-semibold'>Add Product</div>
            <form onSubmit={formSubmitHandler} className="w-full px-3 mx-auto mt-4">
                <div className='mobile:grid grid-cols-2 gap-2'>
                    <div className="mb-5">
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Product Name
                        </label>
                        <input
                            ref={nameRef}
                            onChange={titletoslug}
                            type="text"
                            id="name"
                            name="name"
                            className="bg-gray-50 border border-gray-300 capitalize text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Produt Name"
                            required=""
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Slug
                        </label>
                        <input
                            ref={slugRef}
                            readOnly
                            onChange={titletoslug}
                            type="text"
                            id="slug"
                            name="slug"
                            className="h-[40px] bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required=""
                            placeholder='product slug'
                        />
                    </div>
                </div>
                <div className='grid grid-cols-2 mobile:grid-cols-3 gap-2'>
                    <div className="mb-5">
                        <label
                            htmlFor="price"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            ₹ Price
                        </label>
                        <input
                            ref={priceRef}
                            onChange={calDiscount}
                            type="number"
                            id="price"
                            name="price"
                            min={0}
                            className="bg-gray-50 border border-gray-300 capitalize text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Price in Dollar"
                            required=""
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor='discount_Per'
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Discount (%)
                        </label>
                        <input
                            ref={discPerRef}
                            onChange={calDiscount}
                            defaultValue={0}
                            max={99}
                            min={0}
                            type="number"
                            id="discount_Per"
                            name="discount_Per"
                            className="h-[40px] bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required=""
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor='discount_price'
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            ₹ Price after discount
                        </label>
                        <input
                            readOnly
                            ref={discPriceRef}
                            type="number"
                            id="discount_price"
                            name="discount_price"
                            className="h-[40px] bg-gray-50 focus:outline-none border-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required=""
                        />
                    </div>
                </div>
                <div className='mobile:grid grid-cols-2 gap-2'>
                    <div className="mb-5">
                        <label
                            htmlFor="category"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Category Name
                        </label>
                        <Select
                            onChange={(option)=> setProdCate(option.value)}
                            className="basic-single"
                            classNamePrefix="select"
                            isSearchable={true}
                            name="category"
                            options={categoryOptions}
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Color
                        </label>
                        <Select
                            onChange={(colors)=> {
                                const d = colors.map(
                                    (color)=> {return color.value}
                                );
                                setProdColor(d);
                            }}
                            className="basic-single"
                            classNamePrefix="select"
                            isSearchable={true}
                            isMulti
                            name="category"
                            options={colorOptions}
                        />
                    </div>
                </div>
                <div className='py-3'>
                    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
                    <span className='my-2'>{file?.name}</span>
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full mobile:w-28 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Add
                </button>
            </form>
        </div>
    );
}

export default Add;
