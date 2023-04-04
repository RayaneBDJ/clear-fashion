const fs=require('fs');
const { connect } = require('http2');


var data = JSON.parse( fs.readFileSync('brands_products.json', 'utf8') );
//console.log(data);
const brands_name = data.map(x => x.brand);

new_data = []

for(const brand of data)
{
    const brand_name = brand.brand;
    const brand_rate = brand.rating; 

    for(const product of brand.products)
    {
        const brand_product_name = product.name;
        const brand_product_price = product.price ;
        const brand_product_image = product.image;
        const brand_product_image_link = product.image_link;

        new_data.push({"brand" : brand_name,"rating" : brand_rate,"product" : brand_product_name,"price" :brand_product_price, "image" : brand_product_image,"image_link":brand_product_image_link});
    }
}

//console.log(new_data);





const {MongoClient} = require('mongodb')

async function connectToDatabase() {
    const MONGODB_URI = 'mongodb+srv://rayanebadji00website:rmbm@cluster0.qz4srom.mongodb.net/test';
    const MONGODB_DB_NAME = 'clearfashion';
  
    const client = await MongoClient.connect(MONGODB_URI, { useNewUrlParser: true });
    const db = client.db(MONGODB_DB_NAME);
    console.log("\n")
    console.log("\n")
    console.log('Connected to mongo database')
  
    return {client, db};
}

async function insertData() {
  const { client, db } = await connectToDatabase();
  const collection = db.collection('products');
  try {
    for (const document of new_data) {
      const doc_exist = await collection.find({ product: document.product }).toArray();
      if (doc_exist.length === 0) {
        await collection.insertOne(document);
      }
    }
  } catch (err) {
    // Ignore duplicate key errors (code 11000)
    if (err.code !== 11000) {
      throw err; // re-throw other errors
    }
  }
  const all = await collection.find({}).toArray(); // to avoid duplicates
  console.log(`${all.length} products in the database`);
  client.close();
}

insertData();

// Create at least 3 methods to find products according query.

// Query 1 
// Find all products related to a given brands



async function query1(brand) {
    console.log("\n")
    console.log("---------------------------------------")
    console.log(" Query 1 : Find all products related to the \"" + brand + "\" brand ")
    console.log("---------------------------------------")
    console.log("\n")
    const {client,db} = await connectToDatabase();
    const collection = db.collection('products');
    const products = await collection.find({brand : brand}).toArray();
    client.close(); 
    console.log("The number of products found for this brand is : " + products.length.toString() + " products");
    console.log("\n")
    console.log("---------------------------------------");
    console.log("\n");
    console.log("\n");
    console.log(products)
    console.log("---------------------------------------");
    console.log("\n");
    console.log("\n");
    return products.length
  }

query1("DEDICATED");





/*setTimeout(function(){
    console.log("Waiting...");
}, 2000);

console.log("setTimeout() example...");*/


// Query 2
// Find all products less than a price


async function query2(price) {
    console.log("\n")
    console.log("---------------------------------------")
    console.log(" Query 2 :Find all products less than " + price + " euros")
    console.log("---------------------------------------")
    console.log("\n")
    const {client,db} = await connectToDatabase();
    const collection = db.collection('products');
    const products = await collection.find({"price" : { $lt : price}}).toArray();
    console.log(products);
    client.close(); 
    console.log("---------------------------------------");
    console.log("\n");
    console.log("\n");
  }

//query2(25);

// Query 3 
// Find All products sorted by price 

async function query3(sens) {
    var sens_number = 1;
    if(sens.toLowerCase() == "desc")
    {
        sens_number = -1;
    }
    console.log("\n")
    console.log("---------------------------------------")
    console.log(" Query 3 :Find All products sorted by price in a "+ sens+" order")
    console.log("---------------------------------------")
    console.log("\n")
    const {client,db} = await connectToDatabase();
    const collection = db.collection('products');
    const products = await collection.aggregate([{$sort : { "price" : sens_number}}]).toArray();
    console.log(products);
    client.close(); 
    console.log("---------------------------------------");
    console.log("\n");
    console.log("\n");
  }

//query3("DESC");