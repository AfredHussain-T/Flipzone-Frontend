import React, {useState} from "react";
import Layout from "../../components/Layout/Layout";
import toast from 'react-hot-toast';
import {useNavigate, useLocation} from "react-router-dom"
import axios from "axios";
import { useAuth } from "../../context/auth";


const Login = () => {
    const [auth, setAuth] = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        // console.log({name, email, password, phone, address});
        // toast.success('Registered Successfully');

        try {
          const res = await axios.post('/api/v1/auth/login',
                        {email,password}
                      );
          if(res && res.data.success){
            toast.success(res.data.message);
            setAuth({
              ...auth,
              user: res.data.user,
              token:res.data.token
            });
            localStorage.setItem('auth', JSON.stringify(res.data));
            navigate(location.state || "/");
          }else{
            toast.error(res.data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error('Something went wrong');
        }
    }

  return (
      <Layout title={"Login User - FlipZone"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title"> Login Form </h4>
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
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Enter Your Password"
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
          <div className="mt-3">
            <button type="submit" className="btn btn-primary" onClick={() => navigate('/forgot-password')}>
              Forgot Password
            </button>
          </div>
          
        </form>
      </div>
    </Layout>
  )
}

export default Login