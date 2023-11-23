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

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)





function ValutePicker() {
  const [selectedValute, setSelectedValute] = useState("bitcoin"); //select

  axios.get(`https://api.coincap.io/v2/assets/${selectedValute}/history?interval=h1`).then((res) => {
    console.log(dataLabels)
    dataLabels.value = [res.data.data[715].date.slice(11,16), res.data.data[716].date.slice(11,16), res.data.data[717].date.slice(11,16), res.data.data[718].date.slice(11,16), res.data.data[719].date.slice(11,16)]
    dataValues.value = [res.data.data[715].priceUsd, res.data.data[716].priceUsd, res.data.data[717].priceUsd, res.data.data[718].priceUsd, res.data.data[719].priceUsd]
  })
  const dataLabels = useRef([])
  const dataValues = useRef([])

  const data = {
    labels: dataLabels.value,
    datasets: [
      {
        labels: 'Cryptocurrency_rate',
        data: dataValues.value,
        backgroundColor: 'aqua',
        borderColor: 'black',
        pointBorderColor: 'aqua',
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






  return (
    <>
      <button onClick={test}>test</button>

      <select
        value={selectedValute}
        onChange={e => setSelectedValute(e.target.value)}
      >
        <option value="bitcoin">Bitcoin</option>
        <option value="ethereum">Ethereum</option>
        <option value="litecoin">Litecoin</option>
      </select>




      <div className="App">
        <h3>Cryptocurrency_rate</h3>
        <Line
          data={data}
          options={options}
        ></Line>
      </div>



    </>
  );
}
export default ValutePicker;





