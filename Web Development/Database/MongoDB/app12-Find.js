const {MongoClient} = require('mongodb')
const uri = require('./first.js')
const client = new MongoClient(uri)
const database = client.db('store')
const products = database.collection('products')

async function run(){
    try{
        const query =  {category:"T-Shirt"}
        const num = await products.find(query)
        for await(const doc of num){
            console.dir(doc)
        }
    }
    finally{
        await client.close()
    }
}
run().catch(console.dir)