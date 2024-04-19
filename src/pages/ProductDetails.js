import React, {useState, useEffect} from "react";
import Layout from "../components/Layout/Layout"; 
import axios from 'axios';
import {useParams} from 'react-router-dom'
import ProductCard from "../components/ProductCard";
import "../styles/ProductDetailsStyles.css";
import { useCart } from "../context/cart";
import toast from 'react-hot-toast'

const ProductDetails = () => {
    const [cart, setCart] = useCart();
    const params = useParams();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);



    useEffect(()=>{
        if(params?.slug)getProduct();
    },[params?.slug]);
    // get product
  const getProduct = async () => {
    const {slug} = params
    try {
        const {data} = await axios.get(`/api/v1/product/get-product/${slug}`);
        setProduct(data?.product);
        getSimilarProducts(data?.product._id, data?.product.category._id);
    } catch (error) {
        console.log(error);
    }
  }

  
//   get similar products

const getSimilarProducts = async (pid, cid) => {
    try {
        const {data} = await axios.get(`/api/v1/product/similar-product/${pid}/${cid}`);
        setRelatedProducts(data?.products);
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <Layout title={"FlipZone"}>
        <div className="row container product-details">
            <div className="col-md-6 productImgContainer">
                    <img src={`/api/v1/product/product-photo/${product._id}`} className="card-img-top productImg" alt={product.name}/>
            </div>
            <div className="col-md-6 product-details-info">
                    <h1 className=" text-center">Product Details</h1>
                    <hr/>
                    <h6 className="productName">{product?.name}</h6>
                    <p className="productDescription">{product?.description}</p>
                    <p className="productDescription">{product?.category?.name}</p>
                    <h6 className="productPrice">{product?.price?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    })}</h6>
                    
                    <button className="btn btn-secondary ms-1" onClick={() => {
                      setCart([...cart, product]);
                      localStorage.setItem('cart', JSON.stringify([...cart, product]));
                      toast.success("Item Added To Cart");
                    }}>ADD TO BAG</button>
            </div>
        </div>
        <hr />
        <div className="row container similar-products">
        <h4 className="text-center">Similar Products ➡️</h4>
        {relatedProducts.length < 1 ? <>
            <h3 className="text-center mt-5">No Similar Products</h3>
        </> : <>
            <ProductCard products={relatedProducts} />
        </>}
            
        </div>
    </Layout>
  );
};

export default ProductDetails;
