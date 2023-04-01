/* eslint-disable no-console, no-process-exit */
const brand = require('./eshops/brand.js');

async function sandbox (eshops = ['https://www.dedicatedbrand.com/en/men/news','https://www.montlimart.com','https://shop.circlesportswear.com/collections/collection-homme']) {
  for(const eshop of eshops)
  {
    try {
      console.log(`🕵️‍♀️  browsing ${eshop} eshop`);

      const products = await brand.scrape(eshop);

      console.log(products);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }
  console.log('done');
  process.exit(0);
}

const [,, eshops] = process.argv;

sandbox(eshops);
