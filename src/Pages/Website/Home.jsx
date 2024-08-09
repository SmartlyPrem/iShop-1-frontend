import React, { useContext, useEffect, useState } from 'react';
import ProducBox, { Service } from '../../Components/Website/ProducBox';
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Stars } from '../../Components/Website/ProducBox';
import { Context } from '../../Context/MainContext';
import axios from 'axios';

const Home = () => {
    const { categories, fetchCategoryData, BASE_URL, PRODUCT_URL} = useContext(Context);
    const [catSelect, setcatSelect] = useState(null);
    const [filterProduct, setFilterProduct] = useState([]);
    const [bestProduct, setBestProduct ] = useState([]);
    const [bestProdImg, setBestProdImg] = useState(null);

    const fetchBestProduct = () =>{
        axios.get(BASE_URL + PRODUCT_URL + "/best-selling")
        .then(
            (success)=>{
                if(success.data.status){
                    setBestProduct(success.data.bestProducts);
                    setBestProdImg(success.data.ProdImgPath);
                }else{
                    
                }
            }
        ).catch(
            (err)=>{

            }
        )
    }

    useEffect(
        ()=>{
            const data = bestProduct.filter(
                (prod)=>{
                    return prod.category._id == catSelect;
                }
            )
            setFilterProduct(data);
        },[catSelect]
    )

    useEffect(
        () => {
            fetchCategoryData();
            fetchBestProduct();
        }, []
    )

    const services = [
        {
            Name: 'Free Shipping',
            img: 'img/Home/shipping.svg',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor minim veniam, quis nostrud reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariaturz'
        },
        {
            Name: '100% REFUND',
            img: 'img/Home/refund.svg',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor minim veniam, quis nostrud reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariaturz'
        },
        {
            Name: 'SUPPORT 24/7',
            img: 'img/Home/support.svg',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor minim veniam, quis nostrud reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariaturz'
        },
    ]

    return (
        <>
            <section className='bannerClass max-w-full h-[300px] mobile:h-[619px]'>
                <div className='container mx-auto relative'>
                    <img className='absolute right-0 top-0 h-[300px] mobile:h-[619px]' src="img/Home/2_corousel.png" alt="" />
                    <div className='absolute left-5 top-5 mobile:top-40 text-[25px] mobile:text-[60px]'>You Own Shop
                        <br />
                        Get Anthing
                    </div>
                </div>
            </section>
            <section className='container mx-auto'>
                <div className='uppercase text-center text-3xl my-6 font-bold pt-3'>
                    Best Seller
                </div>
                <div>
                    <ul className='hidden tablet:flex justify-center gap-8 pb-4 font-semibold'>
                        <li onClick={() => setcatSelect(null)} className={`cursor-pointer ${catSelect == null ? 'text-blue-600 font-bold' : ''}`}>All</li>
                        {
                            categories?.map(
                                (cate, i) => {
                                    return <li key={i} onClick={() => setcatSelect(cate._id)} className={`capitalize cursor-pointer ${catSelect == cate._id ? 'text-blue-600 font-bold' : ''}`}>{cate.name}</li>
                                }
                            )
                        }
                    </ul>
                    <select onChange={(e)=> setcatSelect(e.target.value)} className='container mx-auto block border-gray-500 tablet:hidden w-[200px] p-2 focus:outline-none capitalize'>
                        <option value={"null"} >All</option>
                        {
                            categories?.map(
                                (cate, i) => {
                                    return <option value={cate._id} key={i} className={`capitalize cursor-pointer`}>{cate.name}</option>
                                }
                            )
                        }
                    </select>
                </div>
            </section>
            <section className='container mx-auto mb-10'>
                {
                    <BestSeller bestProdImg={bestProdImg} bestProduct={catSelect == null ? bestProduct : catSelect == "null" ? bestProduct : filterProduct} />
                }
                <div className='my-10 flex justify-center'><Link className='uppercase font-semibold text-[#33A0FF] border-b-2 inline' to='#'>Load More...</Link></div>
            </section>
            <section className='bg-[#2E90E5] max-w-full h-[500px] mobile:h-[600px]'>
                <div className='container p-2 mx-auto grid grid-cols-1 laptop:grid-cols-2 relative w-full h-full gap-6'>
                    <div className='flex flex-col items-center laptop:items-start justify-center h-full'>
                        <h2 className='text-5xl text-white'>iPhone 6 Plus</h2>
                        <p className='text-white py-4'>Performance and design. Taken right to the edge.</p>
                        <span className='uppercase text-white border-b-2'><Link>Shop Now</Link></span>
                    </div>
                    <div><img className='h-[240px] mobile:h-[400px] laptop:w-[649px] laptop:h-[690px] absolute bottom-0 right-0' src="img/Home/iphone_6_plus.png" alt="" /></div>
                </div>
            </section>
            <section>
                <Service services={services} />
            </section>
            <section>
                <Sliders />
            </section>
        </>

    );
}

export default Home;

function BestSeller({ bestProduct, bestProdImg }) {
    return (
        <div className='grid mobile:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 mobile:gap-4 laptop:gap-8'>
            {
                bestProduct?.map(
                    (prod, i) => <ProducBox bestProdImg={bestProdImg} {...prod} key={i} />
                )
            }
        </div>)
}

function Sliders() {
    const slideItms = [
        {
            name: 'Apple Mackbook Pro',
            img: 'img/Home/apple_macbook.png',
            price: 599,
            discount: 499,
            rating: 4,
        },
        {
            name: 'Apple Macbook Pro',
            img: 'img/Home/apple_macbook.png',
            price: 599,
            discount: 499,
            rating: 4,
        },
        {
            name: 'Apple Macbook Air',
            img: 'img/Home/Apple Macbook Air.png',
            price: 599,
            discount: 499,
            rating: 4,
        },
        {
            name: 'Apple iPhone 11',
            img: 'img/Home/Apple iPhone 11.png',
            price: 599,
            discount: 499,
            rating: 4,
        },
        {
            name: 'Apple Macbook Pro',
            img: 'img/Home/iphoneold.png',
            price: 599,
            discount: 499,
            rating: 4,
        },
        {
            name: 'Apple Ipad',
            img: 'img/Home/Apple Ipad.png',
            price: 599,
            discount: 499,
            rating: 4,
        },
        {
            name: 'Apple Watch 21-1',
            img: 'img/Home/Apple Watch 21-1.png',
            price: 599,
            discount: 499,
            rating: 4,
        },
        {
            name: 'Apple iPod 2A',
            img: 'img/Home/apple_iPod_2A.png',
            price: 599,
            discount: 499,
            rating: 4,
        },
    ]

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div className="container mx-auto mb-10 px-2">
            <h3 className='text-center text-3xl font-bold my-4 py-3'>FEATURED PRODUCTS</h3>
            <div className="slider-container">
                <Slider {...settings}>
                    {
                        slideItms.map(
                            (itm, i) => {
                                return (
                                    <div className='' key={i}>
                                        <div className='grid grid-cols-2 h-[200px] p-2 items-center gap-2'>
                                            <div className='flex justify-center items-center border p-2'>
                                                <img className='w-[100px] h-[100px]' src={itm.img} alt="" />
                                            </div>
                                            <div className='flex flex-col gap-4 justify-start'>
                                                <div>{itm.name}</div>
                                                <div className='text-xs'>
                                                    <Stars yellow={itm.rating} />
                                                </div>
                                                <div className='flex gap-3'>
                                                    <div className='text-[#ff4858]'>${itm.discount}</div>
                                                    <div className='text-[#C1c8ce] line-through'>${itm.price}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        )
                    }
                </Slider>
            </div>
        </div>

    )
}