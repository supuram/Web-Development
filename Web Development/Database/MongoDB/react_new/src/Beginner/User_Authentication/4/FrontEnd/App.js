import React, {useEffect, useState} from "react";
import Axios from 'axios'
import Home from './Home.js'

function App() {
  const [data, setData] = useState({ showHome: false })
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
      {data.showHome && <Home />}
    </div>
  );
}
export default App;

/**
showHome is just a variable name that I chose for this example. It is not a predefined property or variable in 
React or JavaScript.

In the server-side code, showHome is a property of the object that is sent as a response to the client when the 
/getData endpoint is requested. The value of this property can be any valid JavaScript value, such as a boolean, 
string, number, or object.

In the client-side code, showHome is a property of the data state variable. The value of this property is initially 
set to false, but it is updated with the value from the server when the data is fetched using Axios.get.

You can use any variable name that makes sense for your use case. The important thing is that the data sent from 
the server is used to update the state on the client side, and that state is used to conditionally render the Home 
component. 
*/