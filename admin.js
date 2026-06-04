const miToken = localStorage.getItem("tokens");
const productsContainer =
    document.getElementById("productsContainer");
const busquedaInput =
    document.getElementById("searchInput");
const eliminarInput =
    document.getElementById("delete-btn");
const modificarInput =
    document.getElementById("edit-btn");
const modal =
    document.getElementById("modal");
const nuevoProducto =
    document.getElementById("addProductBtn");
const form =
    document.getElementById("productForm");

let existeTokens;
let datosEliminarModificar = [];

if (miToken === null) {
    existeTokens = false;
    //console.log("no existe"); 
} else {
    existeTokens = true;
    const datos = JSON.parse(miToken);
    //accountBtn.setAttribute("href", "perfil.html")
    // 4. Extraemos el nombre de usuario
    const nombre = datos.username;
    //accountBtn.innerHTML = nombre;
    //loginOut.classList.remove('hidden');
    //window.location.href= "perfil.html"
    //console.log("existe");  

}

function renderProductos() {

    const tablaRellenar = document.getElementById("productsTable");

    let html = "";

    datosEliminarModificar.forEach(producto => {
        html += `
            <tr>
                <td>
                    <img src="${producto.image}" width="50">
                </td>
                <td>${producto.title}</td>
                <td>${producto.price}€</td>
                <td>${producto.category}</td>
                <td>
                    <div class="actions">
                        <button class="delete-btn" onclick="busquedaEliminar(${producto.id})">
                            Eliminar
                        </button>

                        <button class="edit-btn" onclick="modificarProducto(${producto.id})">
                            Modificar
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });
    tablaRellenar.innerHTML = html;
}


function renderProducts(data) {
    const tablaRellenar = document.getElementById("productsTable");
    tablaRellenar.innerHTML = data.map(producto => `
        <tr>
            <td><img src="${producto.image}" width="50"></td>
            <td>${producto.title}</td>
            <td>${producto.price}€</td>
            <td>${producto.category}</td>
            <td>
                <div class="actions">
                    <button class="delete-btn" onclick="busquedaEliminar(${producto.id})">Eliminar</button>
                    <button class="edit-btn" onclick="modificarProducto(${producto.id})">Modificar</button>
                </div>
            </td>
        </tr>
    `).join("");
}

function filterProducts(busqueda) {
    const productosFiltrados = datosEliminarModificar.filter(product =>
        product.title.toLowerCase().includes(busqueda.toLowerCase())
    );
    renderProducts(productosFiltrados);
}

busquedaInput.addEventListener(
    "input",
    (e) => {
        filterProducts(e.target.value);
        //console.log("buscando ...", e.target.value)
    }
);

function modificarProducto(id) {
    const producto = datosEliminarModificar.find(p => p.id === id);
    if (!producto) return;
    const modal = document.getElementById("modal");
    modal.style.display = "flex";
    document.getElementById("title").value = producto.title;
    document.getElementById("price").value = Number(producto.price).toFixed(2);
    document.getElementById("category").value = producto.category;
    document.getElementById("productForm").dataset.id = id;
}
function guardarProducto() {
    const form = document.getElementById("productForm");
    const id = form.dataset.id;
    if (id) {
        const producto = datosEliminarModificar.find(
            p => p.id === Number(id)
        );
        if (!producto) return;
        producto.title = document.getElementById("title").value;
        producto.price = parseFloat(document.getElementById("price").value);
        producto.category = document.getElementById("category").value;

    } else {
        datosEliminarModificar.push({
            id: Date.now(),
            title: document.getElementById("title").value,
            price: parseFloat(document.getElementById("price").value),
            category: document.getElementById("category").value,
            image: "tienda.png"
        });
    }

    renderProducts(datosEliminarModificar);
    cerrarModal();
}

function busquedaEliminar(id) {
    datosEliminarModificar = datosEliminarModificar.filter(product =>
        product.id !== id
    );
    renderProducts(datosEliminarModificar);
}


function cerrarModal() {
    //console.log("cerrando modal"); 
    const modal = document.getElementById("modal");
    modal.style.display = "none";
    document.getElementById("productForm").reset();
}


modal.addEventListener("click", function (e) {
    if (e.target === modal) {
        cerrarModal();
    }
});

function lecturaDatos() {
    fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .then(data => {
            datosEliminarModificar = data
            renderProducts(datosEliminarModificar);
        })
        .catch(error =>
            console.error("Hubo un error en la Tienda", error)
        );
}

nuevoProducto.addEventListener("click", () => {
    const modal = document.getElementById("modal");
    modal.style.display = "flex";
    const form = document.getElementById("productForm");
    form.reset();
    form.dataset.id = "";
    //console.log("añadiendo nuevo producto...");
});

form.addEventListener("submit", function (e) {
    e.preventDefault();
    guardarProducto();
});

lecturaDatos();
renderProductos();

