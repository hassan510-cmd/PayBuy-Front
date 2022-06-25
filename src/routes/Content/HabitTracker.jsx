import React, { useEffect, useState } from 'react'
import FloatButton from '../../utils/FloatButton';
import "../../style/flip.css"
import Popup from 'reactjs-popup';
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { BaseUrl } from '../../baseUrl/BaseUrl';
export default function HabitTracker() {
    const [Days, setDays] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${BaseUrl}/habits`).then(resp => {
            setDays(resp.data)
        })

    }, [])

    const toggleState = (obj, index) => {
        obj.state = !obj.state
        Days[index] = obj
        setDays([...Days])
    }
    const addHabit = (e) => {
        e.preventDefault()
        console.log(e.target.name)
        axios.post(`${BaseUrl}/add-habit`, {
            name: e.target.name.value
        }).then(resp => {
            setDays([resp.data, ...Days])
        })
    }
    return (
        <div>
            {/* <button className='btn btn-danger'
                onClick={() => openFileSelector()}>
                Select files </button>
            {filesContent.map((file, index) => (
                <div>
                    <h2>{file.name}</h2>
                    <div key={index}>{file.content}</div>
                    <br />
                </div>
            ))} */}
            <Popup defaultOpen={false} modal nested trigger={
                <span>

                    <FloatButton text="+" />
                </span>

            } contentStyle={{ width: "85%", borderRadius: "30px" }} position="top right">
                <div className='container mb-3 p-3'>
                    <form id="source-form" className='from-group' onSubmit={addHabit}>
                        <label htmlFor="name">Name</label>
                        <input type="text" name='name' className='form-control my-2' placeholder='Habit Name' />
                        <div className='d-flex justify-content-between'>
                            <div>
                                <label htmlFor="from_date">Start From</label>
                                <input type="date" name='from_date' className='form-control mb-2' placeholder='default value' />
                            </div>
                            <div>
                                <label htmlFor="to_date">To</label>
                                <input type="date" name='to_date' className='form-control mb-2' placeholder='default value' />
                            </div>
                        </div>
                        {/* <Calendar onChange={onChange} value={value} /> */}

                        <button type='submit' className='btn btn-success form-control'>add</button>
                    </form>
                </div>

            </Popup>
            <div className='container' style={{
                overflowY: "scroll",
                height: `250px`,
                marginTop: "10px"
            }}>
                <SwipeableList  >
                    {Days.map((obj, index) => (
                        <div className='mb-2 shadow-sm' onClick={() => navigate(`/habits-tracker-details/?hid=${obj.id}`)}>
                            <SwipeableListItem key={obj.id}
                                swipeLeft={{
                                    content: <div className=" list-group-item rounded-3 shadow-sm
                               flex-wrap d-flex justify-content-between align-items-center "
                                        style={{ backgroundColor: "blue", borderRadius: "10px", }}>
                                        <span style={{ color: "white" }} className="mx-2">edit</span>
                                        <PencilSquare color='white' onClick={() => { console.log(obj.id) }} />
                                    </div>,
                                    action: () => console.info('swipe action triggered')
                                }}
                                swipeRight={{
                                    content: <div className=" list-group-item rounded-3 shadow-sm
                               flex-wrap d-flex justify-content-between align-items-center "
                                        style={{ backgroundColor: "red", borderRadius: "10px" }}>
                                        <span style={{ color: "white" }} className="mx-2">delete</span>
                                        <Trash color='white' />
                                    </div>,
                                    action: () => console.log("first")
                                }}
                            // onSwipeProgress={progress => console.info(`Swipe progress: ${progress}%`)}
                            >
                                <div className="text-center 
                             list-group-item justify-content-between align-items-center d-flex rounded-3 shadow-sm
                                 " style={{ width: "100%" }}>
                                    {obj.name}
                                </div>
                            </SwipeableListItem>
                        </div>
                    ))}
                </SwipeableList>
            </div>
        </div>
    )
}
