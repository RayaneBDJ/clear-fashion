const API_URL = 'http://localhost:8092/products';

const loadProductsButton = document.getElementById('loadProducts');
loadProductsButton.addEventListener('click', loadProducts);

async function loadProducts() {
  const productCount = document.getElementById('productCount').value;
  const url = `${API_URL}?limit=${productCount}`;
  
  try {
    const response = await fetch(url);
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error(error);
  }
}

function displayProducts(products) {
  const productList = document.getElementById('productList');
  productList.innerHTML = '';
  
  products.forEach(product => {
    const li = document.createElement('li');
    li.textContent = `${product.product} - $${product.price}`;
    productList.appendChild(li);
  });
}
