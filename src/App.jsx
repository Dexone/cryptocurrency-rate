import { useState, useRef } from 'react'
import './App.css'
import axios from 'axios'
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js'
import { Select, Space } from 'antd';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)





function ValutePicker() {

    const selectValue = useRef(0)

    const handleChange = (value) => {
      selectValue.current = { value }
    };


    const [selectedValute, setSelectedValute] = useState("bitcoin"); //select


    axios.get(`https://api.coincap.io/v2/assets/${selectedValute}/history?interval=h1`).then((res) => {
      console.log(selectedValute)
      dataLabels.value = [res.data.data[715].date.slice(11, 16), res.data.data[716].date.slice(11, 16), res.data.data[717].date.slice(11, 16), res.data.data[718].date.slice(11, 16), res.data.data[719].date.slice(11, 16)]
      dataValues.value = [res.data.data[715].priceUsd, res.data.data[716].priceUsd, res.data.data[717].priceUsd, res.data.data[718].priceUsd, res.data.data[719].priceUsd]
    })




    const dataLabels = useRef([])
    const dataValues = useRef([])



    const data = {
      labels: dataLabels.value,
      datasets: [
        {
          data: dataValues.value,
          backgroundColor: '#333639',
          borderColor: '#333639',
        }
      ]
    }
    const options = {
      plugins: {
        legend: true
      }
    }


    function test() {

    }
console.log("test")




    return (
      <>
        <div className='ValutePicker'>



          <Select
            defaultValue="bitcoin"
            style={{
              width: 300,
            }}
            onChange={handleChange}
            options={[
              {
                value: 'bitcoin',
                label: 'Bitcoin',
              },
              {
                value: 'ethereum',
                label: 'Ethereum',
              },
              {
                value: 'litecoin',
                label: 'Litecoin',
              },
            ]}
          />



          <button onClick={e => (setSelectedValute(e.target.value))}>test</button>

          <select
            value={selectedValute}
            onChange={e => setSelectedValute(e.target.value)}
          >
            <option value="bitcoin">Bitcoin</option>
            <option value="ethereum">Ethereum</option>
            <option value="litecoin">Litecoin</option>
          </select>

          <div className="App">
            <Line
              data={data}
              options={options}
            ></Line>
          </div>
        </div>
      </>
    );
  }
export default ValutePicker;





