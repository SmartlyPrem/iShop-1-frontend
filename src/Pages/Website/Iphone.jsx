import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../Context/MainContext';

const Iphone = () => {
    const { products, fetchProducts, categories, fetchCategoryData } = useContext(Context);
    
    useEffect(
        () => {
            fetchProducts();
            // fetchCategoryData();
            filterIphoneProd()
        }, []
    )

    function filterIphoneProd() {
        const data = products.filter(
            (prod) => {
                return prod.category._id == "65e06fbcc0241446dcce678d";
            }
        )
        setFilterProduct(data);
    }
    const [filterProduct, setFilterProduct] = useState([]);
    console.log(filterProduct);
    

    return (
        <div>
            iphone page
        </div>
    );
}

export default Iphone;
