const ar = [2000,2010,1900];
function sort_price_asc(first, second) {
    return first - second;
  }  
console.log(ar.sort(sort_price_asc));


const today = new Date();
const d2 = new Date("2023-03-09");
d2.setDate(d2.getDate() + 2*7)

console.log(today);
console.log(d2);

var bool = false 

if ( today <= d2)
{
     bool = true 
}

console.log(bool)



/*const d1 = Date.parse("2012-11-01");
const d2 = Date.parse("2012-11-04");

if (d1 > d2) {
    
  console.log("Error!");
}*/