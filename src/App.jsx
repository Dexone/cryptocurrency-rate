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
  const [selectedValute, setSelectedValute] = useState("bitcoin"); //select
  const [text, setText] = useState(" "); //input

  const people = useRef(['bitcoin', 'ethereum', 'litecoin'])
  const listItems = people.current.map(e =>
    <div onClick={e => setSelectedValute(e.target.firstChild.data)}>{e}<button onClick={console.log()}>Удалить</button></div>
  );

  function add() {
    people.current.push(text)
    setText("")
  }




  //--------------------------------------------------------------------------------------------------------

  axios.get(`https://api.coincap.io/v2/assets/${selectedValute}/history?interval=h1`).then((res) => {

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


  return (
    <>





      <div className='ValutePicker'>
        <h2>CRYPTOCURRENCY RATE</h2>


        <div className="App">
          <Line
            data={data}
            options={options}
          ></Line>
        </div>




        {/* <select value={selectedValute}
          onChange={e => setSelectedValute(e.target.value)}>     {listItems}</select> */}


        {listItems}

        <button onClick={add}>add</button>

        <input
          onChange={e => setText(e.target.value)}
        />


      </div>
    </>
  );
}
export default ValutePicker;





