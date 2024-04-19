import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const CategoryProduct = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  

  useEffect(() => {
    if (params?.slug) getProductsByCategory();
  }, [params.slug]);


  const getProductsByCategory = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setCategory(data?.category);
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Layout title={`${params.slug} - FlipZone`}>
      <div className="mt-3">
        <h2 className="text-center">Category - {category?.name}</h2>
        <h6 className="text-center">{products?.length} products found</h6>
        {products.length < 1 ? (
          <>
            <h3 className="text-center mt-5">No Products Found Under This Category</h3>
          </>
        ) : (
          <>
            <ProductCard products={products}/>
          </>
        )}
      </div>
    </Layout>
  );
};

export default CategoryProduct;
