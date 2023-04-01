const fetch = require('node-fetch');


var fs=require('fs');
var data = JSON.parse( fs.readFileSync('server/brands.json', 'utf8') )

console.log(data)
console.log(data.map(x => x.brand))

const link = 'https://shop.circlesportswear.com/en-gb/collections/collection-homme'

const regex = /https:\/\/(.+?)\.com/;
console.log(link.toLowerCase().includes('Circle Sportswear'.toLowerCase().replace(/\s/g, '')))

const brand_name = "Bonjour";

if(brand_name == "Bonjour1")
{
    return console.log("Toto and Titi behind the bars bro")
}


const test = "price : 2"

const test_d = JSON.parse("{"+test.replace("price","\"price\"")+"}")

console.log(test_d)