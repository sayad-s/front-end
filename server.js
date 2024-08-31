const express = require("express");
const cors = require("cors");
const {MongoClient} = require("mongodb");
const bodyParser = require("body-parser");
const path = require('path');
const url = "mongodb://127.0.0.1:27017";
const app = express();
const client = new MongoClient(url);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

client.connect();
let db = client.db("sayaddb");
let items = db.collection("products");

app.get("/test", async (req,res) => {
  const products = await items.find().toArray();
  res.send(JSON.stringify(products));
  // res.send(products);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/test', async (req, res) => {
  const { name, price, image } = req.body;
  const message = await items.insertOne({ name, price, image });
  res.send("Recived and created");
});

app.listen(5021);
