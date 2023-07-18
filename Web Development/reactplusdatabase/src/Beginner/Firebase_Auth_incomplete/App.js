import { useEffect, useState } from 'react';
import './App.css';
import {Auth} from './components/auth.js'
import { db } from './config/firebase_config'
import {getDocs, collection} from 'firebase/firestore'

function App() {
  const [movieList, setMovieList] = useState([])
  const moviesCollectionRef = collection(db, 'movies')
  useEffect(() => {
    const getMovieList = async() => {
      try{
        const data = await getDocs(moviesCollectionRef)
        const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }))
        console.log(filteredData)
      }
      catch(err){
        console.error(err)
      }
    }
    getMovieList()
  }, [])
  
  return (
    <div className="App">
      <Auth />
    </div>
  );
}
export default App;