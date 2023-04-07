const express = require("express");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middle-wares
app.use(cors());
app.use(express.json());

//MONGO Config
const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ac-m6h1wqx-shard-00-00.rdmew3v.mongodb.net:27017,ac-m6h1wqx-shard-00-01.rdmew3v.mongodb.net:27017,ac-m6h1wqx-shard-00-02.rdmew3v.mongodb.net:27017/?ssl=true&replicaSet=atlas-ru88hx-shard-0&authSource=admin&retryWrites=true&w=majority`;

const client = new MongoClient(uri);

async function run() {
  try {
    const doctorsCollection = client
      .db("healthDirect")
      .collection("doctorsInformation");

    const blogsCollection = client.db("healthDirect").collection("blogPosts");

    app.get("/doctors", async (req, res) => {
      const query = {};
      const cursor = doctorsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/blogs", async (req, res) => {
      const query = {};
      const cursor = blogsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/doctorsByFilter", async (req, res) => {
      const query = req.body ? req.body : {};
      console.log(query);
      const cursor = doctorsCollection.find(query);
      const result = await cursor.toArray();
      console.log(result);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

// root url
app.get("/", (req, res) => res.send("Sunam's Testing Server is Running !!!!"));
app.listen(port, () => console.log("listening to port", port));
