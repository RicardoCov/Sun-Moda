const categoriasBtn = document.querySelector('.categorias-btn');
const ofertasBtn = document.querySelector('.ofertas-btn');
const vistasBtn = document.querySelector('.vistas-btn');
const cartSection = document.getElementById('cartSection');
const cartList = document.getElementById('cartList');
const clearCartBtn = document.getElementById('clearCart');
const cartButton = document.getElementById('cartButton');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

const categoriasSection = document.querySelector('.categorias-section');
const ofertasSection = document.querySelector('.ofertas-section');
const vistasSection = document.querySelector('.vistas-section');

function showCart() {
    cartSection.style.display = 'block';
}

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const product = button.closest('.product');
        const productName = product.querySelector('p').innerText;
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.innerText = productName;
        cartList.appendChild(listItem);
        showCart();
    });
});

clearCartBtn.addEventListener('click', () => {
    cartList.innerHTML = '';
});

function filterProducts(category) {
    const allProducts = document.querySelectorAll('.product');
    allProducts.forEach(product => {
        if (product.dataset.category === category || category === 'todos') {
            product.style.display = 'block'; // Mostrar producto
        } else {
            product.style.display = 'none'; // Ocultar producto
        }
    });
}

const categoryButtons = document.querySelectorAll('.category-btn');
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.category;
        filterProducts(category);
    });
});

filterProducts('todos');