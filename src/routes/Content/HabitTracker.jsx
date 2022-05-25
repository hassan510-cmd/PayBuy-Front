import React, { useEffect, useState } from 'react'
import "../../style/flip.css"
export default function HabitTracker() {
    const [Days, setDays] = useState([])

    useEffect(() => {
        let data = [
            { id: 1, day: 1, state: true },
            { day: 2, state: false },
            { day: 3, state: true },
            { day: 4, state: false },
            { day: 5, state: true },
        ]
        setDays(data)
    }, [])

    const toggleState = (obj, index) => {
        obj.state = !obj.state
        Days[index] = obj
        setDays([...Days])
    }
    return (
        <div className='d-flex justify-content-between container'>
            {Days.map((day, index) => (
                <div className={day.state?'day-div':'day-div rotate'}
                    key={index}
                    onClick={() => toggleState(day, index)}
                >
                    <div className='front' >
                        <span>{day.day}</span>
                    </div>
                    <div className='back'>
                        <span>{day.day}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}
