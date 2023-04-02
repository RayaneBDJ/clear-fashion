/* eslint-disable no-console, no-process-exit */
const brand = require('./eshops/brand.js');


var fs=require('fs');


var i = 0;


async function sandbox (eshops = ['https://www.dedicatedbrand.com/en/men/news','https://www.montlimart.com/99-vetements','https://shop.circlesportswear.com/collections/collection-homme']) {
  const data = JSON.parse(fs.readFileSync('brands.json', 'utf8'));

  for(const eshop of eshops)
  {
    try {
      console.log(`🕵️‍♀️  browsing ${eshop} eshop`);

      const products = await brand.scrape(eshop);

      console.log(products);
      console.log(" The number of products found on the page " + eshop + " is : " + (products.length).toString() + " products")
      data[i]['products'] = products;

    } catch (e) {
      console.error(e);
      process.exit(1);
    }
    i += 1;
  }

  console.log('done');

  const jsonData = JSON.stringify(data,null,2);

  fs.writeFile('brands_products.json', jsonData, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Data written to file successfully.');
    }

    process.exit(0);
  });
}

const [,, eshops] = process.argv;

sandbox(eshops);





// MONGO DB part 

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

        new_data.push({"brand" : brand_name,"rating" : brand_rate,"product" : brand_product_name,"price" :brand_product_price});
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
    const {client,db} = await connectToDatabase();
    const collection = db.collection('products');
    try 
    {
        const result = await collection.insertMany(new_data,{ ordered: false }); 
    }
    catch
    {
      console.log("The inserted data is already in it ")
    }
    const all = await collection.find({}).toArray(); // to avoid duplicates
    console.log(all.length.toString() + ' products in the database ');
  
    console.log("\n")
    console.log("\n")
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



async function myAsyncFunction() {
  const result = await query1("DEDICATED");;
  
}

myAsyncFunction();





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