import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {  Table } from 'react-bootstrap'
import { BaseUrl } from '../../baseUrl/BaseUrl'

export default function IncomeSources() {
    const [sourceIncome, setSourceIncome] = useState([])
    useEffect(() => {
        axios.get(`${BaseUrl}/income-sources`).then(resp => {
            setSourceIncome(resp.data)
            console.log(resp.data)
        })

    }, [])

    const addSource = (e) => {
        e.preventDefault()
        var sendData = {
            "name": e.target.name.value,
            "total": parseFloat(e.target.total.value),
        }
        axios.post(`${BaseUrl}/income-source`,sendData).then(resp=>{
            setSourceIncome(prev=>[resp.data,...prev])
            document.getElementById("source-form").reset()
        })
        console.log(sendData)
    }
    return (
        <div className='container'>
            <div>
                <form id="source-form" onSubmit={addSource} className='from-group' >
                    <input type="text" name='name' className='form-control my-2' placeholder='source name' />
                    <input type="number" name='total' className='form-control mb-2' placeholder='default value' />
                    <button type='submit' className='btn btn-success form-control'>add</button>
                </form>
            </div>
            <div className='mt-2'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            sourceIncome.map((obj, key) => (
                                <tr key={key}>
                                    <td>{obj.name}</td>
                                    <td>{obj.total}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>

            </div>

        </div>
    )
}
