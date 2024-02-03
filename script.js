document.addEventListener("DOMContentLoaded", fetchAndDisplayData);

function fetchAndDisplayData() {
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448') 
        .then(response => response.json())
        .then(data => {
            
            displayProductDetails(data.product);
        })
        .catch(error => console.error('Error fetching product data:', error));
}

// store size in getSize 
var getSize=""
function handleSize(selectedSize) {
    getSize=selectedSize;
    console.log(getSize);
}
var getColor=""
function handleColor(selectedColor) {
    getColor=selectedColor;
    console.log(getColor);
}


function addToCart() {
    addToCartClicked = true;
    console.log(`Embrace Sideboard with ${getColor} and Size ${getSize} added to cart:`,addToCartClicked);
    renderagain();

    setTimeout(() => {
        removeFromCart();
      }, 3000);

    
}
function renderagain(){
    const extraDiv = document.createElement('div');
        extraDiv.className = 'extra';
        extraDiv.innerHTML = `<p>Embrace Sideboard with Color ${getColor} and Size ${getSize} added to cart </p>`;
        extra.appendChild(extraDiv);
}

function removeFromCart() {
    const extraContainer = document.getElementById('extra');
    extraContainer.innerHTML = ''; 
    addToCartClicked = false; 
  }




function displayProductDetails(product) {
    const productContainer = document.querySelector('.container');

    const firstOptionsObject = product.options[0];
    const secondOptionsObject = product.options[1];

    const Off = `${product.compare_at_price.slice(1)}` - `${product.price.slice(1)}`

    const percent = Math.floor(Off / `${product.compare_at_price.slice(1)}` * 100)

    return (
        
        productContainer.innerHTML = ` <div class="left">
    <img class="hero1" src="./img1.jpeg" alt="">
<div class="hero2">
${product.images.map(image => `
<img  class="hero-small" src="${image.src}" alt="Product Image">
`).join(' ')}
    
</div>
</div>
<div class="right">
<div class="r1">
    <div class="productVendor">${product.vendor}</div>
    <div class="producTitle">${product.title}</div>
</div>
<hr style="width: 100%; text-align: left; margin-left: 0; opacity: 0.5;">
<div class="prices">
    <div>
        <div class="price">${product.price}</div>
        <div class="originalPrice">${product.compare_at_price}</div>
    </div>
    <div class="discount">${percent}% off</div>
</div>
<hr style="width: 100%; text-align: left; margin-left: 0; opacity: 0.5;">

<div class="colContainer">
    <p>Choose a ${firstOptionsObject.name}</p>
    <div class="colorSection">
    ${firstOptionsObject.values.map(value => `<div  style="background-color: ${value[Object.keys(value)[0]]};  "class="chooseCol" onclick="handleColor('${Object.keys(value)[0]}')"> </div>`).join('')}
    
    </div>
    
    
    
</div>

<hr style="width: 100%; text-align: left; margin-left: 0; opacity: 0.5;">

<div>
<p>Choose a Size</p>
<form class="size" >
${secondOptionsObject.values.map(value => `
    
        <div class="sizeRadio" onclick="handleSize('${value}')">
            <input  class="textRadio" type="radio" name="color" $> ${value}
        </div>
            `).join('')}
       
    </form>
    
</div>
<div class="counter-head">
    <div id="counter-container">
        <div id="decrement" onclick="decrement()">-</div>
        <div id="counter">1</div>
        <div id="increment" onclick="increment()">+</div>
    </div>
    <button class="btnCart" onclick="addToCart()">Add to Cart</button>
</div>
<hr style="width: 100%; text-align: left; margin-left: 0; opacity: 0.5;">


<div id="extra"></div>
            
<div class="description">
${product.description}


</div>
</div>
`)
}





