require('dotenv').config()

const cors = require('cors');
const express = require('express');
const { MongoClient } = require('mongodb');


const router = express.Router();
const app = express();
const PORT = process.env.PORT || 8092;

app.use(express.urlencoded({ extended: true }));


var client = null;
var db = null;

async function connectToDatabase(url,callback)  {

    const MONGODB_DB_NAME = 'clearfashion';
  
    if(client == null){
        const client = await MongoClient.connect(url, { useNewUrlParser: true });
        db = client.db(MONGODB_DB_NAME);
        console.log('Connected to mongo database')
          
    } else 
    {
        callback();
        
    }
  
    return db;
}

function closeConnect(){
    if(client){
        client.close();
        client = null;
    }
}

async function connect() {
  const db = await connectToDatabase(process.env.MONGODB_URI, (error) => {
    if (error) {
      console.log("Error when trying to connect to the database");
      process.exit(-1);
    }
  });
  return db;
}

const display_product = async (req, res) => {
  try {
    const db = await connect();
    let result = await db.collection("products").find({}).toArray();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

/*router.get("/", display_product);
app.use("/api/v1", router);*/

app.get('/api/data', display_product);

app.listen(PORT, () => {
  console.log(`📡 Running on port ${PORT}`);
});