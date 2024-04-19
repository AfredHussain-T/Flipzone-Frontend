import React, {useState} from "react";
import Layout from "../../components/Layout/Layout";
import toast from 'react-hot-toast';
import {useNavigate} from "react-router-dom"
import axios from "axios";
import { API_URI } from "../../context/api";




const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        // console.log({name, email, password, phone, address});
        // toast.success('Registered Successfully');

        try {
          const res = await axios.post(`${API_URI}/api/v1/auth/forgot-password`,
                        {email,newPassword, answer}
                      );
          if(res && res.data.success){
            toast.success(res.data && res.data.message);
            navigate("/login");
          }else{
            toast.error(res.data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error('Something went wrong');
        }
    }

  return (
    <Layout title={'Forgot Password - FlipZone'}>
        <div className="form-container">
        <form onSubmit={handleSubmit}>
            <h4 className="title">Reset Password</h4>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Enter Your Email"
              className="form-control"
              id="exampleInputEmail1"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e)=>setAnswer(e.target.value)}
              placeholder="Enter Your Favourite Sport..."
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e)=>setNewPassword(e.target.value)}
              placeholder="Enter Your Password"
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Reset
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPassword