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
