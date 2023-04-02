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

app.get('/', (request, response) => {
  response.send({'ack': true});
});

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

const display_product = async (req, res) => {
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
}

const search = async (req, res,next) => {
  try {
    const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
    const db = client.db(MONGODB_DB_NAME);
    const collection = db.collection('products');

    const filters = req.query;
  
    const result = await collection.find({}).toArray();
    const filteredProducts = result.filter(product => {
      let isValid = true
      for(key in filters){
        isValid = isValid && product[key] == filters[key];
      }
      return isValid;
    })
  
    res.json(filteredProducts);

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

/*router.get("/", display_product);*/


// GET 

app.get("/products", display_product);
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
