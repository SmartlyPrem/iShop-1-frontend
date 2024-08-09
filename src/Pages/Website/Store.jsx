import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { LuMenuSquare } from "react-icons/lu";
import { CgMenuGridR } from "react-icons/cg";
import { Context } from '../../Context/MainContext';
import ProducBox from '../../Components/Website/ProducBox';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Store = () => {
    const { products, categories, fetchCategoryData, BASE_URL, categoryImageUrl, fetchProducts, colors, fetchColor } = useContext(Context);

    const [cateName, setCateName] = useState("All");
    const [limit, setLimite] = useState(5);
    const [toggle, setToggle] = useState(false);
    const { category_slug } = useParams();
    const [seleColor, setSeleColor] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    function colorGenerator() {
        // Generate two random hex color codes
        const color1 = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        const color2 = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        const color3 = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

        // Generate a random degree for the gradient direction
        const degree = Math.floor(Math.random() * 360);

        // Return the CSS linear-gradient code
        return `linear-gradient(${degree}deg, ${color1}, ${color2}, ${color3})`;
    }

    useEffect(
        () => {
            fetchCategoryData();
            fetchColor();
            if (searchParams.get('color')) {
                setSeleColor(searchParams.get('color'))
            }
            if (searchParams.get('limit')) {
                setLimite(searchParams.get('limit'))
            }
        }, []
    )

    useEffect(
        () => {
            fetchProducts(limit, seleColor, category_slug);
            const searchQuery = {
                limit
            }
            if (seleColor) {
                searchQuery.color = seleColor;
            }
            setSearchParams(searchQuery);
        }, [limit, category_slug, seleColor]
    )

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <>
            <div className='w-full bg-[#F6F7F8] py-3 text-center text-blue-600 capitalize font-semibold'>
                store / {cateName}
            </div>
            <div className='container mx-auto py-10'>
                <div className='grid grid-cols-6 gap-3'>
                    <div className='hidden tablet:col-span-2 laptop:col-span-2 desktop:col-span-1 tablet:block'>
                        <div className='bg-[#F6F7F8] p-3 mb-3'>
                            <h2 className='uppercase font-bold'>Category</h2>
                            <ul className='text-slate-600 font-semibold'>
                                <Link to={"/store"}>
                                    <li className="cursor-pointer mt-3 text-black">All</li>
                                </Link>
                                {
                                    categories.map(
                                        (cate, i) => {
                                            return (
                                                <Link key={i} to={"/store/" + cate.slug}>
                                                    <li className={`py-2 flex justify-between cursor-pointer capitalize text-slate-600`} style={{
                                                        fontWeight: category_slug == cate.slug ? "bold" : "normal"
                                                    }}>{cate.name} <span>2</span></li>
                                                </Link>
                                            )
                                        }
                                    )
                                }
                            </ul>
                        </div>
                        <div className='bg-[#F6F7F8] p-3 mb-3'>
                            <h2 className='uppercase font-bold'>Price</h2>
                            <div className='flex justify-between py-3'><span>Range: </span><span>$13.99 - $25.99</span></div>
                            <input type="range" className='w-full py-3' />
                        </div>
                        <div className='bg-[#F6F7F8] p-3 mb-3'>
                            <h2 className='uppercase font-bold'>Color</h2>
                            <div className='flex flex-col'>
                                {
                                    colors.map(
                                        (color, i) => {
                                            return (
                                                <div key={i} onClick={() => setSeleColor(color._id)} className='flex items-center gap-3 capitalize cursor-pointer my-2'
                                                    style={{
                                                        fontWeight: seleColor == color._id ? "bold" : "normal"
                                                    }}
                                                >
                                                    <span style={{ background: color.code }} className='h-1 w-1 p-2'></span>
                                                    <div className='py-1'>{color.name}</div>
                                                </div>
                                            )
                                        }
                                    )
                                }
                            </div>
                            <button onClick={() => setSeleColor(null)} className='p-2 bg-blue-500 text-white rounded '>Reset colors</button>
                        </div>
                        <div className='bg-[#F6F7F8] p-3 mb-3'>
                            <h2 className='uppercase font-bold'>Brand</h2>
                            <ul className='text-slate-600 font-semibold'>
                                <li className='py-2 flex justify-between'>Apple Cart <span>2</span></li>
                                <li className='py-2 flex justify-between'>Airpods <span>2</span></li>
                                <li className='py-2 flex justify-between'>Cable flims <span>2</span></li>
                            </ul>
                        </div>

                        <button className='bg-[#F6F7F8] p-3 uppercase w-full font-semibold'>More</button>
                    </div>

                    {/* for mobile responcive */}
                    <div className={`${toggle ? 'left-0' : "left-[-100%]"} fixed top-0 w-[60%] h-screen overflow-y-auto z-40 bg-white`}>
                        <div className='bg-[#F6F7F8] p-3 mb-3'>
                            <h2 className='uppercase font-bold'>Category</h2>
                            <ul className='text-slate-600 font-semibold'>
                                <Link to={"/store"}>
                                    <li className="cursor-pointer mt-3 text-black">All</li>
                                </Link>
                                {
                                    categories.map(
                                        (cate, i) => {
                                            return (
                                                <Link key={i} to={"/store/" + cate.slug}>
                                                    <li className={`py-2 flex justify-between cursor-pointer capitalize text-slate-600`} style={{
                                                        fontWeight: category_slug == cate.slug ? "bold" : "normal"
                                                    }}>{cate.name} <span>2</span></li>
                                                </Link>
                                            )
                                        }
                                    )
                                }
                            </ul>
                        </div>
                        <div className='bg-[#F6F7F8] p-3 mb-3'>
                            <h2 className='uppercase font-bold'>Price</h2>
                            <div className='flex justify-between py-3'><span>Range: </span><span>$13.99 - $25.99</span></div>
                            <input type="range" className='w-full py-3' />
                        </div>
                        <div className='bg-[#F6F7F8] p-3 mb-3'>
                            <h2 className='uppercase font-bold'>Color</h2>
                            <div className='flex flex-col'>
                                {
                                    colors.map(
                                        (color, i) => {
                                            return (
                                                <div key={i} onClick={() => setSeleColor(color._id)} className='flex items-center gap-3 capitalize cursor-pointer my-2'
                                                    style={{
                                                        fontWeight: seleColor == color._id ? "bold" : "normal"
                                                    }}
                                                >
                                                    <span style={{ background: color.code }} className='h-1 w-1 p-2'></span>
                                                    <div className='py-1'>{color.name}</div>
                                                </div>
                                            )
                                        }
                                    )
                                }
                            </div>
                            <button onClick={() => setSeleColor(null)} className='p-2 bg-blue-500 text-white rounded '>Reset colors</button>
                        </div>
                        <div className='bg-[#F6F7F8] p-3 mb-3'>
                            <h2 className='uppercase font-bold'>Brand</h2>
                            <ul className='text-slate-600 font-semibold'>
                                <li className='py-2 flex justify-between'>Apple Cart <span>2</span></li>
                                <li className='py-2 flex justify-between'>Airpods <span>2</span></li>
                                <li className='py-2 flex justify-between'>Cable flims <span>2</span></li>
                            </ul>
                        </div>

                        <button onClick={() => setToggle(false)} className='bg-[#F6F7F8] p-3 uppercase w-full font-semibold'>Apply</button>
                    </div>
                    {/* close Menu */}

                    <div className='col-span-6 tablet:col-span-4 laptop:col-span-4 desktop:col-span-5'>
                        <div className='mb-12 tablet:mb-16 w-[95%] tablet:w-full mx-auto'>
                            <Slider {...settings}>
                                {
                                    categories.map(
                                        (cat, i) => {
                                            return (
                                                <div key={i} className='relative h-[300px]'>
                                                    <div style={{
                                                        background: colorGenerator(),
                                                        height: "100%"
                                                    }}>
                                                        <div>
                                                            <h2 className='absolute top-10 left-8 text-3xl font-semibold ca pitalize'>{cat.name}</h2>
                                                        </div>
                                                        <img className='absolute bottom-0 right-0' width={250} height={250} src={BASE_URL + categoryImageUrl + cat.image} alt="" />
                                                    </div>
                                                </div>
                                            )
                                        }
                                    )
                                }
                            </Slider>
                        </div>

                        {/* { Product Listing} */}

                        <div>
                            <div className='p-3 flex flex-col laptop:flex-row justify-between bg-[#F6F7F8]'>
                                <div className='flex gap-3 tablet:gap-5'>
                                    <span >13 items</span>
                                    <div>
                                        <span className='me-3'>Sort by :</span>
                                        <select name="" id="" className='bg-[#F6F7F8] w-[80px] tablet:w-[100px]'>
                                            <option value="">Name</option>
                                            <option value="">Prem</option>
                                        </select>
                                    </div>
                                    <div>
                                        <span className='me-3'>Show</span>
                                        <select name="" value={limit} onChange={(e) => setLimite(e.target.value)} id="" className='bg-transparent w-[60px] tablet:w-[100px]'>
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="20">20</option>
                                            <option value="50">50</option>
                                            <option value="0">All</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='flex text-2xl text-blue-600 gap-3 mt-3 laptop:mt-0'>
                                    <CgMenuGridR className='text-gray-600' />
                                    <LuMenuSquare className='mobile:hidden cursor-pointer' onClick={() => setToggle(true)} />
                                </div>
                            </div>
                            <section className='container mx-auto m-10'>
                                {
                                    <BestSeller products={products} />
                                }
                                <div className='my-10 flex justify-center'><Link className='uppercase font-semibold text-[#33A0FF] border-b-2 inline' onClick={() => setLimite(0)} >Load More...</Link></div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Store;


function BestSeller({ products }) {
    return (
        <div className='grid mobile:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 mobile:gap-4 laptop:gap-8'>
            {
                products?.map(
                    (prod, i) => <ProducBox {...prod} key={i} />
                )
            }
        </div>)
}

