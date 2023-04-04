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

  const API_URL = 'http://localhost:8092/products';
  const loadProductsButton = document.getElementById('loadProducts');
  const loadIndicatorsButton = document.getElementById('indicators');
  const productCountElement = document.getElementById('product-count');


  // select functions
  //loadProductsButton.addEventListener('click', loadProducts);


  // functions to load data 
  const [productCount, setProductCount] = useState(10);
  const [products, setProducts] = useState([]);
  const [allproducts, setAllProducts] = useState([]);


// Indicators 

  

  const Indicators = React.memo(({ allproducts }) => {


    // number of brands 
    const brands = [];

    for (const element of allproducts) 
    {
      brands.push(element.brand);

    }
    const brands_unique = brands.filter((item, i, ar) => ar.indexOf(item) === i);



    // fonction that calculates p50,p90,p95 value price value of allproducts


    return (
      <div>
        <p>Number of products: <span>{allproducts.length}</span></p>
        <div>
          <span>Number of brands: </span>
          <span id="nbBrands">{brands_unique.length}</span>
        </div>
        <div>
          <span>p50 price value: </span>
          <span>0</span>
        </div>
        <div>
          <span>p90 price value</span>
          <span>0</span>
        </div>
        <div>
          <span>p95 price value</span>
          <span>{typeof allproducts}</span>
        </div>
        <div>
          <span>Last released date</span>
          <span>2020-01-01</span>
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
  const ProductList = React.memo(({ products }) => {
    return (
      <div class="productList">
      {products.map((product, index) => (
        <div class = "product">
          <a href={product.image_link}>
            <img class = "img-product" src={product.image} alt={product.product} />
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
    const url = `${API_URL}?limit=${productCount}`;
  
    try {
      console.log(`Fetching products from ${url}...`);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch products (status ${response.status})`);
      }
      const data = await response.json();
      console.log(`Fetched ${data.length} products`);
      setProducts(data);
    } catch (error) {
      console.error(error);
    }

  }


  function handleProductCountChange(event) {
    setProductCount(event.target.value);
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
      <div id="page">
        <label for="page-select">Go to page:</label>
        <select name="page" id="page-select"> </select>
      </div>
      <div id="filters">
        <span>By reasonable price</span>
        <span>By recently released</span>
        <div id="brand">
          <label for="brand-select">By brands:</label>
          <select name="brand" id="brand-select"> </select>
        </div>
      </div>
      <div id="sort">
        <label for="sort-select">Sort:</label>
        <select name="sort" id="sort-select">
          <option value="price-asc">Cheaper</option>
          <option value="price-desc">Expensive</option>
          <option value="date-asc">Recently released</option>
          <option value="date-desc">Anciently released</option>
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
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the logos to look directly into the brands shops
      </p>
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
