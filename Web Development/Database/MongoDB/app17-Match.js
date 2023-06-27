const {MongoClient} = require('mongodb')
const uri = require('./first.js')
const client = new MongoClient(uri)
const database = client.db('store')
const products = database.collection('products')

const pipeline = [
    // Will only choose those documents whose price is less than 40
    {$match : {price : {$lt : 40}}},
    {$group : {
        _id : "HTML T-Shirt",
        count_price : {$sum : 1},
        total_price : {$sum : "$price"},
        average_price : {$avg : "$price"}
    }}
]

async function run(){
    try{
        const num = await products.aggregate(pipeline)
        for await(let doc of num)
            console.log(doc)
    }
    finally{
        await client.close()
    }
}
run().catch(console.dir)

/*
Lines 7 - 16
In the first stage ($match), the pipeline filters the input documents to only include those whose price field is 
less than 40.

In the second stage ($group), the pipeline groups the remaining documents by a constant value "HTML T-Shirt", 
meaning all documents will be grouped into a single group. The pipeline then calculates the sum of the values of 
the price field for each group using the $sum accumulator expression. Since 1 is passed as an argument to $sum, it 
adds 1 for each document in the group, effectively counting the number of documents in each group.

The result of this pipeline will be a single document with an _id field equal to "HTML T-Shirt" and a price field 
equal to the number of input documents whose price field is less than 40.
*/