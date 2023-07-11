import React, {useEffect, useState} from "react";
import Axios from 'axios'

function App() {
  const [data, setData] = useState('')
  const getData = async() => {
    try{
      const response = await Axios.get('http://localhost:5000/getData')
      setData(response.data)
    }
    catch(err){
      console.error(err.message)
    }
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div className="App">
      {data}
    </div>
  );
}

export default App;
