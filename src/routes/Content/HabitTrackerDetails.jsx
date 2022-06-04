import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BaseUrl } from '../../baseUrl/BaseUrl'
import "../../style/flip.css"
export default function HabitTrackerDetails() {
    const [Days, setDays] = useState([])

    useEffect(() => {
        axios.get(`${BaseUrl}/habit-intervals`, {
            params: {
                habit_id: 1,
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
    return (
        <div>
            <div className='d-flex  container flex-wrap justify-content-start'>
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
