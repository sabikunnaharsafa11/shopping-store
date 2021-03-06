const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
  // fetch('../js/data.json')
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    // console.log(product)
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product  m-2 card-item rounded">
      <div style="width: 100%; border-radius: 10px; padding-top: 10px; padding-bottom: 10px; background: white;">
    <img class="product-image" src=${image}></img>
      </div>
      <h4 style="font-weight: bold;">${product.title}</h4>
      <p>Category: ${product.category}</p>
      <h4 style="color: #FF8A65; font-weight: bold;">Price: $${product.price}</h4>
      <h6 style="font-weight: bold;"> <i class="fas fa-star" style="color: #F9A825;"></i> ${product.rating.rate}  &nbsp &nbsp <i class="fas fa-users" style="color: #2979FF;"></i> ${product.rating.count}</h6>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-primary">add to cart</button>
      <button id="details-btn" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseInt(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value.toFixed(2));
  const total = convertedOldPrice + convertPrice;
  // document.getElementById(id).innerText = Math.round(total);
  document.getElementById(id).innerText = parseFloat(total.toFixed(2));
  updateTotal();
};

// set innerText function
const setInnerText = (id, value) => {
  // document.getElementById(id).innerText = Math.round(value);
  document.getElementById(id).innerText = parseFloat(value.toFixed(2));
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
