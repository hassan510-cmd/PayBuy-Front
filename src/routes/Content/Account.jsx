import React, { useState } from 'react'
import { HexColorPicker,RgbaColorPicker } from "react-colorful";
export default function Account() {
    const [color, setColor] = useState("#aabbcc");
    return (
        <div className='text-center d-flex flex-column align-items-center' onClick={() => {
            
        }}>
            <RgbaColorPicker color={color} onChange={setColor} />
{document.getElementById("root").style.backgroundColor = `rgba(${color.r},${color.g},${color.b},${color.a})`}
            {/* <input type="color" onChange={(e) => document.getElementById("root").style.backgroundColor = color} /> */}
            </div>
    )
}
