
const containersheet = document.getElementById("container-sheet")
const cartcontainer = document.getElementById("cartContainer");
const productcontainer =document.getElementById('productcontainer')
const feedback = document.getElementById("feedback")
const totalprice = document.getElementById("totalprice")
const clearcart = document.getElementById("clearcart")
const sortCartBtn = document.getElementById("sortcartbyprice");
const products = [
  {
    id: 1,
    name: "Laptop",
    price: 50000,
  },
  {
    id: 2,
    name: "Phone",
    price: 20000,
  },
  {
    id: 3,
    name: "Tablet",
    price: 5000,
  },
  {
    id: 4,
    name: "Smartwatch",
    price: 1000,
  },
  {
    id: 5,
    name: "Headphones",
    price: 500,
  },
];
const cart = [];

products.forEach(function (product) {
  //console.log(products)
//   const productRow = `<div class = "product-row">
//   <p>${product.name} - Rs. ${product.price}</p>
//   <button>Add to cart</button>`
//  productcontainer.insertAdjacentHTML("beforeend",productRow)
const {id,name,price} = product;
const divElement = document.createElement("div");
divElement.className ="product-row";
divElement.innerHTML = `<p>${name} - Rs. ${price}</p>
 <button onclick="addToCart(${id})">Add to cart</button>`
 productcontainer.appendChild(divElement)
})

function addToCart(id) {
  feedback.style.display="block";
//check if the product is available in the cart
const isproductavailable = cart.some(function (product) {
  return product.id === id; 
})
console.log("is product is available", isproductavailable )
if (isproductavailable) {
 updateuserfeedback(`item is already added in the cart`,"error")
  return 
}
  console.log(cart)
 //console.log("iam clicking",id)
 
  const ProductToAdd = products.find(function (product) {
     return product.id === id;
    })
cart.push(ProductToAdd)
console.log(ProductToAdd)
renderCartdetails()


// feedback.textContent =`${name} is added to the cart`;
updateuserfeedback(`${ProductToAdd.name} is added to the cart`,"success");
}

function renderCartdetails() {
cartcontainer.innerHTML =""
cart.forEach(function (product) {
const{id,name,price}=product;

const cartitemRow = `<div class = "product-row">
<p>${name} - Rs. ${price}</p>
<button onclick="removeFromCart(${id})">Remove</button>`
cartcontainer.insertAdjacentHTML("beforeend",cartitemRow)
}) 
// let totalprice = 0;
// for(let i=0; i<cart.length; i++){
//   totalprice = totalprice+ cart[i].price;
//   }
//   document.getElementById("totalprice").textContent = `Rs.${totalprice}`;
const totalprice = cart.reduce(function (accum, cur) {
  return accum+cur.price;
},0)
 document.getElementById("totalprice").textContent = `Rs.${totalprice}`;
}

function removeFromCart(id) {
  console.log(id);

  const productIndex = cart.findIndex(function (product) {
    return product.id === id;
  });

  if (productIndex !== -1) {
    const removedProduct = cart[productIndex];

    cart.splice(productIndex, 1);

    updateuserfeedback(
      `${removedProduct.name} removed from the cart`,
      "error"
    );

    renderCartdetails();
  }
}

let timerid;
function updateuserfeedback(msg, type) {
  clearTimeout(timerid);

  feedback.style.display = "block";

  if (type === "success") {
    feedback.style.backgroundColor = "green";
  }

  if (type === "error") {
    feedback.style.backgroundColor = "red";
  }

  feedback.textContent = msg;

  timerid = setTimeout(function () {
    feedback.style.display = "none";
  }, 3000);
}

clearcart.addEventListener("click", function (value) {
  console.log("clear cart button");
  console.log("cart", cart)
  cart.length = 0;
  renderCartdetails()
  updateuserfeedback("Cart is cleared","success")
})

sortCartBtn.addEventListener("click", function () {
  cart.sort(function (a, b) {
    return a.price - b.price;
  });

  renderCartdetails();

  updateuserfeedback(
    "Cart sorted by price",
    "success"
  );
});


// //Rough 
// const Testingbtn = document.getElementById("testingbutton")
// Testingbtn.addEventListener("click", function (value) {
//   console.log("testing")
  
// })//
