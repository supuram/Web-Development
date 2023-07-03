const { MongoClient, ObjectId } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const uri = require('./first.js');
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const app = express();
        app.set('view engine', 'ejs');
        app.use(bodyParser.urlencoded({ extended: true }));

        const database = client.db('store');
        const blog = database.collection('blogPost');

        app.get('/', async (_req, res) => {
            const docs = await blog.find({}).toArray();
            res.render('blog.ejs', { docs : docs });
        });

        app.get('/blog/:id', async (req, res) => {
            const docId = req.params.id;
            const doc = await blog.findOne({ _id: new ObjectId(docId) });
            res.render('blog-post.ejs', { doc: doc });
        });
        
        app.post('/', async (_req, res) => {
            const input1 = _req.body.input1;
            const input2 = _req.body.input2;
            const input3 = _req.body.input3;
            try {
                await blog.updateMany(
                    { comments: { $type: 'string' } },
                    { $set: { comments: [] } }
                );
                const result = await blog.insertOne({
                    heading: input1,
                    content: input2,
                    comments: [input3]
                });
                const newDocId = result.insertedId;
                const newDocUrl = `/blog/${newDocId}`;
                await blog.updateOne({ _id: newDocId }, { $set: { url: newDocUrl } });
                res.redirect('/');
            } catch (err) {
                console.error(err);
            }
        });

        app.post('/blog/:id', async (req, res) => {
            const docId = req.body.docId;
            const comment = req.body.comment;
            try {
                await blog.updateOne({ _id: new ObjectId(docId) }, { $push: { comments: comment } });
                res.redirect(`/blog/${docId}`);
            } catch (err) {
                console.error(err);
            }
        });
        

        app.listen(3000, () => {
            console.log('Server listening on port 3000');
        });
    } catch (err) {
        console.error(err);
    }
}
run();

/**
*! Q)const docId = req.params.id; What does this line do ?

Ans)This line of code retrieves the value of the id route parameter from the req.params object and assigns it to a 
variable named docId. The req.params object is an object that contains the route parameters of the current request 
in an Express app.

In the context of the /blog/:id route, the :id segment of the URL is a route parameter that represents the _id of a 
blog post. When a request is made to a URL that matches this route pattern, such as /blog/123, the value of the id 
parameter is extracted from the URL and stored in the req.params object. You can access the value of the id 
parameter using req.params.id.
*! -----------------------------------------------------------------------------------------------------------------
*! { _id: new ObjectId(docId) } - What does this line do ?

*? Ans)The new ObjectId(docId) expression creates a new ObjectId object using the value of the docId variable. The 
*? docId variable is expected to be a string representation of an ObjectId. When you pass this string to the 
*? ObjectId constructor, it creates a new ObjectId object that has the same value as the original ObjectId 
*? represented by the string.

In other words, the new ObjectId(docId) expression converts a string representation of an ObjectId into an actual 
ObjectId object. The data type of the docId variable before being passed to the ObjectId constructor is expected to 
be a string.

The reason we need to create a new ObjectId object from the docId string is that MongoDB stores document _ids as 
ObjectIds, not as strings. When querying the MongoDB collection for a document with a specific _id, we need to 
provide the _id value as an ObjectId, not as a string. By creating a new ObjectId object from the docId string, 
we’re able to provide the correct data type for the _id field in the query filter.
*! ================================================================================================================
*/