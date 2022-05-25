import React from 'react'

export default function FloatButton(props) {
  return (
    <button onClick={props.action} style={{
        position: "fixed",
        bottom: 0,
        right: 5,
        borderRadius: "100px",
        fontWeight: "bold",
        fontSize:30,
        width: "65px",
        height: "65px",
        margin:"10px",
        display:"flex",
        alignItems:"center",
        justifyContent: "center",
        zIndex:1000
    }} className='btn btn-primary p-3 shadow'>
        <span >{props.text}</span>
    </button>
  )
}
// const FloatButton = React.forwardRef((props, ref) => (
//       <button onClick={props.action} style={{
//         position: "fixed",
//         marginBottom:'1px',
//         bottom: 0,
//         right: 5,
//         borderRadius: "100px",
//         fontWeight: "bold",
//         fontSize:30,
//         width: "65px",
//         height: "65px",
//         margin:"10px",
//         display:"flex",
//         alignItems:"center",
//         justifyContent: "center",
//         zIndex:1000
//     }} className='btn btn-primary p-3 shadow'>
//         <span >{props.text}</span>
//     </button>
//   ));
// export default FloatButton
