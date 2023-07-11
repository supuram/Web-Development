import React, {useEffect, useState} from "react";
import Axios from 'axios'

function App() {
  const [data, setData] = useState('')
  const getData = async() => {
    try{
      const response = await Axios.get('http://localhost:5000/getData')  //requesting the server side to go to that particular url 
      setData(response.data) /* response.data is the data sent back by the server in response to the GET request. 
      This data is then stored in the data state variable using the setData function */
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

/**
*! Q)useEffect(() => {
*!     getData()
*!   }, [])
*! What is the use of this above snippet in the main code ?

Ans)The useEffect hook is used to run side effects, such as fetching data, after the component has rendered. In 
this case, the useEffect hook is being used to call the getData function after the component has mounted. The empty 
array [] passed as the second argument to useEffect ensures that the effect only runs once, after the initial 
render.
useEffect is used in this case to ensure that the getData function is called after the component has mounted. 
Without useEffect, the getData function would not be called and no data would be fetched from the server.

The useEffect hook is not strictly necessary for sending a request to the server, but it is a convenient way to 
ensure that the request is sent at the appropriate time in the component’s lifecycle. You could also call the 
getData function in response to a user interaction, such as a button click, or at some other point in your code. 
However, using useEffect ensures that the data is fetched automatically when the component mounts. 

*! Q)What do you mean by - after the component has mounted ?
Ans)In React, a component is said to have “mounted” when it has been rendered for the first time and inserted into 
the DOM. After a component has mounted, its componentDidMount lifecycle method (in class components) or the 
useEffect hook with an empty dependency array (in function components) is called. This is a good place to perform 
any setup that needs to happen after the component has been added to the page, such as fetching data from a server.

In the code you provided, the useEffect hook is being used to call the getData function after the App component has 
mounted. This means that the data will be fetched from the server automatically when the App component is first 
rendered. 
*/