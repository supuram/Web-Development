const {MongoClient} = require('mongodb')
const uri = require('./first.js')
const client = new MongoClient(uri)
const accounts = client.db('store').collection('accounts')
const transfers = client.db('store').collection('transfers')

let account_id_sender = 1
let account_id_receiver = 2
let transaction_amount = 1000

const session = client.startSession()

async function main(){
    try{
        const transactionResults = await session.withTransaction(async() => {
            // Update the account sender balance
            await accounts.updateOne(
                {account_id : account_id_sender},
                {$inc : {balance : - transaction_amount}},
                {session}
            )

            // Update the account receiver balance
            await accounts.updateOne(
                {account_id : account_id_receiver},
                {$inc : {balance : transaction_amount}},
                {session}
            )

            // Insert the transfer document
            const transfer = {
                transfer_id : 1,
                amount : transaction_amount,
                from_account : account_id_sender,
                to_account : account_id_receiver
            }
            await transfers.insertOne(transfer, {session})

            // Update the transfers_complete field for the senders account
            await accounts.updateOne(
                {account_id : account_id_sender},
                /*Yes, the $push operator is necessary in this statement. The $push operator appends a 
                specified value to an array. In this case, it appends the transfer.transfer_id value to the 
                transfers_complete array. Without the $push operator, the update would overwrite the entire 
                transfers_complete field with the new value instead of appending it to the array.
                */
                {$push : {transfers_complete : transfer.transfer_id}},
                {session}
            )

            // Update the transfer_complete field for the receiver account
            await accounts.updateOne(
                {account_id : account_id_receiver},
                {$push : {transfers_complete : transfer.transfer_id}},
                {session}
            )
        })
        if(transactionResults)
            console.log("success")
        else
            console.log("Aborted")
    }
    finally{
        await session.endSession()
        await client.close()
    }
}
main()

/*
The {session} option is included in the updateOne method to specify that the update operation should be 
executed within the context of the specified session. This is necessary because the update operation is part
of a transaction that is being executed within a session. By including the {session} option, the update 
operation becomes part of the transaction and will be committed or aborted along with the other operations 
in the transaction.
------------------------------------------------------------------------------------------------------------------
client.startSession() is used in this code because the operations are being executed as part of a transaction. 
Transactions allow multiple read and write operations to be executed in an all-or-nothing manner. If any part of 
the transaction fails, all changes made within the transaction are rolled back.

In this code, multiple updateOne and insertOne operations are being executed within a transaction. This means that 
if any of these operations fail, all changes made within the transaction will be rolled back. To execute these 
operations within a transaction, a session must first be started using client.startSession(). The session object 
is then passed to the withTransaction method to execute the transaction within the session.

If you were only executing a single updateOne or insertOne operation outside of a transaction, you would not need 
to start a session using client.startSession().
------------------------------------------------------------------------------------------------------------------
client.startSession() is necessary in this code. It starts a new client session and returns a ClientSession object. 
This object is then used to execute the transaction within the session using session.withTransaction().
*/