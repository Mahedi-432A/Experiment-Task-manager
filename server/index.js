const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
// const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@taskmanager.rhmpuoe.mongodb.net/?retryWrites=true&w=majority&appName=TaskManager`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const taskCollection = client.db('taskManager').collection('tasks');
    const userCollection = client.db('taskManager').collection('users');
    const noteCollection = client.db('taskManager').collection('notes');

    // store and manage users data
    app.get('/user/:email', async (req, res) => {
      const email = req.params.email;
      const query = { 'userInfo.email': email };
      const user = await userCollection.findOne(query);
      const sendData = { name: user.userInfo.name, photo: user.userInfo.photo };
      res.send(sendData);
    });

    app.post('/users', async (req, res) => {
      const user = req.body;
      // console.log(user);
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    // store and manage notes data
    app.get('/notes/:email', async (req, res) => {
      const email = req.params.email;
      const query = { userEmail: email };
      const notes = await noteCollection.find(query).toArray();
      res.send(notes);
    });

    app.get('/note/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const note = await noteCollection.findOne(query);
      res.send(note);
    });

    app.post('/notes', async (req, res) => {
      const note = req.body;
      // console.log(note);
      const result = await noteCollection.insertOne(note);
      res.send(result);
    });

    app.put('/note/:id', async (req, res) => {
      const id = req.params.id;
      const updatedNote = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          ...updatedNote
        },
      };
      const option = { upsert: true };
      const result = await noteCollection.updateOne(filter, updateDoc, option);
      res.send(result);
      // console.log(updateDoc);

      app.delete('/note/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await noteCollection.deleteOne(query);
        res.send(result);
      });

    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});