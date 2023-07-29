import express from 'express'
import mongoose from 'mongoose'
import uri from './first.js'
import router from './routes/user-routes.js'
const app = express();
app.use(express.json())

app.use('/api', router)
mongoose.connect(uri, { dbName: 'store' }).then(() => {
  app.listen(5000)
  console.log('Listening to 5000')
}).catch((err) => {console.log(err)})