const express = require("express");
const {MongoClient} = require("mongodb");
const bodyParser = require("body-parser");
const path = require('path');
const url = "mongodb://127.0.0.1:27017";
const app = express();
const client = new MongoClient(url);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

client.connect();
let db = client.db("market");
let items = db.collection("products");

app.get("/test", async (req,res) => {
  const products = await items.find().toArray();
  res.send(JSON.stringify(products));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/test', async (req, res) => {
  const { name, price, image } = req.body;
  const message = await items.insertOne({ name, price, image });
  res.send("Recived and created");
});

app.listen(3001);