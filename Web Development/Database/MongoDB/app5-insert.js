const {MongoClient} = require('mongodb')
const uri = require('./first.js')
const client = new MongoClient(uri)
const database = client.db("store")
const student = database.collection("student_record")

async function run() {
    try {
        await client.connect();
        console.log(`Connected to the database`);

        // Insert a document into the database
        const doc = {
            "student_id": 62637,
            "address":"NewYork",
            "Roll No":22,
            "Marks":470
        };
        await student.insertOne(doc);
    } catch (err) {
        console.log(`Error - ${err.message}`);
    } finally {
        await client.close();
    }
}
run();