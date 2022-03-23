import React from 'react'
// import background from "../assets/4.jpg"
export default function Background() {
  return (
    <div style={{
        position:"absolute",
        zIndex:"-10",
        opacity:0.3,
        height:"100%",
        width:"100%"
    }}>
        {/* <img src={background} alt=""  style={{width:"100%",height:"100%"}}/> */}
    </div>
  )
}
