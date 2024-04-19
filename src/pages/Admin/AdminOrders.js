import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';
import moment from 'moment';
import {Select} from 'antd';

const {Option} = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState(["Not Process", "Processing","Shipped","delivered","cancel"]);
  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

//   get All Orders

  const getAllOrders = async () => {
    const {data} = await axios.get("/api/v1/auth/all-orders");
    setOrders(data?.allOrders);
  }

//   order status update
const handleChange = async (value, orderId) => {
    try {
        const {data} = await axios.put(`/api/v1/auth/order-status/${orderId}`,{status:value});
        getAllOrders();
    } catch (error) {
        console.log(error)
    }
}

  useEffect(() => {
    if(auth?.token)getAllOrders();
  },[auth?.token]);
  return (
    <Layout title={"Orders Page - FlipZone"}>
        <div className="row dashboard">
            <div className="col-md-3">
                <AdminMenu/>
            </div>
            <div className="col-md-9">
                <h1 className='text-center'>All Orders</h1>
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
                                        <td>
                                            <Select variant={false} onChange={(value) => handleChange(value, order._id)} defaultValue={order?.status}>
                                                {status.map((stat, index) => (
                                                    <Option key={(index)} value={stat}>{stat}</Option>
                                                ))}
                                            </Select>    
                                        </td>
                                        <td>{order?.buyer?.name}</td>
                                        <td>{moment(order?.createdAt).fromNow()}</td>
                                        <td>{order?.payment.success ? "Success" : "Failed"}</td>
                                        <td>{order?.products?.length}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="container">
                          {order?.products?.map((p) => (
                            <div className="row mb-2 p-3 card flex-row">
                              <div className="col-md-4">
                                <img
                                  src={`/api/v1/product/product-photo/${p._id}`}
                                  className="card-img-top "
                                  alt={p.name}
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
    </Layout>
  )
}

export default AdminOrders