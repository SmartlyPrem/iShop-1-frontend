import React, { useState, useRef, useContext } from 'react';
import { IoIosAddCircle } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";
import { Context } from '../../../Context/MainContext';
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from 'axios';

const View = () => {
    const [toggel, setToggel] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const nameRef = useRef();
    const slugRef = useRef();
    const { openToast, categories, categoryImageUrl, fetchCategoryData, BASE_URL, CATEGORY_URL } = useContext(Context)

    function titletoslug() {
        const string = nameRef.current.value;
        const newString = string.toLowerCase().replaceAll(" ", "-").trim().replaceAll("'", "");
        slugRef.current.value = newString;
    }

    const formSubmitHandler = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const slug = event.target.slug.value;
        const image = event.target.image.files[0];

        if (name != "" && slug != "") {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("slug", slug);
            formData.append("image", image);
            if (isUpdate == true) {
                const cId = catId.id;
                formData.append("oldImage", catId.image)
                axios.put(BASE_URL + CATEGORY_URL + "/update/" + cId, formData)
                .then(
                    (success) => {
                        if (success.data.status == 1) {
                            event.target.reset();
                            setToggel(false);
                            openToast(success.data.msg, "success")
                            fetchCategoryData();
                        } else {
                            openToast(success.data.msg, "error")
                        }
                    }
                ).catch(
                    (error) => {
                        openToast(error.message, "error")
                    }
                )
            } else {
                axios.post(BASE_URL + CATEGORY_URL + "/create", formData)
                    .then(
                        (success) => {
                            if (success.data.status == 1) {
                                event.target.reset();
                                setToggel(false);
                                openToast(success.data.msg, "success")
                                fetchCategoryData();
                            } else {
                                openToast(success.data.msg, "error")
                            }
                        }
                    ).catch(
                        (error) => {
                            openToast(error.message, "error")
                        }
                    )
            }

        } else (
            openToast("Please enter all details", "error")
        )
        setIsUpdate(false);
    }

    function deleteCategory(id) {
        axios.delete(BASE_URL + CATEGORY_URL + "/delete/" + id)
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        openToast(success.data.msg, "success");
                        fetchCategoryData();
                    }
                }
            ).catch(
                (error) => {
                    openToast(error.data.msg, "error")
                }
            )
    }

    const [catId, setCatId] = useState(null);

    function editCategory(Cat) {
        setToggel(true);
        setIsUpdate(true);
        nameRef.current.value = Cat.name;
        slugRef.current.value = Cat.slug;
        setCatId({ "id": Cat._id, "image": Cat.image });
    }

    function changeStatus(id, new_status) {
        axios.patch(BASE_URL + CATEGORY_URL + "/change-status/" + id + "/" + new_status)
            .then(
                (success) => {
                    if (success.data.status) {
                        openToast(success.data.msg, "success");
                        fetchCategoryData()
                    } else {
                        openToast(success.data.msg, "error");
                    }
                }
            ).catch(
                (error) => {
                    openToast(error.message, "error");
                }
            )
    }

    function closeMenu (){
        setToggel(false);
        setIsUpdate(false);
        nameRef.current.value = "";
        slugRef.current.value = ""
    }

    return (
        <div className='mb-14'>
            <div className={`w-full h-full ${toggel == true ? 'flex' : 'hidden'} justify-center items-center fixed top-0 left-0`} style={{ background: 'rgba(0,0,0, 0.6)' }} >
                <div className='w-full m-3 tablet:w-2/4 h-fit py-4 bg-white'>
                    <h2 className='text-2xl font-semibold flex items-center justify-between px-3 pb-3'>{isUpdate == true ? "Edit" : "Add"}  Category 
                    <button onClick={closeMenu}>
                        <IoIosCloseCircle className='text-2xl' />
                    </button>
                    </h2>

                    <form encType='multipart/form-data' onSubmit={formSubmitHandler} className="w-full px-3 mx-auto ">
                        <div className="mb-5">
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Category
                            </label>
                            <input
                                onChange={titletoslug}
                                type="text"
                                id="name"
                                name="name"
                                ref={nameRef}
                                className="bg-gray-50 border border-gray-300 capitalize text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter category"
                                required=""
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="slug"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your slug
                            </label>
                            <input
                                readOnly
                                type="text"
                                id="slug"
                                name="slug"
                                ref={slugRef}
                                className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required=""
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="image"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your image
                            </label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required=""
                            />
                        </div>
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            { isUpdate == true ? "Update" : "Submit" }
                        </button>
                    </form>
                    
                </div>
            </div>
            <div className='mt-4 p-3'>
                <button onClick={() => setToggel(true)} className='flex ml-auto mb-4 items-center text-lg p-2 bg-blue-600 rounded-lg text-white gap-2'>
                    <IoIosAddCircle className='text-2xl' /> Add
                </button>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Sr No.
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Category name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Slug
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Image
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                categories != "" ? categories.map(
                                    (category, index) => {
                                        return <tr key={categories._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-600 whitespace-nowrap dark:text-white">
                                                {index + 1}
                                            </td>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize">
                                                {category.name}
                                            </th>
                                            <td className="px-6 py-4">
                                                {category.slug}
                                            </td>
                                            <td className="px-6 py-4">
                                                <img width={100} src={BASE_URL + categoryImageUrl + category.image} alt="" />
                                            </td>
                                            <td className="px-6 py-4">
                                                <button onClick={() => changeStatus(category._id, !category.status)} className={`${category.status == true ? "bg-green-600" : "bg-orange-600"} text-white p-2 rounded`}>{category.status == true ? "Active" : "Inactive"}</button>
                                            </td>
                                            <td className="px-6 py-4 flex items-center text-xl gap-2">
                                                <MdDeleteForever color='red' onClick={() => deleteCategory(category._id)} className='text-2xl cursor-pointer' />
                                                <FaEdit onClick={() => editCategory(category)} className='text-xl cursor-pointer text-blue-600' />
                                            </td>
                                        </tr>
                                    }
                                ) : <div className='text-xl py-3 w-full'>Wait for data fetch</div>
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}

export default View;
