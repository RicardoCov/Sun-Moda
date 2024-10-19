const cartItems = document.getElementById('cartItems');
const clearCartBtn = document.getElementById('clearCart');
const totalAmountElem = document.getElementById('totalAmount');

// Precios de los productos
const productPrices = {
    "PlayeraNegra": 20,
    "PantalónAzul": 25,
    "PantalónCargo": 30,
    "Converses": 50,
    "Anillo": 15,
    "PlayeraTirantes": 25
};

// Función para actualizar el total
function updateTotal() {
    let total = 0;
    const subtotals = document.querySelectorAll('.subtotal');
    subtotals.forEach(subtotalElem => {
        total += parseFloat(subtotalElem.textContent);
    });
    totalAmountElem.textContent = total.toFixed(2);
}

// Función para añadir productos al carrito
function addToCart(productName, category) {
    const price = productPrices[productName];
    
    const row = document.createElement('tr');
    
    // Crear la fila del producto en el carrito
    row.innerHTML = 
        `<td>${productName}</td>
        <td>${category}</td>
        <td><input type="number" value="1" class="form-control quantity-input" min="1" id="quantity-${productName.replace(/\s+/g, '-')}"></td>
        <td>$<span id="price-${productName.replace(/\s+/g, '-')}">${price}</span></td>
        <td>$<span class="subtotal" id="subtotal-${productName.replace(/\s+/g, '-')}">${price}</span></td>
        <td><button class="btn btn-danger btn-sm remove-btn">Eliminar</button></td>`;
    
    cartItems.appendChild(row);

    // Actualizar subtotal cuando cambie la cantidad
    const quantityInput = row.querySelector('.quantity-input');
    quantityInput.addEventListener('input', function() {
        const quantity = parseInt(this.value);
        const subtotalElem = row.querySelector('.subtotal');
        const newSubtotal = quantity * price;
        subtotalElem.textContent = newSubtotal.toFixed(2);
        updateTotal();
    });

    // Eliminar producto del carrito
    row.querySelector('.remove-btn').addEventListener('click', function() {
        row.remove();
        updateTotal();
    });

    // Actualizar el total cuando se añade un nuevo producto
    updateTotal();

    // Mostrar alerta al agregar un producto
    alert(`${productName} ha sido agregado al carrito.`);
}

// Event listener para limpiar el carrito
clearCartBtn.addEventListener('click', () => {
    cartItems.innerHTML = '';
    updateTotal();
});

// Event listeners para agregar productos al carrito
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const product = button.closest('.product');
        const productName = product.querySelector('p').innerText.split(' ')[0];
        const category = product.dataset.category;
        addToCart(productName, category);
    });
});

// Nuevo evento: cambiar estilo del producto al pasar el mouse
const products = document.querySelectorAll('.product');
products.forEach(product => {
    product.addEventListener('mouseover', () => {
        product.style.border = "2px solid #007bff"; // Cambia el borde al pasar el mouse
    });
    product.addEventListener('mouseout', () => {
        product.style.border = ""; // Quita el borde al salir el mouse
    });
});

// Nuevo evento: botón para mostrar/ocultar productos por categoría
const categoryButtons = document.querySelectorAll('.category-btn');
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.category;
        const productsToShow = document.querySelectorAll(`.product[data-category="${category}"]`);
        productsToShow.forEach(product => {
            const isVisible = product.style.display !== "none";
            product.style.display = isVisible ? "none" : "block"; // Alterna la visibilidad
        });
    });
});
