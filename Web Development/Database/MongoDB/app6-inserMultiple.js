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
        const doc = [
            {
                "student_id": 16555,
                "address":"Lumding",
                "Roll No":19,
                "Marks":398,
                "Name":"Sreyoshi"
            },
            {
                "student_id":83456,
                "marks":359,
                "NEET Rank":12,
                "Name":"Sreyoshi"
            },
            {
                "student_id":99988,
                "Name":"Sreyoshi",
                "Marks":499
            }
        ]
        // this option prevents additional documents from being inserted if one fails
        const options = { ordered: true };
        await student.insertMany(doc, options);
    } 
    catch (err) {
        console.log(`Error - ${err.message}`);
    } 
    finally {
        await client.close();
    }
}
run().catch(console.dir);

/*
The options object is passed as the second argument to the insertMany method to specify options for the operation. 
In this case, the ordered option is set to true, which means that the documents will be inserted in the order they 
appear in the doc array. If an error occurs while inserting a document, the operation will stop and no further 
documents will be inserted.
The await keyword is used before calling the insertMany method to wait for the operation to complete before 
proceeding with the code. Since the insertMany method returns a promise, using the await keyword allows you to 
write asynchronous code in a way that looks similar to synchronous code.
*/