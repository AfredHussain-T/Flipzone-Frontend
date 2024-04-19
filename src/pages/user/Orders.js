import React, {useState, useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from 'moment'
import {useNavigate} from 'react-router-dom'

const Orders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [auth] = useAuth();

    // get all orders

    const getOrders = async () => {
        try {
            const {data} = await axios.get("/api/v1/auth/orders");
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(auth?.token)getOrders();
    }, [auth?.token])
    return (
    <Layout title={'Orders - FlipZone'}>
        <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
            <div className="col-md-3"><UserMenu/></div>
            <div className="col-md-9">
                <h1 className='text-center'>All Order</h1>
                {orders?.map((order,index) => {
                    return (
                        <div className="border shadow">
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th scope='col'>S.No</th>
                                        <th scope='col'>Status</th>
                                        <th scope='col'>Buyer</th>
                                        <th scope='col'>Orders</th>
                                        <th scope='col'>Payment</th>
                                        <th scope='col'>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{order?.status}</td>
                                        <td>{order?.buyer?.name}</td>
                                        <td>{moment(order?.createdAt).fromNow()}</td>
                                        <td>{order?.payment.success ? "Success" : "Failed"}</td>
                                        <td>{order?.products?.length}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="container">
                          {order?.products?.map((p) => (
                            <div className="row p-5 card flex-row checkoutCard mt-2">
                              <div className="col-md-4">
                                <img
                                  src={`/api/v1/product/product-photo/${p._id}`}
                                  className="card-img-top h-40 checkoutCardImg"
                                  alt={p.name}
                                  onClick={() => {
                                    navigate(`/product/${p.slug}`);
                                  }}
                                />
                              </div>
                              <div className="col-md-8">
                                <p className="card-title">{p?.name}</p>
                                <p className="card-title">{p?.description}</p>
                                <p className="card-title">$ {p?.price}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        </div>
                    )
                })}
            </div>
        </div>
        </div>
    </Layout>
  )
  
}

export default Orders