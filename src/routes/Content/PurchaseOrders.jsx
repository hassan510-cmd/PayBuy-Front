import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import { BaseUrl } from '../../baseUrl/BaseUrl';
import { Trash, PencilSquare, } from 'react-bootstrap-icons';
import { PieChart, Pie, Cell, Legend, Label, ResponsiveContainer } from 'recharts'
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import FloatButton from '../../utils/FloatButton';
import Popup from 'reactjs-popup';
export default function PurchaseOrders() {
  const [currentSheet, setCurrentSheet] = useState({})
  const [orders, setOrders] = useState([])
  const [chartData, setChartData] = useState([{}])
  const [sumSelected, setSuemSelected] = useState(0)
  const chartColors = ["#57C4E5", "#F97068"]
  const search = useLocation().search
  const timeSheetId = parseInt(new URLSearchParams(search).get('tid'))
  const categoryId = parseInt(new URLSearchParams(search).get('cid'))
  const categoryName = new URLSearchParams(search).get('cname')
  const addOrder = (e) => {
    e.preventDefault()
    var send_data = {
      "rel_category": categoryId,
      "product_name": e.target.product_name.value,
      "price": parseFloat(e.target.price.value),
      "timesheet_id": timeSheetId,
    }
    axios.post(`${BaseUrl}/purchase-order`, send_data).then(resp => {
      setOrders(prev => [resp.data, ...prev])
      document.getElementById("order_form").reset()
    })
  }
  useEffect(() => {
    axios.get(`${BaseUrl}/get_timesheet`, {
      params: {
        category_id: categoryId,
        timesheet_id: timeSheetId,
      }
    }).then(resp => {
      setCurrentSheet(resp.data)
      setChartData(
        [{ "name": "Remain", "value": resp.data.total_remain },
        { "name": "Spent", "value": resp.data.total_spent }]
      )
      axios.get(`${BaseUrl}/po_by_category_timesheet`, {
        params: {
          category_id: categoryId,
          timesheet_id: timeSheetId,
        }
      }).then(resp => {
        setOrders(resp.data)
      })
    })

  }, [])

  const toggleOrderState = (e, obj, index) => {
    var state = e.target.checked
    if (state) {
      axios.post(`${BaseUrl}/update-purchase-order-state`, {
        order_id: obj.PO_id,
        order_state: true
      })
      setCurrentSheet({
        ...currentSheet,
        total_remain: currentSheet.total_remain - obj.price,
        total_spent: currentSheet.total_spent + obj.price,
      })
      obj.is_payed = true
      orders[index] = obj
      setOrders(orders)
      setChartData(prev =>
        [
          { "name": "Remain", "value": prev[0].value - obj.price },
          { "name": "Spent", "value": prev[1].value + obj.price }
        ]
      )
      setSuemSelected(prev => prev + obj.price)
    }
    else {
      axios.post(`${BaseUrl}/update-purchase-order-state`, {
        order_id: obj.PO_id,
        order_state: false
      })
      setCurrentSheet({
        ...currentSheet,
        total_remain: currentSheet.total_remain + obj.price,
        total_spent: currentSheet.total_spent - obj.price,
      })
      obj.is_payed = false
      orders[index] = obj
      setOrders(orders)
      setChartData(prev =>
        [
          { "name": "Remain", "value": prev[0].value + obj.price },
          { "name": "Spent", "value": prev[1].value - obj.price }
        ]
      )
      setSuemSelected(prev => prev > 0 ? prev - obj.price : 0)

    }
  }

  const deleteOrder = (order, index) => {
    axios.get(`${BaseUrl}/delete_purchase_order`, {
      params: {
        category_id: categoryId,
        timesheet_id: timeSheetId,
        purchase_order_id: order.PO_id,
      }
    }).then(resp => {
      console.log(resp.data)
      setOrders(resp.data)
      if (order.is_payed) {
        setChartData(prev =>
          [
            { "name": "Remain", "value": prev[0].value + order.price },
            { "name": "Spent", "value": prev[1].value - order.price }
          ]
        )
      }
      setSuemSelected(prev => prev > 0 ? prev - order.price : 0)

    })
  }
  return (
    <div className='container'>
      <h1 className='text-center'>{`${categoryName}`}-{currentSheet.sheet_name}({currentSheet.sheet_year}/{currentSheet.sheet_month})</h1>
      <div style={{ height: 210 }} >
        <ResponsiveContainer>
          <PieChart  >
            <Legend verticalAlign="top" align='center' height={40} width="100%" />
            <Pie data={chartData} dataKey="value" cx="50%" nameKey="name" outerRadius={75} innerRadius={60} label>
              <Label value={`Total ${currentSheet.total_income}`} position="center" />
              {
                chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={chartColors[index]} />
                ))
              }
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <Popup defaultOpen={false}
        modal
        nested
        contentStyle={{ width: "85%", borderRadius: "15px" }}
        trigger={
          <span>
            <FloatButton text="+" />
          </span>
        }>

        <div style={{ padding: "10px" }}>

          <form onSubmit={addOrder} id="order_form">
            <div>
              <label htmlFor="product_name" className='mt-2'>Product Name</label>
              <input type="text" name="product_name" className='form-control mt-2' placeholder="order name" />

              <div className='d-flex align-items-end'>
                <div>
                  <label htmlFor="price" className='mt-2'>Price</label>
                  <input type="number" name='price' className='form-control mt-2' placeholder="price" />
                </div>
                <button className='mx-2  btn btn-success'>add</button>
              </div>

            </div>
          </form>
        </div>

      </Popup>
      <div style={{
        overflowY: "scroll",
        height: `250px`,
        marginTop: "10px"
      }}>

        <SwipeableList  >
          {orders.map((obj, index) => (
            <SwipeableListItem key={obj.PO_id}
              swipeLeft={{
                content: <div className="mb-2 list-group-item rounded-3 shadow-sm 
                           flex-wrap d-flex justify-content-between align-items-center "
                  style={{ backgroundColor: "blue", borderRadius: "10px", }}>
                  <span style={{ color: "white" }} className="mx-2">edit</span>
                  <PencilSquare color='white' onClick={() => { console.log(obj.PO_id) }} />
                </div>,
                action: () => console.info('swipe action triggered')
              }}
              swipeRight={{
                content: <div className="mb-2 list-group-item rounded-3 shadow-sm 
                           flex-wrap d-flex justify-content-between align-items-center "
                  style={{ backgroundColor: "red", borderRadius: "10px" }}>
                  <span style={{ color: "white" }} className="mx-2">delete</span>
                  <Trash color='white' />
                </div>,
                action: () => deleteOrder(obj, index)
              }}
            // onSwipeProgress={progress => console.info(`Swipe progress: ${progress}%`)}
            >
              <div className="mb-2 list-group-item justify-content-between align-items-center d-flex rounded-3 shadow-sm 
                             " style={{ textDecorationLine: obj.is_payed ? "line-through" : "none", marginTop: "0px", width: "100%" }}>
                <input defaultChecked={obj.is_payed}
                  onChange={(e) => toggleOrderState(e, obj, index)}
                  className="form-check-input me-1"
                  type="checkbox" value="" />
                {obj.product_name}
                <span className="badge bg-success rounded-pill">{obj.price}.LE</span>
              </div>
            </SwipeableListItem>
          ))}
        </SwipeableList>
      </div>
      <h1 style={{
        bottom: 0,
        left: 5,
        paddingLeft: "10px"

      }}>
        {sumSelected > 0 ? `${sumSelected}.LE` : ""}
      </h1>

    </div>
  )
}
