const cartItems = JSON.parse(localStorage.getItem("cartList"));
const cartContainer = document.querySelector(".cart-list");
const totalContainer = document.querySelector(".total");

let total = 0;
cartItems.forEach(function(cartElement){
  total += cartElement.price;
  console.log(total);
  cartContainer.innerHTML +=
  `<div class="cart-item">
    <h4>${cartElement.name}</h4>
  </div>
  `
})
totalContainer.innerHTML = `Total: ${total}`;