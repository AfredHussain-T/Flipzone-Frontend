import React from 'react'
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from 'react-hot-toast';
import { API_URI } from '../context/api';

const ProductCard = ({products}) => {
    
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  return (
    <div className=" cards d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" key={p._id}>
                <img
                  src={`${API_URI}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h6 className='card-title'>{p.name.substring(0,7)}...</h6>
                    <h6 className='card-title card-price'>
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h6>
                  </div>
                  <p className="card-text">{p.description.substring(0, 30)}...</p>
                  <div className='card-name-price'>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    MORE DETAILS
                  </button>
                  <button
                    className="btn btn-dark ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem('cart', JSON.stringify([...cart, p]));
                      toast.success("Item Added To Cart");
                    }}
                  >
                    ADD TO BAG
                  </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
  )
}

export default ProductCard