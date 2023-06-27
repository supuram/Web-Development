const {MongoClient} = require('mongodb')
const uri = require('./first.js')
const client = new MongoClient(uri)
const database = client.db('store')
const products = database.collection('products')

async function run(){
    try{
        const a = await products.createIndex({'Hoodie' : 1})
        await products.getIndexes()
    }
    finally{
        await client.close()
    }
}
run().catch(console.dir)