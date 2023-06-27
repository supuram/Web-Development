const {MongoClient} = require('mongodb')
const uri = require('./first.js')
const client = new MongoClient(uri)
const database = client.db('store')
const products = database.collection('products')

async function run(){
    try{
        const query =  {price : {$gt : 39}}
        const options = {
            // sort returned documents in ascending order by id
            sort : {id : 1},
            // Include only id, name, price, category in each returned document
            projection : {_id : 0, id : 1, name : 1, price : 1, category : 1}
        }
        const num = await products.countDocuments(query, options)
        console.log(num)
    }
    finally{
        await client.close()
    }
}
run().catch(console.dir)