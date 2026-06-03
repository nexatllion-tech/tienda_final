//Comprobar si existe idProducto
let miToken = localStorage.getItem("idProducto");
let existeTokens
let idDetalle;
let categoria;
//let productsContainer;
let cart = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

if (miToken === null) {
    existeTokens = false;
    window.location.href = "index.html"
} else {
    existeTokens = true;
    miToken = localStorage.getItem("idProducto");
    idDetalle = JSON.parse(miToken);
    console.log("id: " + idDetalle.id)
}


function renderDetalleProducto() {
    url = 'https://fakestoreapi.com/products/'
    url += idDetalle.id;
    const favoritos = loadFavorites();
    let iconoCorazon;
    //console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(data => {
            iconoCorazon = favoritos.includes(data.id) ? "❤️" : "🤍";
            //console.log(iconoCorazon);
            categoria = data.category;
            //console.log("categoria primera" + categoria)
            //productsContainer = document.querySelector(".container");
            const productsContainer = document.querySelector(".container");
            productsContainer.innerHTML += `
                <div class="breadcrumb">
                    <a href="index.html" class="enlace">Home </a> / ${data.category} ;  / ${data.title}
                </div>
                <section class="product-box">
                    <div class="left-side">
                        <img id="productImage" src="${data.image}">
                    </div>
                    <div class="right-side">
                        <p class="category" id="productCategory">
                        </p>
                        <h1 class="title" id="productTitle">
                        ${data.title} 
                        </h1>
                        <div class="rating">
                            ⭐ ${data.rating.rate}
                            <span id="productReviews">
                            </span>
                        </div>
                        <p class="description" id="productDescription">
                        ${data.description}
                        </p>
                        <div class="info-grid">
                            <div class="info-card">
                                Marca
                               <h2>NovaWear</h2>
                            </div>
                            <div class="info-card">
                                Stock
                                <h2> ${data.rating.count}</h2>
                            </div>
                            <div class="info-card">
                                Envío
                                <h2> 24H Gratis</h2>
                            </div>
                            <div class="info-card">
                                SKU
                                <h2> NS-2026</h2>
                            </div>
                        </div>
                        <div class="price" id="productPrice">
                        ${data.price} €
                        </div>
                        <div class="actions">
                            <button class="buy-btn" id="addToCartBtn" onclick="addToCart(${data.id})" >
                                Añadir al carrito
                            </button>
                            <button class="fav-btn" id="favoriteBtn" onclick = "toggleFavorite(${data.id})">
                                 ${iconoCorazon}
                            </button>
                        </div>
                    </div>
                </section>

            `;
            productosRelacionados();
        })
}

function productosRelacionados() {
    const cuantroCat = 4;
    let i = 0;
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            //console.log(data);

            const productosFiltrados = data.filter(product =>
                product.category.includes(categoria)
            );
            //console.log(productosFiltrados)
            const productsContainer = document.querySelector(".container");
            //productsContainer = document.querySelector(".container");

            productsContainer.innerHTML += `
                <section class="related">
                    <h2>Productos relacionados</h2>
                    <div class="related-grid" id="related-grid">                       
                    </div>
                </section>
            `;
            const relatedGrid = document.getElementById("related-grid");
            productosFiltrados.forEach(producto => {
                if (i < 4) {
                    //console.log("categoria: " + categoria);
                    //console.log("cuatroCat: " + cuantroCat)
                    relatedGrid.innerHTML += `
                    <section class="related-card ">
                        <div class="related-grid" id="related-grid">
                            <img id="productImage" src="${producto.image}">
                        </div>
                        <h2 style="cursor: pointer;" onclick="detallesProducto(${producto.id})">${producto.title}</h2>
                    </section>
            `;
                    i++;
                }
            });
        });
}

function detallesProducto(id) {
    //console.log(id)
    const datosId = { id };
    localStorage.removeItem("idProducto");
    localStorage.setItem("idProducto", JSON.stringify(datosId));
    const productsContainer = document.querySelector(".container");
    productsContainer.innerHTML = "";
    window.location.href = "detalleProducto.html"
}
function loadFavorites() {
    const favs = localStorage.getItem("favoritos");
    return favs ? JSON.parse(favs) : [];
    // TODO

}

function toggleFavorite(id) {
    //console.log("Favorito id" + id)
    let arrayFavoritos = loadFavorites();
    const index = arrayFavoritos.indexOf(id);
    if (index !== -1) {
        arrayFavoritos.splice(index, 1);
        //console.log(`Eliminado ID ${id} de favoritos`);

        event.target.textContent = "🤍";
    } else {
        arrayFavoritos.push(id);
        //console.log(`Añadido ID ${id} a favoritos`);
        event.target.textContent = "❤️";
    }
    localStorage.setItem("favoritos", JSON.stringify(arrayFavoritos));
}


async function addToCart(id) {

    //console.log(carrito)
    const productoEncontrado = carrito.find(prod => Number(prod.id) === Number(id));
    //console.log("producto encontrado" + productoEncontrado)

    if (!productoEncontrado) {

        const response = await fetch(
            `https://fakestoreapi.com/products/${id}`
        );

        const producto = await response.json();

        carrito.push({
            ...producto,
            quantity: 1
        });

    } else {

        carrito = carrito.map(item =>
            Number(item.id) === Number(id)
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
    }

    guardarCarrito();

    //console.log("Producto agregado"+ productoEncontrado);
    //console.log("final0" + carrito)
}

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

renderDetalleProducto();
