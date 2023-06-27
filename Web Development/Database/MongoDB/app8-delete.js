const {MongoClient, ObjectId} = require('mongodb')
const uri = require('./first.js')
const client = new MongoClient(uri)
const database = client.db('store')
const student = database.collection('student_record')

async function run(){
    try{
        const query = {student_id:12345}
        /* If there are two documents with sam student_id, then it will delete that document which comes first
        */
        const query1 = {_id:new ObjectId('6499694d80fe3e5646e23968')}  // To use ObjectId you need line number 1
        await student.deleteOne(query)
        await student.deleteOne(query1)
    }
    finally{
        await client.close()
    }
}
run().catch(console.dir)

/*
The new keyword is used before ObjectId to create a new instance of the ObjectId class. In JavaScript, the new 
keyword is used to create an instance of a user-defined object type or of one of the built-in object types that 
has a constructor function. When you use the new keyword before a function call, it creates a new object and sets 
the value of this within the constructor function to the newly created object.

In this case, ObjectId is a constructor function provided by the mongodb package that creates a new ObjectId 
instance. The new keyword is used to create a new instance of the ObjectId class with the specified string value.
*/