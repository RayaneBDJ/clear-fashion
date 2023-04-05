const cors = require('cors');
const express = require('express');
const helmet = require('helmet')
const { MongoClient } = require('mongodb');
const MONGODB_URI = 'mongodb+srv://rayanebadji00website:rmbm@cluster0.qz4srom.mongodb.net/test';
const MONGODB_DB_NAME ="clearfashion";


const router = express.Router();
const app = express();
const PORT = process.env.PORT || 8092;

app.use(express.urlencoded({ extended: true }));

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*',cors());


app.listen(PORT, () => {
  console.log(`📡 Running on port ${PORT}`);
});


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
  const db = await connectToDatabase(MONGODB_URI, (error) => {
    if (error) {
      console.log("Error when trying to connect to the database");
      process.exit(-1);
    }
  });
  return db;
}

const display_product = async (req, res,next) => {
  try {
    const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
    const db = client.db(MONGODB_DB_NAME);
    const collection = db.collection('products');
  
    const result = await collection.find().toArray();
  
    res.json(result);

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

const search = async (req, res, next) => {
  try {
    const client = await MongoClient.connect(MONGODB_URI, { useNewUrlParser: true });
    const db = client.db(MONGODB_DB_NAME);
    const collection = db.collection('products');

    const filters = req.query;

    const limit = parseInt(req.query.limit);
    const brand = req.query.brand ? { $regex: new RegExp(req.query.brand, 'i') } : { $exists: true };
    const price = parseFloat(req.query.price);

    let query = { brand };
    if (!isNaN(price)) {
      query.price = { $lte: price };
    }
    if(req.query.sortBy && req.query.sortOrder)
      { const sortBy = req.query.sortBy || 'price';
      const sortOrder = req.query.sortOrder || 'asc';
      var sort = {};
      sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
     }
    

    const result = await collection.find(query).limit(limit).sort(sort).toArray();

    res.json(result);

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

/*router.get("/", display_product);*/


// GET 

app.get("/", display_product);
app.get('/search',search)


/*app.get('/products', async (req, res) => {
  try {
    const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
    const db = client.db(MONGODB_DB_NAME);
    const collection = db.collection('products');
  
    const result = await collection.find({}).toArray();
  
    res.json(result);

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
})*/
