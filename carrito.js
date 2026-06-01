// =========================
// SELECTORES
// =========================
const finalizarCompra =
    document.querySelector(".buy-btn");

const accountBtn =
    document.querySelector(".cart-btn");

// Botón cerrar login
const closeLogin =
    document.getElementById("closeLogin");

// Formulario login
const loginForm =
    document.getElementById("loginForm");

//cerrar sesión
const loginOut =
    document.querySelector(".logout-btn");

const cartContainer =
    document.getElementById(
        "cartContainer"
    );

const cartTotal =
    document.getElementById(
        "cartTotal"
    );

const checkoutBtn =
    document.getElementById(
        "checkoutBtn"
    );

const buyBtn =
    document.getElementById(
        "buyBtn"
    );

const successMessage =
    document.getElementById(
        "successMessage"
    );


//Comprobar si existe tokens
const miToken = localStorage.getItem("tokens");
let existeTokens
if (miToken === null) {
    existeTokens = false;
    window.location.href = "index.html";
    //console.log("no existe"); 
} else {
    existeTokens = true;
    const datos = JSON.parse(miToken);
    //accountBtn.setAttribute("href", "perfil.html")
    // 4. Extraemos el nombre de usuario
    const nombre = datos.username;
    accountBtn.innerHTML = nombre;
    loginOut.classList.remove('hidden');
    console.log("Existe tockesns")
    //window.location.href= "perfil.html"
    //console.log("existe");  
}


// =========================
// VARIABLES
// =========================

let cart = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

loginOut.addEventListener(
    "click",
    () => {
        existeTokens = false;
        localStorage.removeItem("tokens");
        loginOut.classList.add('hidden');
        accountBtn.innerHTML = "Mi cuenta";
        window.location.href = "index.html";
    }
)

accountBtn.addEventListener(
    "click",
    () => {
        if (existeTokens) {
            window.location.href = "perfil.html"
        }
    }
);




// =========================
// FUNCIONES CARRITO
// =========================

function addToCart() {

}

function removeFromCart() {

}

function renderCart() {
    console.log("dentro de renderCart")
    const cartContainer = document.querySelector(".card.summary");
    const cartTotal = document.querySelector(".total");

    if (!cartContainer || !cartTotal) return;

    cartContainer.innerHTML = "<h2>Tu carrito</h2>";

    let totalAcumulado = 0;

    carrito.forEach(item => {
        console.log("item" + item)
        totalAcumulado += item.price * item.quantity;

        const cartItem = document.createElement("article");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-info">
                <p class="cart-item-title">${item.title}</p>
                <p class="cart-item-price">${item.price}€ x ${item.quantity}</p>
            </div>
        `;

        cartContainer.appendChild(cartItem);
    });

    const totalBoton = document.createElement("div");
    totalBoton.innerHTML = `
        <div class="total">
            <span>Total</span>
            <span>${totalAcumulado.toFixed(2)}€</span>
        </div>
        <button class="buy-btn">
            Comprar ahora
        </button>
    `;

    cartContainer.appendChild(totalBoton);
    cartTotal.textContent = `${totalAcumulado.toFixed(2)}€`;
}

finalizarCompra.addEventListener(
    "click",
    () => {
        console.log("comprando ...")

    }
)

function updateCartTotal() {

}

function clearCart() {

}

function saveCart() {

}

function loadCart() {

}

function checkout() {

}

function validateCheckout() {

}

function showSuccessMessage() {

}

function formatPrice() {

}

function generateCartItem() {

}



// =========================
// EVENTOS
// =========================

// checkoutBtn.addEventListener(
//     "click",
//     checkout
// );

// buyBtn.addEventListener(
//     "click",
//     validateCheckout
// );



// =========================
// INIT
// =========================

loadCart();
renderCart();
