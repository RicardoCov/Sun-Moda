const cartItems = document.getElementById('cartItems');
const clearCartBtn = document.getElementById('clearCart');
const totalAmountElem = document.getElementById('totalAmount');

const productPrices = {
    "PlayeraNegra": 20,
    "PantalónAzul": 25,
    "PantalónCargo": 30,
    "Converses": 50,
    "Anillo": 15,
    "PlayeraTirantes": 25
};

const discountAddedEvent = new CustomEvent('discountAdded', {
    detail: { productName: '', discount: 0 }
});

const checkoutCompletedEvent = new CustomEvent('checkoutCompleted', {
    detail: { totalAmount: 0, items: [] }
});

document.addEventListener('DOMContentLoaded', function() {

    const scrollToTopEvent = new CustomEvent('scrollToTop', {
        detail: { message: 'Scroll to top triggered' }
    });

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        document.dispatchEvent(scrollToTopEvent);
    }

    document.addEventListener('scrollToTop', function(e) {
        console.log(e.detail.message);
    });

    const scrollButton = document.getElementById('scrollButton');
    if (scrollButton) {
        scrollButton.addEventListener('click', scrollToTop);
    } else {
        console.error("El botón de desplazamiento no se encontró en el DOM.");
    }
});

document.addEventListener('discountAdded', function(e) {
    alert(`¡Has agregado ${e.detail.productName} con un ${e.detail.discount}% de descuento al carrito!`);
});

document.addEventListener('checkoutCompleted', function(e) {
    console.log(`Compra completada. Total: $${e.detail.totalAmount}`);
    e.detail.items.forEach(item => {
        console.log(`Producto: ${item.name}, Cantidad: ${item.quantity}`);
    });
});

function updateTotal() {
    let total = 0;
    const subtotals = document.querySelectorAll('.subtotal');
    subtotals.forEach(subtotalElem => {
        total += parseFloat(subtotalElem.textContent);
    });
    totalAmountElem.textContent = total.toFixed(2);
}

function addToCart(productName, category) {
    const price = productPrices[productName];
    
    const row = document.createElement('tr');
    
    row.innerHTML = 
        `<td>${productName}</td>
        <td>${category}</td>
        <td><input type="number" value="1" class="form-control quantity-input" min="1" id="quantity-${productName.replace(/\s+/g, '-')}"></td>
        <td>$<span id="price-${productName.replace(/\s+/g, '-')}">${price}</span></td>
        <td>$<span class="subtotal" id="subtotal-${productName.replace(/\s+/g, '-')}">${price}</span></td>
        <td><button class="btn btn-danger btn-sm remove-btn">Eliminar</button></td>`;
    
    cartItems.appendChild(row);

    const quantityInput = row.querySelector('.quantity-input');
    quantityInput.addEventListener('input', function() {
        const quantity = parseInt(this.value);
        const subtotalElem = row.querySelector('.subtotal');
        const newSubtotal = quantity * price;
        subtotalElem.textContent = newSubtotal.toFixed(2);
        updateTotal();
    });

    row.querySelector('.remove-btn').addEventListener('click', function() {
        row.remove();
        updateTotal();
    });

    if (productName === 'PlayeraNegra') {
        discountAddedEvent.detail.productName = productName;
        discountAddedEvent.detail.discount = 30;
        document.dispatchEvent(discountAddedEvent);
    } else if (productName === 'PantalónAzul') {
        discountAddedEvent.detail.productName = productName;
        discountAddedEvent.detail.discount = 40;
        document.dispatchEvent(discountAddedEvent);
    } else if (productName === 'Anillo') {
        discountAddedEvent.detail.productName = productName;
        discountAddedEvent.detail.discount = 15;
        document.dispatchEvent(discountAddedEvent);
    }

    updateTotal();

    alert(`${productName} ha sido agregado al carrito.`);
}

function completeCheckout() {
    const cartRows = document.querySelectorAll('#cartItems tr');
    const items = [];

    cartRows.forEach(row => {
        const productName = row.querySelector('td:first-child').textContent;
        const quantity = parseInt(row.querySelector('.quantity-input').value);
        items.push({ name: productName, quantity });
    });

    checkoutCompletedEvent.detail.totalAmount = parseFloat(totalAmountElem.textContent);
    checkoutCompletedEvent.detail.items = items;
    document.dispatchEvent(checkoutCompletedEvent);

    alert('Gracias por tu compra!');
    cartItems.innerHTML = '';
    updateTotal();
}

clearCartBtn.addEventListener('click', () => {
    cartItems.innerHTML = '';
    updateTotal();
});

const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const product = button.closest('.product');
        const productName = product.querySelector('p').innerText.split(' ')[0];
        const category = product.dataset.category;
        addToCart(productName, category);
    });
});

document.getElementById('completePurchaseButton').addEventListener('click', completeCheckout);

const products = document.querySelectorAll('.product');
products.forEach(product => {
    product.addEventListener('mouseover', () => {
        product.style.border = "2px solid #007bff";
    });
    product.addEventListener('mouseout', () => {
        product.style.border = "";
    });
});

const categoryButtons = document.querySelectorAll('.category-btn');
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.category;
        const productsToShow = document.querySelectorAll(`.product[data-category="${category}"]`);
        productsToShow.forEach(product => {
            const isVisible = product.style.display !== "none";
            product.style.display = isVisible ? "none" : "block";
        });
    });
});