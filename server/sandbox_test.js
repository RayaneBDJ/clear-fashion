/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./eshops/circle.js');

async function sandbox (eshop = 'https://shop.circlesportswear.com/collections/collection-homme') {
    try {
      console.log(`🕵️‍♀️  browsing ${eshop} eshop`);

      const products = await dedicatedbrand.scrape(eshop);

      console.log(products);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  console.log('done');
  process.exit(0);
}

const [,, eshops] = process.argv;

sandbox(eshops);
