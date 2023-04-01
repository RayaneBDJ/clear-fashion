const fetch = require('node-fetch');
const cheerio = require('cheerio');
const nodemon = require('nodemon')

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);

  return $('.container .products-list .product-miniature')
    .map((i, element) => {
      const name = $(element)
        .find('.product-miniature__title')
        .text()
        .trim()
        .replace(/\s/g, ' ');
      const price = parseInt(
        $(element)
          .find('.product-miniature__pricing')
          .text()
      );

      return {name, price};
    })
    .get();
};

/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
module.exports.scrape = async url => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const body = await response.text();

      return parse(body);
    }

    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};



var fs=require('fs');
var data=fs.readFileSync('brands.json', 'utf8');
var words=JSON.parse(data);
var bodyparser=require('body-parser');
console.log(words);
var express=require('express');

var app=express();

var server=app.listen(3030,listening);

function listening(){
console.log("listening..");
}
app.use(express.static('website'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());