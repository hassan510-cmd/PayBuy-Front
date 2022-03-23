import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BaseUrl } from '../../baseUrl/BaseUrl'
import defaultCategory from "../../assets/categories.png" 
export default function Categories() {
    const [categ,setCateg] = useState([])
    const addCateg = (e)=>{
        e.preventDefault()
        let send_data = new FormData()
        send_data.append("category_name", e.target.category_name.value)
        if (e.target.category_image.files[0]) {
            send_data.append("category_image", e.target.category_image.files[0])
        }
        else{
            send_data.append("category_image","")
        }
        axios.post(`${BaseUrl}/category`,send_data).then(resp=>{
            console.log(resp.data)
            setCateg(prev=>[resp.data,...prev])
            document.getElementById("categ_form").reset()
        })
    }
    useEffect(()=>{
        axios.get(`${BaseUrl}/categories`).then(resp=>{
            console.log(resp.data)
            setCateg(resp.data)
        })
    },[])
  return (
    <div className='container'>
        <form onSubmit={addCateg} id="categ_form">
            <div>
            <label htmlFor="category_name" className='mt-2'>Categroy Icon</label>
            <input type="text" name="category_name" className='form-control mt-2' placeholder="Category name"/>
            
            <div className='d-flex align-items-end'>
                <div>
                    <label htmlFor="category_image" className='mt-2'>Categroy Icon</label>
                    <input type="file" accept="image/*" name='category_image' className='form-control mt-2' placeholder="Category name"/>
                </div>
                <button className='mx-2  btn btn-success'>add</button>
            </div>

            </div>
        </form>
        <div className='categoies-container d-flex flex-wrap  justify-content-around mt-3'>
            {categ.map((obj,key)=>(
                <div key={key} style={{borderRadius:"15px",backgroundColor:"white"}} className="d-flex flex-column m-2 align-items-center shadow-sm p-2">
                    <img className='mb-2' src={obj.category_image ? `${BaseUrl}${obj.category_image}` : defaultCategory} alt="" style={{maxWidth:"100px"}}/>
                    <span>{obj.category_name}</span>
                </div>
            ))}
       
        </div>
    </div>
  )
}
