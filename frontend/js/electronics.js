const productList = [
    {
        name: "Laptop",
        image: "../images/laptop.jpg",
        description: "High-performance laptop for work and play.",
        price: "$899"
    },
    {
        name: "Smartphone",
        image: "../images/smartphone.jpg",
        description: "Latest smartphone with advanced features.",
        price: "$699"
    },  
    {
        name: "Headphones",
        image: "../images/headphones.jpg",
        description: "Noise-cancelling wireless headphones.",
        price: "$199"
    },
    {
        name: "Smartwatch",
        image: "../images/smartwatch.jpg",
        description: "Track your fitness and notifications on the go.",
        price: "$149"
    },
    {
        name: "Tablet",
        image: "../images/tablet.jpg",
        description: "Portable tablet for entertainment and productivity.",
        price: "$299"
    },
    {
        name: "Camera",
        image: "../images/camera.jpg",
        description: "Capture stunning photos and videos.",
        price: "$499"
    },
    {
        name: "Bluetooth Speaker",
        image: "../images/bluetooth-speaker.jpg",
        description: "Wireless speaker with deep bass and clear sound.",
        price: "$89"
    },
    {
        name: "Gaming Console",
        image: "../images/gaming-console.jpg",
        description: "Next-gen gaming experience for everyone.",
        price: "$399"
    },
    {
        name: "Power Bank",
        image: "../images/powerbank.jpg",
        description: "Portable charger for your devices on the go.",
        price: "$39"
    },
    {
        name: "Monitor",
        image: "../images/monitor.jpg",
        description: "Ultra HD monitor for crisp visuals.",
        price: "$249"
    }
];
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('card-container');
    if (container) {
        container.innerHTML = productList.map(product => `
            <div class="card">
                <img src="${product.image}" alt="${product.name}">
                <h3 class="product-name">${product.name}</h3>
                <p>${product.description}</p>
                <span class="price">${product.price}</span>
                <button class="purchase-btn" data-name="${product.name}" data-price="${product.price}">Purchase</button>
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
                name: this.getAttribute('data-name'),
                price: this.getAttribute('data-price')
            });
            console.log(products); // Log products after adding a new item

        });
    }
}
);
document.getElementById('search-button').addEventListener('click', function() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const cards = document.querySelectorAll('.card');
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
                const cards = document.querySelectorAll('.card');
                cards.forEach(card => {
                    card.style.display = 'flex';
                });
            }
        });
    }
});