import React from "react";
import { useSearch } from "../../context/search";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import "../../styles/Homepage.css"
import { API_URI } from "../../context/api";


const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const {data} = await axios.get(`${API_URI}/api/v1/product/search/${values.keyword}`);
        setValues({...values, results: data});
        navigate("/search");
    } catch (error) {
        console.log(error);
    }
  }
  return (
    <div>
      <form className="d-flex searchForm" role="search" onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword : e.target.value })}
        />
        <button className="search-btn" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
