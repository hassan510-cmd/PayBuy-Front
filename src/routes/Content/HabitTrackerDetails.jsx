import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { BaseUrl } from '../../baseUrl/BaseUrl'
import "../../style/flip.css"
export default function HabitTrackerDetails() {
    const [Days, setDays] = useState([])
    const search = useLocation().search
    const habitId = new URLSearchParams(search).get('hid')
    useEffect(() => {
        axios.get(`${BaseUrl}/habit-intervals`, {
            params: {
                habit_id: habitId,
            }
        }).then(resp => {
            console.log(resp.data)
            setDays(resp.data)
        })
    }, [])

    const toggleState = (obj, index) => {
        obj.state = !obj.state
        Days[index] = obj
        setDays([...Days])
    }

    const generateHabitPeriod = (e) => {
        e.preventDefault()
        axios.post(`${BaseUrl}/generate-habit-period`, {
            habit_id: habitId,
            date_from: e.target.date_from.value,
            date_to: e.target.date_to.value
        }).then(resp => {
            console.log(resp.data)
            setDays(resp.data)
        })
    }
    return (
        <div>
            <form onSubmit={generateHabitPeriod} className="mb-2">
                <div className='d-flex justify-content-between container flex-wrap'>
                    <div>
                        {/* <label htmlFor="from_date">Start From</label> */}
                        <input type="date" name='date_from' className='form-control mb-2' placeholder='default value' />
                    </div>
                    <div>
                        {/* <label htmlFor="to_date">To</label> */}
                        <input type="date" name='date_to' className='form-control mb-2' placeholder='default value' />
                    </div>
                    <div>
                        <button className='btn btn-dark ' type='submit'>generate</button>
                    </div>
                </div>
            </form>
            <div className='d-flex  container flex-wrap justify-content-between'>

                {Days.map((day, index) => (


                    <div className={day.state ? 'day-div' : 'day-div rotate'}
                        key={day.id}
                        onClick={() => toggleState(day, index)}
                    >
                        <div className='front' >
                            <span>{day.date}</span>
                        </div>
                        <div className='back'>
                            <span>{day.date}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
