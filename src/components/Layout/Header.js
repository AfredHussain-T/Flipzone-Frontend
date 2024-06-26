import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from 'react-hot-toast';
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import {Badge} from 'antd'


const Header = () => {
  const [cart] = useCart();
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const handleLogout = ()=>{
    setAuth({
      ...auth,
      user:null,
      token:''
    });
    localStorage.removeItem('auth');
    toast.success('Logout Successfully');
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary p-2">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              🛒 FlipZone
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput/>
              <li className="nav-item" >
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                  <NavLink className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                    Category
                  </NavLink>
                  <ul className="dropdown-menu">
                    {categories?.map(c => (
                    <li><NavLink className="dropdown-item" to={`/category/${c.slug}`}>{c.name}</NavLink></li>
                    ))}
                  </ul>
              </li>
              {!auth.user ? (<>
                <li className="nav-item">
                <NavLink to="/register" className="nav-link">
                  Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </li>
              </>):(<>
                <li className="nav-item dropdown">
                  <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {auth?.user?.name}
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li><NavLink className="dropdown-item" to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}>Dashboard</NavLink></li>
                    <li>
                      <NavLink className="dropdown-item" onClick={handleLogout} to="/login" >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
                
              </>
              )}
              <li className="nav-item m-1">
                <Badge count ={cart?.length} showZero offset={[10, -5]}>
                  <NavLink to="/cart" className="nav-link">
                    Cart
                  </NavLink>
                </Badge>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
