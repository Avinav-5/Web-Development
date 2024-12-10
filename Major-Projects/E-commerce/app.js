// Function to add an item to the cart
function addToCart(productName, price, productImage) {
    console.log('Adding to cart:', productName, price, productImage);
    
    // 1. Add the item to localStorage (client-side)
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if item already exists
    } else {
        cart.push({
            name: productName,
            price: price,
            quantity: 1,
            image: productImage
        });
    }


    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} has been added to your cart`);

    // 2. Sync with the server (server-side)
    const formData = new FormData();
    formData.append('product_name', productName);
    formData.append('price', price);
    formData.append('image', productImage);

    fetch('/E-commerce/Php/add_to_cart.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log("Item synced with server: " + data.message);
        } else {
            console.error("Server sync error: " + data.message);
        }
    })
    .catch(error => console.error('Error syncing with server:', error));
}

// Function to display cart items in the cart page
function displayCartItems() {
    const cartContainer = document.getElementById("cart-container");
    const totalContainer = document.getElementById('total-container');

    if (!cartContainer || !totalContainer) {
        console.error("Cart container or total container not found in the DOM.");
        return;
    }

    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Clear existing cart display
    cartContainer.innerHTML = '';

    let total = 0;

    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');

        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="100" height="100">
            <div class="item-details">
                <h3>${item.name}</h3>
                <div class="price">Rs ${item.price.toFixed(2)}</div>
                <input type="number" value="${item.quantity}" min="1" class="quantity-input" onchange="updateQuantity('${item.name}', this.value)">
                <button class="remove-btn">Remove</button>
            </div>
        `;

        itemElement.querySelector('.remove-btn').addEventListener('click', () => {
            console.log(`Remove button clicked for: ${item.name}`); // Debugging log
            removeFromCart(item.name);
        });


        cartContainer.appendChild(itemElement);
        total += item.price * item.quantity;  // Calculate total
    });

    // Update the total price
    totalContainer.querySelector('h3').innerText = `Total: Rs ${total.toFixed(2)}`;
}

// Function to remove item from the cart (client-side and server-side)
function removeFromCart(productName) {
    console.log("removeFromCart triggered for:", productName);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productToRemove = cart.find(item => item.name === productName);
    if (!productToRemove) {
        console.error('Item not found in cart');
        return;
    }

    // Remove item from localStorage
    cart = cart.filter(item => item.name !== productName);
    localStorage.setItem("cart", JSON.stringify(cart));

    // Re-render cart on the page
    displayCartItems();

    // Now, sync the removal with the server-side
    deleteFromCart(productName);  // Use product name for deletion
}

// Function to delete an item from the cart on the server-side
function deleteFromCart(productName) {
    console.log("Attempting to delete item from server:", productName);

    fetch('/E-commerce/Php/remove_from_cart.php', {  // Correct URL for deletion
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            product_name: productName  // Only sending product_name for deletion
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message);
            console.log('Item removed from server successfully');
        } else {
            alert('Error: ' + data.message);
            console.error('Server error message:', data.message);
        }
    })
    .catch(error => console.error('Error syncing with server:', error));
}


// Function to update quantity in the cart (client-side and server-side)
function updateQuantity(productName, newQuantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Find the product and update the quantity
    cart.forEach(item => {
        if (item.name === productName) {
            item.quantity = Math.max(parseInt(newQuantity, 10), 1); // Prevent quantity from going below 1
        }
    });

    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Re-render the cart items with updated quantity
    displayCartItems();

    // Sync the updated quantity with the server-side
    syncQuantityWithServer(productName, newQuantity);
}

// Function to sync updated quantity with server
function syncQuantityWithServer(productName, newQuantity) {
    console.log("Syncing updated quantity for:", productName, "New Quantity:", newQuantity);

    const formData = new URLSearchParams();
    formData.append('product_name', productName);
    formData.append('quantity', newQuantity);

    fetch('/E-commerce/Php/update_cart.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log("Quantity updated on server:", data.message);
        } else {
            console.error("Server sync error: " + data.message);
        }
    })
    .catch(error => console.error('Error syncing with server:', error));
}


// Function to clear the cart
function clearCart() {
    // Clear the cart from localStorage
    localStorage.removeItem("cart");

    // Re-render the empty cart
    displayCartItems();
}

// Initialize the cart when the cart page is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Render the cart items on page load
    displayCartItems();

    // Add event listener to the clear cart button if it exists
    const clearCartBtn = document.querySelector('#clear-cart-btn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }
});
