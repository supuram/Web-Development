const {MongoClient} = require('mongodb')
const uri = require('./first.js')
const client = new MongoClient(uri)
const database = client.db('store')
const student = database.collection('student_record')

async function run(){
    try{
        const query = {student_id: 79067}
        const options = { upsert: true }
        const updateDoc = {$set: {
            movies:['Wall-e', 'Avatar', 'Godzilla'],
            Hobbies:['Cricket', 'Football', 'Tennis', 'Badminton']
        }}
        await student.updateOne(query, updateDoc, options)
    }
    finally{
        await client.close()
    }
}
run()

/*
upsert property set to true, which means that if no document matches the filter, a new document will be 
created.
If you don’t include the upsert option or set it to false, the updateOne method will only update an existing 
document that matches the filter. If no document matches the filter, no new document will be created and no 
update will be performed.

$set is an update operator provided by MongoDB that is used to set the value of a field in a document.
*/