import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Accordion} from 'react-bootstrap';
import { useLocation } from "react-router-dom";
import { BaseUrl } from '../../baseUrl/BaseUrl';
import { Trash, PencilSquare,} from 'react-bootstrap-icons';
import { PieChart, Pie, Cell,  Legend, Label, ResponsiveContainer } from 'recharts'

export default function PurchaseOrders() {
  const [currentSheet, setCurrentSheet] = useState({})
  const [orders, setOrders] = useState([])
  const [chartData, setChartData] = useState([{}])

  const chartColors = ["#57C4E5", "#F97068"]
  const search = useLocation().search
  const timeSheetId = parseInt(new URLSearchParams(search).get('tid'))
  const categoryId = parseInt(new URLSearchParams(search).get('cid'))
  const categoryName = new URLSearchParams(search).get('cname')
  // const [act, setAct] = useState(false)
  // console.log(timeSheetId)
  console.log(categoryName)
  const addOrder = (e) => {
    e.preventDefault()
    var send_data = {
      "rel_category": categoryId,
      "product_name": e.target.product_name.value,
      "price": parseFloat(e.target.price.value),
      "timesheet_id": timeSheetId
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
      console.log(resp.data)
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
        // console.log(resp.data)
        setOrders(resp.data)
      })
    })

  }, [])

  const toggleOrderState = (e, obj, index) => {
    // console.log(e)
    // console.log(orders)
    // console.log(index)
    var state = e.target.checked
    if (state) {


      console.log(obj)
      axios.post(`${BaseUrl}/update-purchase-order-state`, {
        order_id: obj.PO_id,
        order_state: true
      }).then(() => {
        axios.post(`${BaseUrl}/balance-timesheet`, {
          timesheet_id: timeSheetId,
          total_spent: obj.price
        })
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

    }
    else {

      axios.post(`${BaseUrl}/update-purchase-order-state`, {
        order_id: obj.PO_id,
        order_state: false
      }).then(() => {
        axios.post(`${BaseUrl}/balance-timesheet`, {
          timesheet_id: timeSheetId,
          total_spent: -obj.price
        })
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

    }
  }

  return (
    <div className='container'>
      <h1 className='text-center'>{currentSheet.sheet_name}({currentSheet.sheet_year}/{currentSheet.sheet_month})</h1>
      <h6 className='text-center'>{`${categoryName}`}</h6>
      <div style={{  height: 300 }} >
				<ResponsiveContainer>
        <PieChart  >
            <Legend verticalAlign="top" align='center' height={40} width="100%" />
            <Pie data={chartData} dataKey="value" cx="50%" nameKey="name" outerRadius={75} innerRadius={60} label>
              <Label value={`Total ${currentSheet.total_income}`} position="center"  />
              {
                chartData.map((entry, index) => (
                  <Cell  key={`cell-${index}`} fill={chartColors[index]} />
                ))
              }
            </Pie>

            {/* <Pie data={[{ "name": "Total", "value": 500 }]} lable  cx="50%" cy="50%" outerRadius={50} fill={colors.income} /> */}
          </PieChart>
				</ResponsiveContainer>
			</div>
      

      {/* <div className='d-flex flex-wrap justify-content-around'>
        <Card
          text={"light"}
          style={{ width: "fit-content", backgroundColor: `${colors.income}` }}
          className="my-2 text-center shadow"
        >
          <Card.Header className='text-center' style={{ color: `${colors.income}`, backgroundColor: `${colors.header}` }}>Total</Card.Header>
          <Card.Body>
            <Card.Text className='d-flex flex-column align-items-center'>
              {currentSheet.total_income}
              <CashCoin />
            </Card.Text>

          </Card.Body>
        </Card>
        <Card
          text={"dark"}
          style={{ width: "fit-content", backgroundColor: `${colors.spent}` }}
          className="my-2 text-center shadow-sm"
        >
          <Card.Header style={{ color: `${colors.spent}`, backgroundColor: `${colors.header}` }}>Spent</Card.Header>
          <Card.Body>
            <Card.Text className='d-flex flex-column align-items-center'>
              {currentSheet.total_spent}
              <Coin />
            </Card.Text>
          </Card.Body>
        </Card>
        <Card
          text={"dark"}
          style={{ width: "fit-content", backgroundColor: `${colors.remain}` }}
          className="my-2 text-center shadow"
        >
          <Card.Header style={{ color: `${colors.remain}`, backgroundColor: `${colors.header}` }}>Remain</Card.Header>
          <Card.Body>
            <Card.Text className='d-flex flex-column align-items-center'>
              {currentSheet.total_remain}
              <CashStack />
            </Card.Text>
          </Card.Body>
        </Card>




      </div> */}
      <Accordion defaultActiveKey="1" >
        <Accordion.Item eventKey="0">
          <Accordion.Header>{`add order`}</Accordion.Header>
          <Accordion.Body>
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
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {orders.map((obj, index) => (
        <div

          key={obj.PO_id}
          style={{
            textDecorationLine: obj.is_payed ? "line-through" : "none"
          }}
          className="list-group-item mt-2 rounded-3 shadow-sm 
             flex-wrap d-flex justify-content-between align-items-center ">
          <div>

            :::
          </div>
          <input defaultChecked={obj.is_payed} onChange={(e) => toggleOrderState(e, obj, index)} className="form-check-input me-1" type="checkbox" value="" />
          {obj.product_name}
          <span className="badge bg-success rounded-pill">{obj.price}.LE</span>
          {/* <div style={{display:act ? 'block' : 'none'}}> */}

          <PencilSquare onClick={() => { console.log("first") }} />
          <Trash color='red' />
          {/* </div> */}
        </div>
      ))}

    </div>
  )
}
