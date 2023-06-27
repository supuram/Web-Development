const {MongoClient} = require('mongodb')
const fs = require('fs')
const uri = require('./first.js')
const client = new MongoClient(uri)
const database = client.db("store")
const student = database.collection("student_record")

const file1 = fs.readFileSync('./JSONFiles/file1.json')
const file2 = fs.readFileSync('./JSONFiles/file2.json')
const file3 = fs.readFileSync('./JSONFiles/file3.json')


// Parse data into JavaScript objects
const doc1 = JSON.parse(file1)
const doc2 = JSON.parse(file2)
const doc3 = JSON.parse(file3)

async function run(){
    try{
        const docs = [doc1, doc2, doc3]
        await student.insertMany(docs)
    }
    catch(err){
        console.log(`Error - ${err.message}`)
    }
    finally{
        await client.close()
    }
}
run()

/*
JSON.parse(file1) parses the contents of the file1 string as JSON and returns the resulting JavaScript object. The 
JSON.parse method is a built-in method of the JSON object that is used to parse JSON data into a JavaScript object.
The JSON.parse method takes a string as its argument and parses the contents of the string as JSON. If the string 
contains valid JSON data, the method returns a JavaScript object that represents the data. If the string does not 
contain valid JSON data, the method throws an error.

When you read data from a JSON file using the fs.readFileSync method, the data is returned as a string. In order 
to insert this data into a MongoDB collection using the insertMany method, you must first parse the string into a 
JavaScript object using the JSON.parse method. This converts the JSON data into a format that can be understood by 
the insertMany method.
*/