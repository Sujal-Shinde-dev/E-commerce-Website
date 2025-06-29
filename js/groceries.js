
const productList = [
    { name: "Eggs", desc: "Farm fresh eggs - 12 pieces", price: "2.50" },
    { name: "Apples", desc: "Red apples - 1kg", price: "3.00" },
    { name: "Rice", desc: "Basmati rice - 1kg", price: "2.20" },
    { name: "Sugar", desc: "White sugar - 1kg", price: "1.10" },
    { name: "Salt", desc: "Table salt - 1kg", price: "0.80" },
    { name: "Potatoes", desc: "Fresh potatoes - 2kg", price: "2.40" },
    { name: "Onions", desc: "Red onions - 1kg", price: "1.70" },
    { name: "Tomatoes", desc: "Fresh tomatoes - 1kg", price: "2.10" },
    { name: "Bananas", desc: "Bananas - 1 dozen", price: "1.80" },
    { name: "Chicken", desc: "Fresh chicken - 1kg", price: "5.00" },
    { name: "Cheese", desc: "Cheddar cheese - 200g", price: "2.60" },
    { name: "Butter", desc: "Salted butter - 250g", price: "1.90" },
    { name: "Carrots", desc: "Fresh carrots - 1kg", price: "1.50" },
    { name: "Spinach", desc: "Fresh spinach - 500g", price: "1.20" },
    { name: "Yogurt", desc: "Plain yogurt - 500g", price: "1.70" },
    { name: "Orange Juice", desc: "Fresh orange juice - 1 litre", price: "2.80" },
    { name: "Pasta", desc: "Spaghetti pasta - 500g", price: "1.60" },
    { name: "Tea", desc: "Black tea bags - 100 pieces", price: "3.50" }
];

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('grocery');
    if (container) {
        container.innerHTML = productList.map(product => `
            <div class="product-item">
                <h2>${product.name}</h2>
                <p>${product.desc}</p>
                <span class="price">Price: $${product.price}</span>
                <button class="purchase-btn" product-name="${product.name}" product-price="${product.price}">Add to Cart</button>
            </div>
        `).join('');
    }
});
const products = [];
document.addEventListener('DOMContentLoaded',   function() {
    const purchaseButtons = document.getElementsByClassName('purchase-btn');
    for (let i = 0; i < purchaseButtons.length; i++) {
        purchaseButtons[i].addEventListener('click', function() {
            alert('Item added to cart!');
            products.push({
                name: this.getAttribute('product-name'),
                price: this.getAttribute('product-price')
            });
            console.log(products); // Log products after adding a new item

        });
    }
}
);
    