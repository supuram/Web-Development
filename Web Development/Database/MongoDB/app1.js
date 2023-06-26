const {MongoClient} = require('mongodb')
const uri = require('./first.js');
console.log(uri);
const client = new MongoClient(uri);
const dbName = "store";

const connectToDatabase = async() => {
    try{
        await client.connect();
        console.log(`Connected to the ${dbName} database`);
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

/**
Lines 7-15
This code defines an asynchronous function named connectToDatabase that attempts to connect to a MongoDB database 
using the client.connect method. The client variable is assumed to be an instance of the MongoClient class from the 
mongodb module.

The main() function defined in this code snippet is an example of how the connectToDatabase function can be used. 
The main function is an asynchronous function that calls the connectToDatabase function using the await keyword to 
wait for the connection to the database to complete before proceeding.
The main function also uses a try-catch-finally block to handle any errors that may occur during the connection 
process and to ensure that the database connection is closed when the function is finished. If an error occurs 
while calling the connectToDatabase function, it is caught in the catch block and a message is logged to the 
console indicating that an error occurred. In the finally block, the client.close method is called to close the 
database connection.
The main function is then called at the end of the code snippet to run the function and connect to the database. 
This code is not strictly necessary for connecting to the database, but it provides an example of how the 
connectToDatabase function can be used in a larger program.

If the main function and its call at the end of the code snippet were not included, the connectToDatabase function 
would not be called and the program would not connect to the database. The main function is necessary in this code 
snippet because it calls the connectToDatabase function, which in turn calls the client.connect method to connect 
to the database. Without calling the connectToDatabase function, the client.connect method would not be called and 
the program would not connect to the database.

*! Since connectToDatabase is an asynchronous function it returns a promise, and you will need to use either the 
*! await keyword or the then method of the returned promise to wait for the connection to complete before proceeding 
*! with your code.
-----------------------------------------------------------------------------------------------------------------
Yes, you can call the client.connect method directly without defining or calling a main or connectToDatabase 
function. However, since the client.connect method returns a promise, you will need to use either the await keyword
or the then method of the returned promise to wait for the connection to complete before proceeding with your code. 
Here is an example of how you could call the client.connect method directly using the await keyword:
async function run() {
    try {
        await client.connect();
        console.log(`Connected to the database`);
    Add code here to interact with the database
    } catch (err) {
        console.log(`Error - ${err.message}`);
    } finally {
        await client.close();
    }
}
run();
-------------------------------------------------------------------------------------------------------------------
After calling the client.close method, the connection to the database is closed and you will not be able to perform
any further operations on the database using that MongoClient instance. If you want to insert a document into the 
database, you will need to do so before calling the client.close method.

In this code snippet, asynchronous functions are used because the client.connect and client.close methods of the 
MongoClient class from the mongodb module are asynchronous and return promises. Asynchronous functions make it 
easier to work with promises and asynchronous code by allowing you to use the await keyword to wait for a promise 
to be resolved or rejected before proceeding with your code.
In this specific example, the connectToDatabase and main functions are defined as asynchronous functions using the 
async keyword. This allows them to use the await keyword to wait for the client.connect and client.close methods to
complete before proceeding. For example, in the connectToDatabase function, the await client.connect() statement 
waits for the client.connect method to complete before proceeding to the next line of code. Similarly, in the main 
function, the await connectToDatabase() statement waits for the connectToDatabase function to complete before 
proceeding.
Using asynchronous functions and the await keyword in this way makes it easier to write and read code that works 
with promises and asynchronous operations because it allows you to write asynchronous code in a way that looks 
similar to synchronous code.
*/