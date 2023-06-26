const {MongoClient} = require('mongodb')
const uri = require('./first.js');
console.log(uri);
const client = new MongoClient(uri);
const database = client.db("sample_analytics")
const accounts = database.collection("accounts")

const connectToDatabase = async() => {
    try{
        await client.connect();
        console.log(`Connected to the database`);
    }
    catch(err){
        console.log(`Error - ${err.message}`);
    }
}

const main = async() => {
    try{
        await connectToDatabase();
    }
    catch(err){
        console.log(`error`);
    }
    finally{
        await client.close();
    }
}
main();