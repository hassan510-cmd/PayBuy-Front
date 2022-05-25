import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { BaseUrl } from '../../baseUrl/BaseUrl'
import defaultCategory from "../../assets/categories.png"
import { useNavigate, useLocation } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
export default function TimeSheetDetails() {
    const [categ, setCateg] = useState([{
        category_id: "",
        category_image: "",
        category_name: ""
    }])
    const search = useLocation().search
    const timeSheetId = new URLSearchParams(search).get('tid')
    const navigate = useNavigate();
    const handleRowClick = (id, categoryName) => {
        navigate(`/purchase-orders/?tid=${timeSheetId}&cid=${id}&cname=${categoryName}`);
    }
    useEffect(() => {
        axios.get(`${BaseUrl}/categories`, {
            params: {
                timesheet_id: timeSheetId,
            }
        }).then(resp => {
            console.log(resp.data)
            setCateg(resp.data)
        })
    }, [])
    return (
        <div className='container'>
            <div className='categoies-container d-flex flex-wrap  justify-content-around mt-3'>
                {categ.map((obj, key) => (
                    <div onClick={() => handleRowClick(obj.category_id, obj.category_name)} key={key} style={{ borderRadius: "15px", backgroundColor: "white" }} className="d-flex flex-column m-2 justify-content-between align-items-center shadow-sm p-2">
                        <img className='mb-2' src={obj.category_image ? `${BaseUrl}${obj.category_image}` : defaultCategory} alt="" style={{ maxWidth: "75px" }} />
                        <span>{obj.category_name}</span>
                        <span>{obj.payed_orders}/{obj.order_counter}</span>
                        {obj.order_counter && obj.payed_orders > 0 ?
                            <ProgressBar variant={(obj.payed_orders / obj.order_counter) > 0.70 ? "success" : (obj.payed_orders / obj.order_counter) > 0.35 ? "warning" : "danger"} animated={(obj.payed_orders / obj.order_counter) != 1} style={{ width: "100%" }} now={(obj.payed_orders / obj.order_counter) * 100} label={`${Math.round((obj.payed_orders / obj.order_counter) * 100)}%`} />
                            :
                            <ProgressBar variant={"danger"} animated style={{ width: "100%" }} now={2} label="0%" />
                        }
                    </div>
                ))}

            </div>
        </div>
    )
}
