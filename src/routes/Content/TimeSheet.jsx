import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BaseUrl } from '../../baseUrl/BaseUrl';
import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import FloatButton from '../../utils/FloatButton';
import 'reactjs-popup/dist/index.css';

export default function TimeSheet() {
    const navigate = useNavigate();
    const handleRowClick = (id) => {
        navigate(`/time-sheet-detailes/?tid=${id}`, {
            userId: id,
        });
    }
    const [timeSheet, setTimeSheet] = useState([])
    const [sourceIncome, setSourceIncome] = useState([])
    const [sheetTotal, setSheetTotal] = useState(0.0)
    const [sourceTotal, setSourceTotal] = useState({})
    const [open, setOpen] = useState(false);
    const currentTime = new Date()
    const change_source_total = (e) => {
        setSourceTotal(prev => ({
            ...prev,
            [e.target.name]: e.target.value ? parseFloat(e.target.value) : 0
        }))
    }
    const addSheet = (e) => {
        e.preventDefault()
        var send_data = {
            "sheet_name": e.target.sheet_name.value,
            "sheet_year": e.target.sheet_year.value,
            "sheet_month": e.target.sheet_month.value,
            "total_income": parseFloat(e.target.sheet_total.value),
            "total_remain": parseFloat(e.target.sheet_total.value),
        }
        axios.post(`${BaseUrl}/timesheet`, send_data).then(resp => {
            setTimeSheet(prev => [resp.data, ...prev])
            document.getElementById("timesheet-form").reset()
            setOpen(false)
        }).catch(err => console.error(err))
    }
    useEffect(() => {
        var ST = {}
        axios.get(`${BaseUrl}/all_timesheet`).then(resp => {
            setTimeSheet(resp.data)
        })
        axios.get(`${BaseUrl}/income-sources`).then(resp => {
            setSourceIncome(resp.data)
            resp.data.map((obj, key) => {
                ST[obj.name] = obj.total
            })
            setSourceTotal(ST)
            var sumValues = Object.values(ST).reduce((a, b) => parseFloat(a) + parseFloat(b))
            setSheetTotal(sumValues)
        })

    }, [])
    useEffect(() => {
        if (Object.values(sourceTotal).length > 0) {
            var sumValues = Object.values(sourceTotal).reduce((a, b) => parseFloat(a) + parseFloat(b))
            setSheetTotal(sumValues)
        }


    }, [sourceTotal])

    return (

        <div className='container'>

            <Popup defaultOpen={false} modal nested open={open} trigger={
                <span>

                    <FloatButton text="+" />
                </span>

            } contentStyle={{ width: "85%", borderRadius: "30px" }} position="top right">
                <div className='container p-3' width="50%">
                    <form id="timesheet-form" onSubmit={addSheet}>
                        <div >
                            <label className="form-label">Sheet Name</label>
                            <input type="text" name="sheet_name" className="form-control" placeholder="Sheet Name" />
                        </div>
                        <div className='d-flex align-items-end  justify-content-between py-2'  >
                            <div >
                                <label className="form-label">Year</label>
                                <input type="number" defaultValue={currentTime.getFullYear()} name="sheet_year" className="form-control " placeholder="Year" />
                            </div>
                            <div className='pt-1'>
                                <label className="form-label mx-2">Month</label>
                                <input type="number" defaultValue={currentTime.getMonth() + 1} name="sheet_month" className="form-control mx-2" placeholder="Month" />
                            </div>
                        </div>
                        {/* ============================ source incomes container ========================= */}
                        <div className='d-flex flex-column py-2' style={{
                            overflowY: "scroll",
                            height: `${sourceIncome.length * 55}px`
                        }}>
                            {sourceIncome.map((obj, key) => (
                                <div key={key} className='d-flex align-items-end mt-2 justify-content-between'>
                                    <label style={{ width: "100%" }} className="form-label">{obj.name}</label>
                                    <input type="number" name={obj.name} onChange={(e) => { change_source_total(e) }} style={{ width: "40%" }} defaultValue={obj.total} className="form-control" placeholder="Sheet Name" />
                                </div>
                            ))}
                        </div>
                        <div className='d-flex align-items-end  justify-content-between' style={{ borderTopColor: "black", borderTopStyle: "dashed", borderTopWidth: "1px" }} >
                            <div className="p-2" >
                                <label className="form-label">Total</label>
                                <input type="number" name="sheet_total" value={sheetTotal} readOnly className="form-control" placeholder="Total" />
                            </div>
                            <div className=" p-2">
                                <button className="btn btn-success">add</button>
                            </div>
                        </div>
                    </form>
                </div>
            </Popup>

            <h1 className='text-center fw-bolder'>All Sheets</h1>
            <div className="table-responsive shadow" style={{ backgroundColor: "white", borderRadius: "10px" }}>
                <table className="table table-striped   table-hover" >
                    <thead >
                        <tr >
                            <th scope="col">Name</th>
                            <th scope="col">Date</th>
                            <th scope="col">In/Out</th>
                            {/* <th scope="col">Spent</th> */}
                            <th scope="col">Remain</th>
                        </tr>
                    </thead>
                    <tbody >
                        {timeSheet.map((obj, index) => (


                            <tr onClick={() => handleRowClick(obj.sheet_id)} key={index} className='align-middle'>

                                <th style={{ wordWrap: "break-word", maxWidth: "20px" }} scope="row">{obj.sheet_name}</th>
                                <td>{obj.sheet_year}/{obj.sheet_month}</td>
                                <td>{obj.total_income}/{obj.total_spent}</td>
                                {/* <td></td> */}
                                <td>{obj.total_remain}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

        </div>
    )
}
