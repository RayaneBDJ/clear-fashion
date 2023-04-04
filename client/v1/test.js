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

const dict = [{ 1 : 2,2 : 1}]
console.log(typeof dict[0] )


/*const d1 = Date.parse("2012-11-01");
const d2 = Date.parse("2012-11-04");

if (d1 > d2) {
    
  console.log("Error!");
}*/
// Make a GET request to the API

fetch('http://localhost:8092/products')
  .then(response => response.json()) // Parse the response as JSON
  .then(data => {
    // The data variable now contains a JavaScript object or array
    // depending on the structure of the API response.
    // You can access the data and store it in a dictionary or manipulate it as needed.
    const myDataDictionary = {};
    
    data.forEach(item => {
      // For example, if the data is an array of objects with 'id' and 'name' properties,
      // you can store it in a dictionary using the 'id' as the key and the 'name' as the value:
      myDataDictionary[item.id] = item.name;
    });
    
    // You can then use the data dictionary in your code as needed.
    console.log(myDataDictionary);
  })
  .catch(error => {
    // Handle any errors that may occur.
    console.error(error);
  });