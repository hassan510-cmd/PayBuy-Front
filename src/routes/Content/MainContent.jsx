import axios from 'axios'
import React, { useState, useEffect } from 'react'

export default function MainContent() {
    const [users, setUsers] = useState([])

    const submitForm = (e) => {
        e.preventDefault()
        let data = { "username": e.target.username.value }
        console.log(data)
        axios.post("user", data).then((resp) => {
            console.log(resp.data)
            setUsers(prev => [resp.data, ...prev])
        })
        // =============================== fot test ============================
        // axios.post("http://192.168.1.100:8888/user", data).then((resp) => {
        //     console.log(resp.data)
        //     setUsers(prev => [resp.data, ...prev])
        // })
    }

    useEffect(() => {
        // axios.get("users").then(resp => {
        //     setUsers(resp.data)
        // })
        //  =============================== fot test ============================
        axios.get("http://192.168.1.100:8888/users").then(resp => {
            setUsers(resp.data)
        })

        //   return () => {
        //     second
        //   }
    }, [])

    return (
        <div>
            <div>
                <form onSubmit={submitForm}>
                    <input className='form-control' type="text" name="username" />
                    <button class="btn btn-danger" type='submit'>add user</button>
                </form>
            </div>
            <div>users : </div>
            <div style={{ "display": "flex", "flexWrap": "wrap", "width": "50%" }}>
                {users.map((value, index) => (
                    <div key={index}>

                        <ol>

                            <li>{value.username} {value.email}</li>
                        </ol>
                        {/* <li>{value.id}</li> */}
                    </div>

                ))}
            </div>
        </div>
    )
}
