import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { API_URI } from "../../context/api";

const Profile = () => {
  // context
  const [auth, setAuth] = useAuth();

  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

//   get user data

useEffect(()=>{
    const {email, name, phone, address} = auth?.user;
    setName(name);
    setPhone(phone);
    setAddress(address);
    setEmail(email);
},[auth?.user])

//   form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({name, email, password, phone, address});
    // toast.success('Registered Successfully');

    try {
      const {data} = await axios.put(`${API_URI}/api/v1/auth/update-profile`, {
        name,
        email,
        password,
        phone,
        address,
      });
      if(data?.error){
        toast.error(data?.error);
      }else{
        setAuth({...auth, user:data?.updatedUser});
        let ls = localStorage.getItem("auth")
        ls = JSON.parse(ls);
        ls.user = data?.updatedUser
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Profile - FlipZone"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-8">
            <div className="form-container" >
              <form onSubmit={handleSubmit}>
                <h4 className="title"> User Profile </h4>
                <div className="mb-3">
                  <input
                    placeholder="Enter Your Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your Email"
                    className="form-control"
                    id="exampleInputEmail1"
                    disabled    
                    
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Your Password"
                    className="form-control"
                    id="exampleInputPassword1"
                    
                  />
                </div>
                <div className="mb-3">
                  <input
                    placeholder="Enter Your Phone"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    
                  />
                </div>
                <div className="mb-3">
                  <input
                    placeholder="Enter Your Address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
