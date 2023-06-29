const {MongoClient} = require('mongodb')
const uri = require('./first.js')
const client = new MongoClient(uri)
const database = client.db('store')
const products = database.collection('products')
async function watchCollection(){
    try{
        await client.connect()
        console.log('Connected')
        const pipeline = [
            { $match: { 'fullDocument.category': 'Hoodie' } },
        ]
        const changeStream = products.watch(pipeline)
        changeStream.on('change', next => {
            console.log('Supratik ', next)
        })
    }
    catch(err){
        console.error(err)
    }
}
client.on('close', () => {
    console.log('Connection closed');
})
watchCollection()

/**
Q)Will the Brand:AtihsI be added to all the documents whose category matches Hoodie after this code ?
Ans)No, the $addFields stage in the aggregation pipeline used to configure the change stream does not modify the \
documents in the products collection. Instead, it adds a new field to the change stream output, which is a separate 
object that contains information about the changes that occur in the collection.

When a change occurs in the products collection that matches the $match stage of the pipeline (i.e., when a 
document is inserted, updated, or deleted where the category field is 'Hoodie'), the change stream will emit a 
change event and pass an object containing information about the change to the event listener. This object will 
include a brand property with a value of 'AtihsI', which is added by the $addFields stage in the pipeline.

However, this does not modify the documents in the products collection or add a brand field to those documents. 
The $addFields stage only affects the change stream output, not the underlying data in the collection.

If you want to update the documents in the products collection and add a brand field to all documents where the 
category field is 'Hoodie', you can use an update operation with an update query that specifies these criteria. 

*! Q)while the code was running , i deleted a document. but the console.log inside the changeStream did not get 
*! printed. why ? Isn't changeStream supposed to monitor for any changes ?

*? Ans)Yes, the changeStream is supposed to monitor for changes in the collection. However, in the code you 
*? provided, the pipeline for the changeStream only includes a $match stage that filters changes to only include 
*? those where the fullDocument.category field is equal to 'Hoodie'. This means that if you deleted a document that 
*? did not have a category field equal to 'Hoodie', the change would not be included in the changeStream and the 
*? console.log statement would not be executed.

*? If you want to monitor all changes to the collection, including deletions, you can remove the $match stage from 
*? the pipeline. Alternatively, if you only want to monitor deletions, you can modify the $match stage to include a 
*? condition on the operationType field, like this: { $match: { operationType: 'delete' } }.
*/