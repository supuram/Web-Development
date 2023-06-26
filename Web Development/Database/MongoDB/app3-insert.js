const {MongoClient} = require('mongodb')
const uri = require('./first.js');
console.log(uri);
const client = new MongoClient(uri);
const database = client.db("store")
const student = database.collection("student_record")

async function run(){
    try{
        const doc = {
            "student_id":12345,
            "scores":[
                {
                    "type":"dance",
                    "score":30
                },
                {
                    "type":"chemistry",
                    "score":96
                }
            ]
        }
        await student.insertOne(doc)
    }
    finally{
        await client.close()
    }
}
run().catch(console.dir)

/**
Q)In this code we have not added any client.connect() method. then how is it working? or is it because, if one code 
in our VSCode editor in the same folder gets connected to the database rest others need not be connected ? 

*? In this code snippet, the client.connect method is not explicitly called before interacting with the database. 
*? However, the MongoClient class from the mongodb module has a feature called “auto-connect” that automatically 
*? connects to the database when the first operation is performed if a connection has not already been established. 
*? This means that even though the client.connect method is not explicitly called in this code, the MongoClient 
*? instance will still connect to the database automatically when the insertOne method is called on the student 
*? collection.

It is important to note that this behavior is specific to the MongoClient class from the mongodb module and may not 
apply to other database drivers or libraries. It is generally considered good practice to explicitly call the 
connect method before interacting with the database to ensure that a connection has been established and to handle 
any errors that may occur during the connection process.
-------------------------------------------------------------------------------------------------------------------
The `run().catch(console.dir)` statement calls the `run` function and registers a callback function to handle any 
errors that may be thrown by the `run` function. The `run` function is assumed to be an asynchronous function that 
returns a promise.
When the `run` function is called, it returns a promise. The `catch` method of the returned promise is then called 
with the `console.dir` method as its argument. This registers the `console.dir` method as a callback function to 
be called if the promise returned by the `run` function is rejected (i.e., if an error is thrown by the `run` 
function).
If an error is thrown by the `run` function, the promise returned by the function will be rejected and the 
`console.dir` method will be called with the error object as its argument. This will log the error object to the 
console using the `console.dir` method, which displays an interactive list of the properties of the error object.
In summary, this statement calls the `run` function and logs any errors that may be thrown by the function to the 
console using the `console.dir` method.
*/