import React from 'react';
import { FaFacebookF, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <>
            <footer className='max-w-full border-t'>
                <section className='container px-4 mx-auto gap-10 laptop:gap-20 desktop:gap-40 pt-10 grid grid-cols-1 laptop:grid-cols-3'>
                    <div className='py-3'>
                        <img className='my-3' src="img/Home/ishop.png" alt="" />
                        <p className='text-gray-600 '>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.Since the 1500s, when an unknown printer.</p>
                    </div>
                    <div>
                        <h2 className='py-3 font-semibold text-xl'>Follow Us</h2>
                        <p className='text-gray-600 '>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.Since the 1500s, when an unknown printer.</p>
                        <span className='flex gap-6 my-4'><FaFacebookF color="#385C8E" /> <FaTwitter color="#03A9F4" /></span>
                    </div>
                    <div>
                        <h2 className='py-3 font-semibold text-xl'>Contact Us</h2>
                        <p className='text-gray-600 '>
                            iShop: address @building 124 <br />
                            Call us now: 0123-456-789 <br />
                            Email: support@whatever.com
                        </p>
                    </div>
                </section>
                <hr className='container mx-auto my-6' />
                <section className='container mx-auto my-3 grid grid-cols-2 mobile:grid-cols-3 px-3 tablet:px-2 laptop:grid-cols-6'>
                    <div>
                        <h2 className='py-3 font-semibold text-lg'>
                            Infomation
                        </h2>
                        <ul className='text-gray-600'>
                            <li className='py-1'>About</li>
                            <li className='py-1'>Information</li>
                            <li className='py-1'>Privacy Policy</li>
                            <li className='py-1'>Terms & Condition</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className='py-3 font-semibold text-lg'>
                            Services
                        </h2>
                        <ul className='text-gray-600'>
                            <li className='py-1'>About</li>
                            <li className='py-1'>Information</li>
                            <li className='py-1'>Privacy Policy</li>
                            <li className='py-1'>Terms & Condition</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className='py-3 font-semibold text-lg'>
                            Extras
                        </h2>
                        <ul className='text-gray-600'>
                            <li className='py-1'>About</li>
                            <li className='py-1'>Information</li>
                            <li className='py-1'>Privacy Policy</li>
                            <li className='py-1'>Terms & Condition</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className='py-3 font-semibold text-lg'>
                            My Account
                        </h2>
                        <ul className='text-gray-600'>
                            <li className='py-1'>About</li>
                            <li className='py-1'>Information</li>
                            <li className='py-1'>Privacy Policy</li>
                            <li className='py-1'>Terms & Condition</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className='py-3 font-semibold text-lg'>
                            Usefull Links
                        </h2>
                        <ul className='text-gray-600'>
                            <li className='py-1'>About</li>
                            <li className='py-1'>Information</li>
                            <li className='py-1'>Privacy Policy</li>
                            <li className='py-1'>Terms & Condition</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className='py-3 font-semibold text-lg'>
                            Our Offers
                        </h2>
                        <ul className='text-gray-600'>
                            <li className='py-1'>About</li>
                            <li className='py-1'>Information</li>
                            <li className='py-1'>Privacy Policy</li>
                            <li className='py-1'>Terms & Condition</li>
                        </ul>
                    </div>
                </section>
                <hr className='my-6' />
                <section className='container px-3'>
                    <div className='flex gap-3 justify-end pb-8'>
                        <img src="img/Home/Western_union.png" alt="" />
                        <img src="img/Home/master_card.png" alt="" />
                        <img src="img/Home/Paypal.png" alt="" />
                        <img src="img/Home/visa.png" alt="" />
                    </div>
                </section>
            </footer>
        </>
    );
}

export default Footer;
