const {MongoClient} = require('mongodb')
const uri = require('./first.js')
const client = new MongoClient(uri)
const database = client.db('store')
const products = database.collection('products')

async function run(){
    try{
        const fieldName = 'price'
        const query =  {id : 9}
        const num = await products.distinct(fieldName, query)
        console.log(num)
    }
    finally{
        await client.close()
    }
}
run().catch(console.dir)