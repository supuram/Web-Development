const {MongoClient, ObjectId} = require('mongodb')
const uri = require('./first.js')
const client = new MongoClient(uri)
const database = client.db('store')
const student = database.collection('student_record')

async function run(){
    try{
        const query = {Name:"Sreyoshi"}
        await student.deleteMany(query)
    }
    finally{
        await client.close()
    }
}
run().catch(console.dir)

/*
{
    "student_id":79067,
    "Marks":245,
    "Skills":{"java":"expert","javascript":"intermediate","Python":"Experts"}
}

const query = {'Skills.Python':'Experts'} will delete this document
*/