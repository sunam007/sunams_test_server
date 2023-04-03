const express = require("express");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const { ingredientCategoryApi } = require("./api/ingredientCategoryApi");

// middle-wares
app.use(cors());
app.use(express.json());

//MONGO Config
const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ac-m6h1wqx-shard-00-00.rdmew3v.mongodb.net:27017,ac-m6h1wqx-shard-00-01.rdmew3v.mongodb.net:27017,ac-m6h1wqx-shard-00-02.rdmew3v.mongodb.net:27017/?ssl=true&replicaSet=atlas-ru88hx-shard-0&authSource=admin&retryWrites=true&w=majority`;

const client = new MongoClient(uri);

const run = async () => {
  try {
    const ingredientCategoryCollection = client
      .db("restaurantPOS")
      .collection("ingredientCategories");
    const query = {};

    app.get("/ingredientCategories", async (req, res) => {
      const cursor = ingredientCategoryCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/ingredientCategories", async (req, res) => {
      const payload = req.body;
      const result = await ingredientCategoryCollection.insertOne(payload);
      res.send(result);
    });

    app.delete("/ingredientCategories/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await ingredientCategoryCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
};
run().catch(console.dir);

ingredientCategoryApi().catch(console.dir);

// root url
app.get("/", (req, res) =>
  res.send("Sunam's Testing Server is Running !!!! Bam !!!")
);
app.listen(port, () => console.log("listening to port", port));
