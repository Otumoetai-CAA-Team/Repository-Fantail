const { MongoClient } = require("mongodb");
const mongodb = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://fyeard1449:hcGBE6g5i7ZhuodU@clusterm.zscdl.mongodb.net/audioDB?retryWrites=true&w=majority";

  const vartrackID = "60c29115021120107b0187c1" 

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db('audioDB');
    const audio = database.collection('fs.files');
    // Query for an audio that has the correct ID
    const query = { _id: ObjectId(vartrackID) };
    const track = await audio.findOne(query);
    console.log(track);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);