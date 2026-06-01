/*
========================================
MINI ECOMMERCE - BOILERPLATE
========================================

TECNOLOGÍAS:
- JavaScript
- Fetch API
- LocalStorage
- SessionStorage

FASES:
1. Productos
2. Filtros
3. Carrito
4. EXTRA Persistencia
5. EXTRA Login
6. EXTRA Sesión
7. EXTRA Favoritos

========================================
*/


// ========================================
// SELECTORES DEL DOM
// ========================================

// Contenedor productos
const productsContainer =
  document.getElementById("productsContainer");

// Contenedor carrito
const cartContainer =
  document.getElementById("cartContainer");

// Total carrito
const cartTotal =
  document.getElementById("cartTotal");

// Buscador
const searchInput =
  document.getElementById("searchInput");

// Filtro categorías
const categoryFilter =
  document.getElementById("categoryFilter");

// Ordenación
const sortSelect =
  document.getElementById("sortSelect");

// Modal login
const loginModal =
  document.getElementById("loginModal");

// Botón abrir login
const accountBtn =
  document.querySelector(".cart-btn");

// Botón cerrar login
const closeLogin =
  document.getElementById("closeLogin");

// Formulario login
const loginForm =
  document.getElementById("loginForm");

const loginOut =
  document.querySelector(".logout-btn");

//const card = document.createElement("product-card");
// ========================================
// VARIABLES GLOBALES
// ========================================

// Productos API
//let products = [];
// Productos totales
let allProducts = [];

// Productos filtrados
let filteredProducts = [];

// Carrito
let cart = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Favoritos
let favorites = [];

//Comprobar si existe tokens
const miToken = localStorage.getItem("tokens");
let existeTokens
if (miToken === null) {
  existeTokens = false;
  //console.log("no existe"); 
} else {
  existeTokens = true;
  const datos = JSON.parse(miToken);
//accountBtn.setAttribute("href", "perfil.html")
  // 4. Extraemos el nombre de usuario
  const nombre = datos.username;
  accountBtn.innerHTML = nombre;
  loginOut.classList.remove('hidden');
  //window.location.href= "perfil.html"
  //console.log("existe");  
}
// ========================================
// FASE 1 - FETCH PRODUCTOS
// ========================================

/*
OBJETIVO:
Obtener productos desde la API.

ENDPOINT:
https://fakestoreapi.com/products

CONCEPTOS:
- fetch()
- promesas
- .then()
- .catch()

TAREAS:
- Hacer petición fetch
- Convertir respuesta a JSON
- Guardar productos
- Pintar productos
- Pintar categorías
*/
function getProducts() {

  let url = "https://fakestoreapi.com/products";
  fetch(url)
    .then(response => response.json())
    .then(data => {
      allProducts = data;
      renderProducts(filteredProducts);
      renderProducts(data);
      renderCategories(data);
      renderCart();
    })
    .catch(error => console.error("Hubo un error en la Tienda ", error))

}

function renderProducts(productsArray) {
  const productsContainer = document.querySelector("#productsContainer");
  productsContainer.innerHTML = "";
  productsArray.forEach(articulo => montarProducts(articulo));
}


// Creamos el HTML dinámico usando los datos que nos da la API
function montarProducts(producto) {
  const favoritos = loadFavorites();
  //console.log(favoritos)
  //console.log("Producto id" + producto.id)
  const iconoCorazon = favoritos.includes(producto.id) ? "❤️" : "🤍";
  const productsContainer = document.querySelector("#productsContainer");
  productsContainer.innerHTML += `
      <article class="product-card">
        <div class="product-image">
          <img src="${producto.image}" alt="${producto.title}">
        </div>
        <div class="product-info">
          <p class="product-category">${producto.category}</p>
          <h3 class="product-title">${producto.title}</h3>
          <p class="product-price">${producto.price}€</p>
          <div class="card-actions">
            <button class="add-btn" onclick="addToCart(${producto.id})" >Añadir</button>
            <button class="fav-btn" onclick = "toggleFavorite(${producto.id})" >${iconoCorazon}</button>
          </div>
        </div>
      </article>
    `;

}

getProducts();



/*
========================================
¿QUÉ DEVUELVE LA API?
========================================

La API devuelve un ARRAY de productos.

Ejemplo:

[
  {
    id: 1,
    title: "Fjallraven Backpack",
    price: 109.95,
    description: "Your perfect pack...",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/..."
  }
]



========================================
¿CÓMO ACCEDER A LOS DATOS?
========================================

product.title
product.price
product.category
product.image

========================================
EJEMPLO RECORRIENDO PRODUCTOS
========================================
*/
// products.forEach(product => {

//   renderProducts(product);

// });



//function getProducts() {

// TODO

//}


// ========================================
// FASE 1 - RENDER PRODUCTOS
// ========================================

/*
OBJETIVO:
Pintar productos dinámicamente.

MOSTRAR:
- Imagen
- Título
- Precio
- Categoría
- Botón carrito
- Botón favorito

PISTA:
Usar:
- innerHTML
- createElement
- appendChild
*/




/*
========================================
PISTA RENDERIZADO
========================================

Ejemplo creando una card:

const card = document.createElement("article");

card.innerHTML = `
  <h2>${product.title}</h2>
`;

productsContainer.appendChild(card);

========================================
*/

/*
function renderProducts(product) {
  productsContainer.innerHTML +=
    `   
    <article class="product-card">
        <div class="product-image">
          <img
            src="${product.image}"
            alt="${product.title}"
          >
        </div>
        <div class="product-info">
          <p class="product-category">
            ${product.category}
          </p>
          <h3 class="product-title">
            ${product.title}
          </h3>
          <p class="product-price">
            ${product.price}
          </p>
          <div class="card-actions">
            <button class="add-btn">
            </button>
            <button class="fav-btn">
              🤍
            </button>
          </div>
        </div>
      </article>
      `;
       console.log(card)
 // productsContainer.appendChild(card);

  // TODO

}
  */


// ========================================
// FASE 2 - CATEGORÍAS
// ========================================

/*
OBJETIVO:
Generar categorías dinámicamente.

TAREAS:
- Obtener categorías únicas
- Crear options
- Añadir al select

PISTA:
new Set()
*/

function renderCategories(productsArray) {
  //console.log(productsArray);
  const categoriesSelect = document.querySelector("#categoryFilter");
  if (!categoriesSelect) return;
  categoriesSelect.innerHTML = "";  // Limpiar opciones anteriores
  const categoriesUnicas = [...new Set(productsArray.map(producto => producto.category))];
  // Crear las opciones y añadirlas al select de una sola vez
  categoriesSelect.innerHTML = categoriesUnicas
    .map(categoria => `<option value="${categoria}">${categoria}</option>`)
    .join("");
}


// ========================================
// FASE 2 - FILTROS
// ========================================

/*
OBJETIVO:
Filtrar productos dinámicamente.

REQUISITOS:
- Buscar por nombre
- Filtrar por categoría
- Ordenar:
  - precio ascendente
  - precio descendente
  - A-Z
  - Z-A

PISTA:
- filter()
- sort()
- localeCompare()
*/


function filterProducts() {
  //console.log(categoryFilter.value)
  //console.log(sortSelect.value);
  let opcionCategoria = categoryFilter.value;
  let opcionOrden = sortSelect.value;
  productsContainer.innerHTML = "";
  const busqueda = searchInput.value.toLowerCase();
  //console.log(busqueda)
  let url = "https://fakestoreapi.com/products";
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const productosFiltrados = data.filter(product =>
        product.title.toLowerCase().includes(busqueda) && product.category === opcionCategoria
      );

      if (opcionOrden === "priceAsc") {
        productosFiltrados.sort((a, b) => a.price - b.price);
        // console.log("precio ascendente")
      }
      //console.log(data)
      if (opcionOrden === "priceDesc") {
        productosFiltrados.sort((a, b) => b.price - a.price);
        // console.log("precio descendete")
      }
      if (opcionOrden === "az") {
        //console.log(productosFiltrados);
        productosFiltrados.sort((a, b) => a.title.localeCompare(b.title));
      }
      if (opcionOrden === "za") {
        productosFiltrados.sort((a, b) => b.title.localeCompare(a.title));
      }
      renderProducts(productosFiltrados);
    })
    .catch(error => console.error("Hubo un error en la Tienda ", error));
}


// ========================================
// EVENTOS FILTROS
// ========================================

searchInput.addEventListener(
  "input",
  filterProducts
);

categoryFilter.addEventListener(
  "change",
  filterProducts
);

sortSelect.addEventListener(
  "change",
  filterProducts
);


// ========================================
// FASE 3 - CARRITO
// ========================================

/*
OBJETIVO:
Añadir productos al carrito.

TAREAS:
- Buscar producto por ID
- Añadir al array carrito
- Incrementar cantidad si ya existe
- Guardar carrito
- Renderizar carrito
*/

function addToCart(id) {
  if (!allProducts || allProducts.length === 0) {
    console.error("Productos aún no cargados");
    return;
  }

  //console.log("Intentando agregar ID:", id);
  //console.log("Lista de productos disponibles actualmente en memoria:", allProducts);

  //const productoEncontrado = products.find(prod => prod.id === id);
  const productoEncontrado = allProducts.find(prod => Number(prod.id) === Number(id));
  if (!productoEncontrado) {
    console.error("Producto no encontrado en el array 'products'. ID buscado:", id); // Si entra aquí, es porque el ID que elegiste NO EXISTE dentro del array 'products'
    return;
  }

  const existeEnCarrito = carrito.some(item => Number(item.id) === Number(id));

  if (existeEnCarrito) {
    carrito = carrito.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    carrito.push({
      ...productoEncontrado,
      quantity: 1
    });
  }

  guardarCarrito();
  renderCart();
  console.log("¡Producto agregado con éxito!", productoEncontrado);
}

/*
OBJETIVO:
Eliminar producto del carrito.
*/
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function removeFromCart(id) {
  const index = carrito.findIndex(item => item.id === id);
  if (index !== -1) {
    carrito.splice(index, 1);
    guardarCarrito();
    renderCart();
  }
}
/*
OBJETIVO:
Pintar carrito dinámicamente.

MOSTRAR:
- Nombre
- Cantidad
- Precio
- Total carrito
*/

function renderCart() {
  const cartContainer = document.getElementById("cartContainer");
  const cartTotal = document.getElementById("cartTotal");

  if (!cartContainer || !cartTotal) return;

  cartContainer.innerHTML = "";

  let totalAcumulado = 0;

  carrito.forEach(item => {
    totalAcumulado += item.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <div class="cart-item-info">
        <p class="cart-item-title">${item.title}</p>
        <p class="cart-item-price">${item.quantity} x ${item.price.toFixed(2)}€</p>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${item.id})">X</button>
    `;

    cartContainer.appendChild(cartItem);
  });

  cartTotal.textContent = `${totalAcumulado.toFixed(2)}€`;
}

// ========================================
// FASE 4 - LOCAL STORAGE
// ========================================

/*
========================================
EXTRA
========================================
*/


/*
OBJETIVO:
Guardar carrito en localStorage.

PISTA:
JSON.stringify()
*/


function saveCart() {

  // TODO

}


/*
OBJETIVO:
Recuperar carrito guardado.

PISTA:
JSON.parse()
*/


function loadCart() {

  // TODO

}


// ========================================
// FASE 7 - FAVORITOS
// ========================================

/*
========================================
EXTRA
========================================
*/


/*
OBJETIVO:
Guardar productos favoritos.

TAREAS:
- Añadir favoritos
- Eliminar favoritos
- Guardar en localStorage
- Recuperar favoritos
*/


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


function loadFavorites() {
  const favs = localStorage.getItem("favoritos");
  return favs ? JSON.parse(favs) : [];
  // TODO

}


// ========================================
// FASE 5 - LOGIN
// ========================================

/*
========================================
EXTRA
========================================
*/


/*
OBJETIVO:
Simular login con FakeStoreAPI.

ENDPOINT:
https://fakestoreapi.com/auth/login

USUARIO TEST:
mor_2314
83r5^_

CONCEPTOS:
- fetch POST
- JSON.stringify()
- sessionStorage

TAREAS:
- Capturar formulario
- Enviar datos
- Guardar token
- Cerrar modal
*/

loginForm.addEventListener(
  "submit",
  (e) => {
    const nombreUsuario = document.getElementById("username");
    const passwordUsuario = document.getElementById("password");
    //console.log("usuario"+ nombreUsuario.value)
    //console.log("password"+ passwordUsuario.value)
    const credenciales = { username: nombreUsuario.value, password: passwordUsuario.value };
    fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credenciales)
    })
      .then(response => response.json())
      .then(data => {
        const datosSesion = { ...data, username: credenciales.username };
        localStorage.setItem("tokens", JSON.stringify(datosSesion))
        //console.log(data)
        loginModal.classList.add('hidden');
        existeTokens = true;
        accountBtn.innerHTML = credenciales.username;
        
        loginOut.classList.remove('hidden');

      });

    e.preventDefault();
    console.log("inicio sesion correcto")

    // TODO

  }
);


// ========================================
// FASE 6 - SESIÓN
// ========================================

/*
========================================
EXTRA
========================================
*/


/*
OBJETIVO:
Mantener sesión iniciada.

TAREAS:
- Detectar token
- Mostrar login si no existe
*/

function checkSession() {

  // TODO

}


/*
OBJETIVO:
Cerrar sesión.

TAREAS:
- Eliminar token
- Cerrar modal
*/
loginOut.addEventListener(
  "click",
  () => {
    console.log("cerrando sesion ...")
    existeTokens = false;
    localStorage.removeItem("tokens");
    loginOut.classList.add('hidden');
    accountBtn.innerHTML = "Mi cuenta";
  }
)

function logout() {

}


// ========================================
// MODAL LOGIN
// ========================================

/*
========================================
EXTRA
========================================
*/


/*
OBJETIVO:
Abrir modal login.
*/
accountBtn.addEventListener(
  "click",
  () => {
    if (!existeTokens) {
      loginModal.classList.remove('hidden');
    } else window.location.href= "perfil.html"
  }
);

/*
OBJETIVO:
Cerrar modal login.
*/

closeLogin.addEventListener(
  "click",
  () => {
    loginModal.classList.add('hidden');
    // TODO

  }
);


/*
OBJETIVO:
Cerrar modal clicando fuera.
*/

loginModal.addEventListener(
  "click",
  (e) => {
    if (e.target === loginModal) {
      loginModal.classList.add('hidden');
    }
    // TODO

  }
);


// ========================================
// INIT APP
// ========================================

/*
OBJETIVO:
Inicializar la aplicación.

TAREAS:
- Obtener productos
- Cargar carrito
- Cargar favoritos
- Comprobar sesión
*/


function init() {

  // TODO

}


// Iniciar aplicación
init();