require('dotenv').config()

const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const {MongoClient} = require('mongodb');
const { connectToDatabase } = require('./db/connect');
const { Product} = require("./model/product")
const router = express.Router();


const PORT = 8092;

const app = express();

app.get("/", (req,res) => {
  console.log("This is the first get bro")
})

async function connect(){
  const db = connectToDatabase(process.env.MONGODB_URI, (erreur) => {
    if(erreur)
    {
      console.log("Error when trying to connect to the database");
      process.exit(-1);
    }
  });
  return db;
}

connect();

app.listen(PORT);
console.log(`📡 Running on port ${PORT}`);


const display_product = async (req,res) => {
  try{    

    const db = await connect();

    let result = await db.collection("products").find({}).toArray();

    res.status(200).json(result);
  }
  catch(error){
    console.log(error);
    res.status(500).json(error);

  }

  
}

router.route("/products").get(display_product);

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.use("/api/v1",router)


/*async function show() {
  const all = await db.collection('products').find({}).toArray(); // to avoid duplicates
  console.log(all.length.toString() + ' products in the database ');

}
show();*/






module.exports = app;

/*app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());*/



/*async function connectToDatabase() {

app.get('/products', (request, response) => {
  db.collection('products').find().toArray((err, results) => {
    if (err) {
      console.error('Failed to retrieve products from database:', err);
      response.status(500).send('Failed to retrieve products from database');
    } else {
      response.json(results);
    }
  });
});

}*/

//connectToDatabase()



