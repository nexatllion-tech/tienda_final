
const accountBtn =
    document.getElementById("sidebarUsername");
const editarName =
    document.getElementById("firstname");
const cargarMas =
    document.querySelector(".masFavoritos-btn");
const guardarCambios =
    document.querySelector("save-btn");
const modificarFormulario =
    document.getElementById("profileForm");
const campos =
    document.querySelectorAll('#profileForm  input');
const formulario =
    document.getElementById('profileForm');
const loginOut =
    document.getElementById("logoutBtn");
const avatar =
    document.getElementById("avatar");
let carga = 0;

//Comprobar si existe tokens
const miToken = localStorage.getItem("tokens");
const miSesion = localStorage.getItem("usuarioSesion");
let datosModificados;
let existeTokens
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

if (miToken === null) {
    existeTokens = false;
    //window.location.href = "index.html";
    //console.log("no existe"); 
} else {
    existeTokens = true;
    const datos = JSON.parse(miToken);
    //accountBtn.setAttribute("href", "perfil.html")
    // 4. Extraemos el nombre de usuario
    //const nombre = datos.username;
    //accountBtn.innerHTML = nombre;
    //loginOut.classList.remove('hidden');
    //console.log("Existe tockesns")
    //window.location.href= "perfil.html"
    //console.log("existe");  
}
if (miSesion === null) {
    existeSesion = false;
    //window.location.href = "index.html";
    //console.log("no existe"); 
} else {
    existeSesion = true;
    datosModificados = JSON.parse(miSesion);
    //accountBtn.setAttribute("href", "perfil.html")
    // 4. Extraemos el nombre de usuario
    const nombre = datosModificados.username;
    accountBtn.innerHTML = nombre;
    //loginOut.classList.remove('hidden');
    //console.log("Existe sesion")
    //window.location.href= "perfil.html"
    //console.log("existe");  
}

renderPerfil();

getUser()
function getUser() {
    fetch('https://fakestoreapi.com/users/1')
        .then(response => response.json())
        .then(data => console.log(" "));
}

// aqui hay que poner un if con  existeSesion , si existe, carga 
function renderPerfil() {

    //console.log(data)
    //const cartContainer = document.querySelector(".card");
    const cartProfile = document.getElementById("profileForm");
    cartProfile.innerHTML = "<h2>Editar Perfil</h2>";
    const cartDiv = document.createElement("div");
    cartDiv.classList.add("cart-grid");

    if (existeSesion === false) {
        fetch('https://fakestoreapi.com/users/1')
            .then(response => response.json())
            .then(data => {
                accountBtn.innerHTML = data.username;
                avatar.innerHTML = data.username.charAt(0).toUpperCase();
                cartDiv.innerHTML = `
        <div class="input-group">
            <div class="form-grid">
                <label>Nombre</label>
                <input type="text" name="firstname" value="${data.name.firstname}">
            </div>
            <div class="form-grid">
                <label>Apellido</label>
                <input type="text" name="lastname" value="${data.name.lastname}">
            </div>
            <div class="form-grid">
                <label>Usuario</label>
                <input type="text" name="username" value="${data.username}">
            </div>
            <div class="form-grid">
                <label>Email</label>
                <input type="text" name="email" value="${data.email}">
            </div>
            <div class="form-grid">
                <label>Telefono</label>
                <input type="text" name="phone" value="${data.phone}">
            </div>
            <div class="form-grid">
                <label>Ciudad</label>

                <input type="text" name="city" value="${data.address.city}">
            </div>
        </div>;
        
        <button class="save-btn" type="submit">
            Guardar cambios
        </button>

        <div class="message" id="message">
            Usuario actualizado correctamente
        </div>
        `;
                cartProfile.appendChild(cartDiv);
            });
    }
    else {
        //console.log("datosModificados.nombre" + datosModificados.name.lastname)
        cartDiv.innerHTML = `
        <div class="input-group">
            <div class="form-grid">
                <label>Nombre</label>
                <input type="text" name="firstname" value="${datosModificados.name.firstname}">
            </div>
            <div class="form-grid">
                <label>Apellido</label>
                <input type="text" name="lastname" value="${datosModificados.name.lastname}">
            </div>
            <div class="form-grid">
                <label>Usuario</label>
                <input type="text" name="username" value="${datosModificados.username}">
            </div>
            <div class="form-grid">
                <label>Email</label>
                <input type="text" name="email" value="${datosModificados.email}">
            </div>
            <div class="form-grid">
                <label>Telefono</label>
                <input type="text" name="phone" value="${datosModificados.phone}">
            </div>
            <div class="form-grid">
                <label>Ciudad</label>

                <input type="text" name="city" value="${datosModificados.address.city}">
            </div>
        </div>
        <button class="save-btn" type="submit">
            Guardar cambios
        </button>
        <div class="message" id="message">
            Usuario actualizado correctamente
        </div>
        `;
        cartProfile.appendChild(cartDiv);
        //console.log("primera letra" + datosModificados.username.charAt(0).toUpperCase())
        avatar.innerHTML = datosModificados.username.charAt(0).toUpperCase();
    }
}

montarFavoritos();

function montarFavoritos() {
    const favoritos = loadFavorites();
    //console.log("favoritos" + favoritos)
    //console.log(favoritos)
    //console.log("Producto id" + producto.id)
    const favoritosContainer = document.querySelector("#favoritosContainer");
    for (let i = 0; i < favoritos.length && i < 4; i++) {
        url = 'https://fakestoreapi.com/products/';
        url += favoritos[i];
        //console.log(url)
        fetch(url)
            .then(response => response.json())
            .then(data => {


                favoritosContainer.innerHTML += `
                    <article class="favorites-grid">
                        <div class="product-image">
                        <img src="${data.image}" alt="${data.title}">
                        </div>
                        <div class="product-info">
                        
                        <h3 class="product-title">${data.title}</h3>
                        <p class="product-price">${data.price}€</p>
                        </div>
                    </article>

                    `;
            })
    }
    carga += 4;
}



function loadFavorites() {
    const favs = localStorage.getItem("favoritos");
    return favs ? JSON.parse(favs) : [];
}

cargarMas.addEventListener(

    "click",
    () => {
        const favoritos = loadFavorites();
        if (carga < favoritos.length) {
            for (let i = carga; i < favoritos.length && i < carga + 4; i++) {
                url = 'https://fakestoreapi.com/products/';
                url += favoritos[i];
                //console.log(url)
                fetch(url)
                    .then(response => response.json())
                    .then(data => {


                        favoritosContainer.innerHTML += `
                            <article class="favorites-grid">
                                <div class="product-image">
                                <img src="${data.image}" alt="${data.title}">
                                </div>
                                <div class="product-info">
                                
                                <h3 class="product-title">${data.title}</h3>
                                <p class="product-price">${data.price}€</p>
                                </div>
                            </article>

                            `;
                    })
            }
            carga += 4;
        }
    }
)

misPedidos();

function misPedidos() {
    //console.log("dentro de renderCart")
    const cartContainer = document.querySelector(".card.summary");
    const cartTotal = document.querySelector(".total");

    if (!cartContainer || !cartTotal) return;

    cartContainer.innerHTML = "<h2>Mis pedidos</h2>";

    let totalAcumulado = 0;

    carrito.forEach(item => {
        //console.log("item" + item)
        totalAcumulado += item.price * item.quantity;

        const cartItem = document.createElement("article");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <div class="orders">
                <p class="cart-item-title">${item.title}</p>
                <p class="cart-item-price">${item.price}€ x ${item.quantity}</p>
            </div>
        `;

        cartContainer.appendChild(cartItem);
    });

    const totalBoton = document.createElement("div");
    totalBoton.innerHTML = `
        <div class="order">
            <span>Total</span>
            <span>${totalAcumulado.toFixed(2)}€</span>
        </div>
    `;

    cartContainer.appendChild(totalBoton);
}

modificarFormulario.addEventListener('submit', function (event) {
    event.preventDefault()
    //console.log("click en modificar")
    //console.log(modificarFormulario)
    const datosFormulario = new FormData(formulario);
    const valoresActuales = Object.fromEntries(datosFormulario.entries());
    //console.log("Valores actuales listos para enviar:", valoresActuales);
    const user = { username: 'john_doe_updated', email: 'john.updated@example.com' };
    fetch('https://fakestoreapi.com/users/1', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(data => {
            //console.log("Respuesta de la API:", data);
        })
        .catch(error => console.error("Error al actualizar:", error));
    localStorage.setItem('usuarioSesion', JSON.stringify(userUpdated));
    accountBtn.innerHTML = userUpdated.username;
    avatar.innerHTML = userUpdated.username.charAt(0).toUpperCase();
}

)
let userUpdated
modificarFormulario.addEventListener('input', function (e) {
    const contenedor = e.target.closest('.input-group');
    const etiqueta = contenedor.querySelector('label').textContent;
    //console.log(`Escribiendo en el campo "${etiqueta}": ${e.target.value}`);
    const datosFormulario = new FormData(modificarFormulario);
    const valores = Object.fromEntries(datosFormulario.entries());
    userUpdated = {
        id: 1,
        email: valores.email,
        username: valores.username,
        password: "m38rmF$",
        name: {
            firstname: valores.firstname,
            lastname: valores.lastname
        },
        address: {
            city: valores.city
        },
        phone: valores.phone
    };

    //console.log("sessionStorage guardado:", userUpdated);

});

loginOut.addEventListener(
    "click",
    () => {
        //console.log("cerrando sesion ...")
        existeTokens = false;
        localStorage.removeItem("tokens");
        //localStorage.removeItem("favoritos");
        localStorage.removeItem("usuarioSesion");
        loginOut.classList.add('hidden');
        accountBtn.innerHTML = "Mi cuenta";
        window.location.href = "index.html";
    }
)