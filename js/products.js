import { productArray } from "./constanst/productlist.js";
const productsContainer = document.querySelector(".product");
const cart = document.querySelector(".cart");
const cartlist = document.querySelector(".cart-list");
const totalContainer = document.querySelector(".total");
let cartArray = [];

productArray.forEach(function(product){
    productsContainer.innerHTML +=
    `
    <div class="gamecard">
      <h2>${product.name}</h2>
      <img src="${product.image}" alt="${product.name}" data-product="${product.id}"></img>
      <div class="product-price">${product.symbol}${product.price}</div>
      <button class="product-button" data-product="${product.id}">Add to cart</button>
    </div>
    `
  });



function showCart(cartItems){
  cart.style.display ="flex";
  cartlist.innerHTML = "";
  let total = 0;
  cartItems.forEach(function(cartElement){
    total += cartElement.price;
    cartlist.innerHTML +=
    `<div class="cart-item">
      <h4>${cartElement.name}</h4>
      <div style="background-image: url('${cartElement.image}')" class="cart-image"</div>
      </div>
      `
  })
  totalContainer.innerHTML = `Total: ${total}`;
};


const baseUrl = "http://petterbakke.one/Gamehub/wordpress/wp-json/wc/store/products";
const corsUrl = "https://noroffcors.herokuapp.com/";
const corsEnabledUrl = corsUrl + baseUrl;

async function getProducts(url){
  const response = await fetch(url);
  const products = await response.json();
  products.forEach(function(product){
    productsContainer.innerHTML += `
    
    <div class="gamecard">
      <h2>${product.name}</h2>
      <img src="${product.images[0].src}" alt="${product.name}" data-product="${product.id}"></img>
      <div class="product-price">${product.prices.currency_symbol}${product.prices.price}</div>
      <button class="product-button" data-product="${product.id}">Add to cart</button>
    </div>
    `
    let tempObject = {}
    tempObject.name = product.name;
    tempObject.id =  `${product.id}`;
    tempObject.description = product.description;
    tempObject.image = product.images[0].src;
    tempObject.symbol = product.prices.currency_symbol;
    tempObject.price = parseFloat(product.prices.price);
    
    productArray.push(tempObject)
  })
  
  const buttons = document.querySelectorAll(".product-button");
  buttons.forEach(function(button){
    button.onclick = function(event){
    
      const itemToAdd = productArray.find(item => item.id === event.target.dataset.product);
      cartArray.push(itemToAdd);
      showCart(cartArray);
      console.log(cartArray);
      localStorage.setItem("cartList", JSON.stringify(cartArray));
    }
  });


  const imgs = document.querySelectorAll(".gamecard img")

  imgs.forEach(function(img){
    img.addEventListener("click",function(event){
      console.log(event.target.dataset.product);
      const prod = productArray.find(item => item.id === event.target.dataset.product);
      window.location.href = `specific.html?name=${prod.name}&img=${prod.image}&description=${prod.description}&price=${prod.price}&symbol=${prod.symbol}`
    })

  })
};

getProducts(corsEnabledUrl);