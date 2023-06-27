const {MongoClient} = require('mongodb')
const fs = require('fs')
const uri = require('./first.js')
const client = new MongoClient(uri)
const database = client.db('store')
const student = database.collection('student_record')

async function run(){
    try{
        const query = {student_id:83939}
        const doc = JSON.parse(fs.readFileSync('./JSONFiles/file4.json'))
        await student.replaceOne(query, doc)
    }
    finally{
        await client.close()
    }
}
run().catch(console.dir)