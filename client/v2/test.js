fetch('https://clear-fashion-ashen-six.vercel.app/products')
  .then(response => response.json())
  .then(products => {
    const productList = document.getElementById('product-list');

    products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.innerHTML = `
        <h2>${product.name}</h2>
        <p>${product.brand}</p>
        <p>${product.price} euros</p>
      `;
      productList.appendChild(productDiv);
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
