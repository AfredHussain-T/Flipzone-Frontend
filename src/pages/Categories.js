import React from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import useCategory from '../hooks/useCategory'
const Categories = () => {
    const navigate = useNavigate();
  const categoies = useCategory();
    return (
    <Layout title={"All Categories - FlipZone"}>
        <div>
            <div className='category-container'>
                {categoies.map(c => (
                    <div className="col-md-6 mt-5 mb-3 gx-3 gy-3 " key={c._id}>
                        <button className='btn btn-primary categoryButton' onClick={()=>navigate(`/category/${c.slug}`)}>{c.name}</button>
                    </div>
                ))}
            </div>
        </div>
    </Layout>
  )
}

export default Categories