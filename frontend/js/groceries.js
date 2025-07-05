const productList = [
    { name: "Eggs", desc: "Farm fresh eggs - 12 pieces", price: "2.50", image: "images/eggs.jpg" },
    { name: "Apples", desc: "Red apples - 1kg", price: "3.00", image: "images/apples.jpg" },
    { name: "Rice", desc: "Basmati rice - 1kg", price: "2.20", image: "images/rice.jpg" },
    { name: "Sugar", desc: "White sugar - 1kg", price: "1.10", image: "images/sugar.jpg" },
    { name: "Salt", desc: "Table salt - 1kg", price: "0.80", image: "images/salt.jpg" },
    { name: "Potatoes", desc: "Fresh potatoes - 2kg", price: "2.40", image: "images/potatoes.jpg" },
    { name: "Onions", desc: "Red onions - 1kg", price: "1.70", image: "images/onions.jpg" },
    { name: "Tomatoes", desc: "Fresh tomatoes - 1kg", price: "2.10", image: "images/tomatoes.jpg" },
    { name: "Bananas", desc: "Bananas - 1 dozen", price: "1.80", image: "images/bananas.jpg" },
    { name: "Chicken", desc: "Fresh chicken - 1kg", price: "5.00", image: "images/chicken.jpg" },
    { name: "Cheese", desc: "Cheddar cheese - 200g", price: "2.60", image: "images/cheese.jpg" },
    { name: "Butter", desc: "Salted butter - 250g", price: "1.90", image: "images/butter.jpg" },
    { name: "Carrots", desc: "Fresh carrots - 1kg", price: "1.50", image: "images/carrots.jpg" },
    { name: "Spinach", desc: "Fresh spinach - 500g", price: "1.20", image: "images/spinach.jpg" },
    { name: "Yogurt", desc: "Plain yogurt - 500g", price: "1.70", image: "images/yogurt.jpg" },
    { name: "Orange Juice", desc: "Fresh orange juice - 1 litre", price: "2.80", image: "images/orange_juice.jpg" },
    { name: "Pasta", desc: "Spaghetti pasta - 500g", price: "1.60", image: "images/pasta.jpg" },
    { name: "Tea", desc: "Black tea bags - 100 pieces", price: "3.50", image: "images/tea.jpg" }
];

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('grocery');
    if (container) {
        container.innerHTML = productList.map(product => `
            <div class="product-item">
                <img src="${product.image}" alt="${product.name}">
                <h2 class="product-name">${product.name}</h2>
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
document.getElementById('search-button').addEventListener('click', function() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const cards = document.querySelectorAll('.product-item');
    cards.forEach(card => {
        const productName = card.querySelector('.product-name').textContent.toLowerCase();
        if (productName.includes(searchInput)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            if (this.value === '') {
                const cards = document.querySelectorAll('.product-item');
                cards.forEach(card => {
                    card.style.display = 'flex';
                });
            }
        });
    }
});