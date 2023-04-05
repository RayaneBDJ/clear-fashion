import { useState } from 'react'
import React from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  
    // instantiate the selectors
  const selectShow = document.querySelector('#show-select');
  const selectPage = document.querySelector('#page-select');
  const sectionProducts = document.querySelector('#products');
  const spanNbProducts = document.querySelector('#nbProducts');

  const API_URL = 'http://localhost:8092/';
  const loadProductsButton = document.getElementById('loadProducts');
  const loadIndicatorsButton = document.getElementById('indicators');
  const productCountElement = document.getElementById('product-count');


  // select functions
  //loadProductsButton.addEventListener('click', loadProducts);


  // Values to chose
  const [productCount, setProductCount] = useState(10);
  const [brand, setBrand] = useState([]);
  const [products, setProducts] = useState([]);
  const [allproducts, setAllProducts] = useState([]);
  const [priceReasonable, setPriceReasonable] = useState(1000);
  const [sort, setSortPrice] = useState('');
  const [dataASC, setSortPriceASC] = useState([]);
  const [dataDESC, setSortPriceDESC] = useState([]);


// Indicators 

  

  const Indicators = React.memo(({ allproducts }) => {


    // number of brands 
    const brands = [];

    for (const element of allproducts) 
    {
      brands.push(element.brand);

    }
    const brands_unique = brands.filter((item, i, ar) => ar.indexOf(item) === i);



    // create all the fonction that calculates p50,p90,p95 value price value of allproducts
      
      function sort_price_asc(first, second) {
        return first.price - second.price;
      }
      const all_products_sorted = allproducts.sort(sort_price_asc);
      var index_50 = (allproducts.length - 1) * 0.50;
      var index_90 = (allproducts.length - 1) * 0.90;
      var index_95 = (allproducts.length - 1) * 0.95;

      var result_p50 = 0;
      var result_p90 = 0;
      var result_p95 = 0;

      if(index_90 > 1 & index_95 > 1 & index_50 > 1)
      {
          result_p50 = all_products_sorted[Math.floor(index_50)].price;
          result_p90 = all_products_sorted[Math.floor(index_90)].price;
          result_p95 = all_products_sorted[Math.floor(index_95)].price;

      }

      /*var result;
      if (Math.floor(index) === index) {
        result = (arr[index].price + arr[index + 1].price) / 2;
      } else {
        result = arr[Math.floor(index)].price;
      }*/

    /*result_p50 = percentile(allproducts, 0.5);
    result_p90 = percentile(allproducts, 0.9);
    result_p95 = percentile(allproducts, 0.95);*/


    return (
      <div>
        <p>Number of products: <span>{allproducts.length}</span></p>
        <div>
          <span>Number of brands: </span>
          <span id="nbBrands">{brands_unique.length}</span>
        </div>
        <div>
          <span>p50 price value: </span>
          <span>{result_p50} euros</span>
        </div>
        <div>
          <span>p90 price value: </span>
          <span>{result_p90} euros</span>
        </div>
        <div>
          <span>p95 price value: </span>
          <span>{result_p95} euros</span>
        </div>
      </div>
    );
  });
  

  async function indicators() {
    const url = `${API_URL}`;
  
    try {
      console.log(`Fetching products from ${url}...`);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch products (status ${response.status})`);
      }
      const data = await response.json();
      console.log(`Fetched ${data.length} products`);
      setAllProducts(data);
    } catch (error) {
      console.error(error);
    }
    

  }



  // Filters Functions
  const ProductList = React.memo(({ products}) => {

  
    return (
      <div class="productList">
        {products.map((product, index) => (
          <div class="product" key={index}>
            <a href={product.image_link}>
              <img class="img-product" src={product.image} alt={product.product} />
            </a>
            <h5>{product.product}</h5>
            <p>{product.brand}</p>
            <p>{product.price} euros</p>
          </div>
        ))}
      </div>
    );
  });
  
  async function loadProducts() {

  
    let brandParam = brand;
    let sortParam = sort;

    if (brand === "default") {
      brandParam = "";
    }
    if(sort === "price-asc"){
      sortParam = "asc";
    }
    if(sort === "price-desc")
    {
      sortParam = "desc";
    }
    if(sort === "default")
    {
      sortParam = "";
    }
    const url = `${API_URL}search?limit=${productCount}&price=${priceReasonable}&brand=${brandParam}&sortBy=price&sortOrder=${sortParam}`;
    try {
      console.log(`Fetching products from ${url}...`);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch products (status ${response.status})`);
      }
      const data = await response.json();
      console.log(`Fetched ${data.length} products`);
  
      const dataASC = data.slice().sort((a, b) => a.price - b.price);
      const dataDESC = data.slice().sort((a, b) => b.price - a.price);
  
      setProducts(data);
      setSortPriceASC(dataASC);
      setSortPriceDESC(dataDESC);
      
    } catch (error) {
      console.error(error);
    }
  }
  



  function handleProductCountChange(event) {
    setProductCount(event.target.value);
  }

  function handleBrandFilter(event) {
    setBrand(event.target.value);
    // TODO: Appeler loadProducts() avec le nouveau filtre
  }

  function handlePriceReasonableChange(event) {
    setPriceReasonable(event.target.value);
  }

  function handlePriceFilter(event) {
    setSortPrice(event.target.value);
  }




  return (
    <div className="App">
      <h1 class = "Title">Our Favorite Eco Brands</h1>
      <div>
        <a href="https://www.dedicatedbrand.com/en/?gclid=Cj0KCQjw8qmhBhClARIsANAtbodThBnuYWkCkuQx-n9QL8xF1AN8ezZcoGH_PWIFPgsVeI2QXF1-BhMaAtxHEALw_wcB" target="_blank">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIF9qLaRF2R0xegIMq6LnpO0d3da4ziG_qMYdh0XHu8g&s" className="logo dedicated" alt="Dedicated brand shop" />
        </a>
        <a href="https://www.montlimart.com/" target="_blank">
          <img src="https://www.commeuncamion.com/content/uploads/2018/03/montlimart-logo-2020.png" className="logo montlimart" alt="Montlimart brand shop" />
        </a>
        <a href="https://en.circlesportswear.com/" target="_blank">
          <img src="https://yt3.googleusercontent.com/ytc/AL5GRJUVHeYv97HhVA57gZnJRtGRickHeLepNGEqAskW=s900-c-k-c0x00ffffff-no-rj" className= "logo circle" alt="Circle SportWear brand shop"/>

        </a>
      </div>
    <div class ="container">
      <section id="options" >
      <h2>Filters</h2>
      <button class = "load-button" onClick={loadProducts}>Load Products</button>
      <p></p>
      <div>
        <label htmlFor="productCount">Number of Products:</label>
        <input type="number" id="productCount" min="1" max="100" value={productCount} onChange={handleProductCountChange} />
      </div>
      <div id="filters">
        <div id="brand">
          <label for="brand-select">By brands: </label>
          <select name="brand" id="brand-select" onChange={handleBrandFilter} >
            <option value="default">Default</option>
            <option value="dedicated">Dedicated</option>
            <option value="montlimart">Montlimart</option>
            <option value="circle">Circle+Sportswear</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor='priceReasonable' >By reasonable price: </label>
        <input type="number" id="priceReasonable" min="1" max="150" value={priceReasonable} onChange={handlePriceReasonableChange} />
      </div>
      <div id="sort">
        <label for="sort-select">Sort: </label>
        <select name="sort" id="sort-select" onChange={handlePriceFilter}>
          <option value="default">Default</option>
          <option value="price-asc">Cheaper</option>
          <option value="price-desc">Most Expensive</option>
        </select>
      </div>

      </section>
    <section id="indicators">
      <h2>Indicators</h2>
      <div>
        <button class = "load-button" onClick={indicators}>Load Indicators</button>
      </div>
      <div>
        <Indicators allproducts={allproducts} />
      </div>
    </section>
    </div>

      <div className="card">
      <p className="read-the-docs">
        Click on the logos to look directly into the brands shops
      </p>
      </div>
      <section id="products">
        <h1>Products</h1>
        <div className="productList" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <ProductList products={products} />
        </div>
      </section>

    </div>
  )
}

export default App
