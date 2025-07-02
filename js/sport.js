const sportList = [
    { name: "Football", desc: "Standard size 5 football", price: "15.00", image: "images/football.jpg" },
    { name: "Basketball", desc: "Official size basketball", price: "18.00", image: "images/basketball.jpg" },
    { name: "Tennis Racket", desc: "Lightweight tennis racket", price: "25.00", image: "images/tennis_racket.jpg" },
    { name: "Badminton Shuttlecock", desc: "Pack of 6 shuttlecocks", price: "6.00", image: "images/badminton_shuttlecock.jpg" },
    { name: "Cricket Bat", desc: "English willow cricket bat", price: "40.00", image: "images/cricket_bat.jpg" },
    { name: "Yoga Mat", desc: "Non-slip yoga mat", price: "12.00", image: "images/yoga_mat.jpg" },
    { name: "Skipping Rope", desc: "Adjustable skipping rope", price: "5.00", image: "images/skipping_rope.jpg" },
    { name: "Dumbbells", desc: "Pair of 5kg dumbbells", price: "20.00", image: "images/dumbbells.jpg" },
    { name: "Table Tennis Paddle", desc: "Professional paddle", price: "10.00", image: "images/table_tennis_paddle.jpg" },
    { name: "Volleyball", desc: "Outdoor volleyball", price: "14.00", image: "images/volleyball.jpg" },
    { name: "Hockey Stick", desc: "Carbon fiber hockey stick", price: "30.00", image: "images/hockey_stick.jpg" },
    { name: "Golf Balls", desc: "Pack of 12 golf balls", price: "22.00", image: "images/golf_balls.jpg" },
    { name: "Swimming Goggles", desc: "Anti-fog swimming goggles", price: "8.00", image: "images/swimming_goggles.jpg" },
    { name: "Boxing Gloves", desc: "Pair of 12oz boxing gloves", price: "28.00", image: "images/boxing_gloves.jpg" },
    { name: "Baseball Cap", desc: "Adjustable baseball cap", price: "7.00", image: "images/baseball_cap.jpg" }
];

document.addEventListener('DOMContentLoaded', function() {
    const sportContainer = document.getElementById('sport');
    if (sportContainer) {
        sportContainer.innerHTML = sportList.map(product => `
            <div class="product-item">
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.desc}</p>
                <span class="price">Price: $${product.price}</span>
                <button class="purchase-btn" product-name="${product.name}" product-price="${product.price}">Add to Cart</button>
            </div>
        `).join('');
    }
});

const sportProducts = [];
document.addEventListener('DOMContentLoaded', function() {
    const sportPurchaseButtons = document.getElementsByClassName('purchase-btn');
    for (let i = 0; i < sportPurchaseButtons.length; i++) {
        sportPurchaseButtons[i].addEventListener('click', function() {
            alert('Item added to cart!');
            sportProducts.push({
                name: this.getAttribute('product-name'),
                price: this.getAttribute('product-price')
            });
            console.log(sportProducts); // Log sport products after adding a new item
        });
    }
});