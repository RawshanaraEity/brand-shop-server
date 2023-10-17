const express = require("express");
const cors = require("cors");
const app = express();

// middleware
app.use(cors());
app.use(express.json());

const port = process.env.port || 5000;




app.get("/", (req, res) => {
  res.send("Crud is running...");
});

app.listen(port, () => {
  console.log(`Simple Crud is Running on port ${port}`);
});
