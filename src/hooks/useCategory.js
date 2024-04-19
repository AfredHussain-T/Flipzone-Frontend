import { useState, useEffect } from "react";
import axios from 'axios';
import { API_URI } from "../context/api";

export default function useCategory(){
    const [categories, setCategories] = useState([]);

    // get cat

    const getCategories = async () => {
        try {
            const {data} = await axios.get(`${API_URI}/api/v1/category/get-category`);
            setCategories(data?.category);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getCategories();
    },[]);

    return categories;
}