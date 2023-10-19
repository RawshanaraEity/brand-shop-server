const express = require("express");
const cors = require("cors");
require ('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();

// middleware
app.use(cors());
app.use(express.json());


const port = process.env.port || 5000;



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cbu3n83.mongodb.net/?retryWrites=true&w=majority`;

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

    const productCollection = client.db("productDB").collection("products");
    // const brandCollection = client.db("productDB").collection("brands");

    // post a data
    app.post('/products', async(req, res) =>{
      const product = req.body;
      const result = await productCollection.insertOne(product);
      console.log(result)
      res.send(result)
    })

    app.get('/products', async(req, res) =>{
      const result = await productCollection.find().toArray()
      console.log(result)
      res.send(result)
    })


  //   app.get('/products/:brandName', async(req, res) => {
  //     const brandName = req.params.brandName;
  //     const query = {brandName: new (brandName)}
  //     const result = await productCollection.find(query);
  //     res.send(result);
  // })

 


    // for brand collection
    // app.post('/brands', async(req, res) =>{
    //   const brand = req.body;
    //   const result = await brandCollection.insertOne(brand);
    //   console.log(result)
    //   res.send(result)
    // })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get("/", (req, res) => {
  res.send("Crud is running...");
});

app.listen(port, () => {
  console.log(`Simple Crud is Running on port ${port}`);
});
