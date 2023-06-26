const {MongoClient} = require('mongodb')
const fs = require('fs')
const uri = require('./first.js')
console.log(uri)
const client = new MongoClient(uri)
const database = client.db("store")
const student = database.collection("student_record")

async function run(){
    try{
        // Read data from JSON file
        const data = JSON.parse(fs.readFileSync('app4-insert.json', 'utf8'))
        await student.insertOne(data)
    }
    finally{
        await client.close()
    }
}
run().catch(console.dir)

/*
The insertOne method of a MongoDB collection expects an object as its argument. If you want to insert data 
from a JSON file into a MongoDB collection, you will need to first read the data from the JSON file into a 
JavaScript object and then pass that object to the insertOne method.
*/