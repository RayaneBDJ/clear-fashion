const fetch = require('node-fetch');
const cheerio = require('cheerio');
const nodemon = require('nodemon');


var fs=require('fs');
var data = JSON.parse( fs.readFileSync('brands.json', 'utf8') );

//console.log(data);
const brands_name = data.map(x => x.brand);



/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = (data,brand_name) => {
  const $ = cheerio.load(data);

  if ( brand_name == "DEDICATED")
  {
    return $('.productList-container .productList')
    .map((i, element) => {
      const name = $(element)
        .find('.productList-title')
        .text()
        .trim()
        .replace(/\s/g, ' ');
      const price = parseInt(
        $(element)
          .find('.productList-price ')
          .text());
      const image = $(element)
          .find('.productList-image img')
          .attr('data-src');

      return {name, price, image};
    })
    .get();
  } else if ( brand_name == "Montlimart")
  {
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
  } else if ( brand_name == "Circle Sportswear")
  {
    return $('.product-grid-container .product-grid .grid__item .card__information')
    .map((i, element) => {
      const name = $(element)
        .find(' h3.card__heading')
        .text()
        .trim()
        .replace(/\s/g, ' ');
      const price = parseInt(
        $(element)
          .find(' .price .price__container .price__regular .money')
          .text()
          .replace('€','')
      );

      if(isNaN(price) == false )
      {
        return {name, price};
      }
    })
    .get();
  }

};



/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
module.exports.scrape = async url => {
  try {
    const response = await fetch(url);
    for(const brand_name of brands_name)
    {
    if (url.toLowerCase().includes(brand_name.toLowerCase().replace(/\s/g, '')))

      { if (response.ok) {
          const body = await response.text();

          return parse(body,brand_name);
        }
      }

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
//console.log(words);
var express=require('express');

var app=express();

var server=app.listen(3030,listening);

function listening(){
console.log("listening..");
}
app.use(express.static('website'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
