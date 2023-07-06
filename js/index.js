import { productos } from "./productos.js";

const cargaProductos = document.getElementById("cartas-container");
const cardsTemplate = document.getElementById("paintCard").content;
const fragment = document.createDocumentFragment();
const sideBar = document.getElementById("sideBar");
const btnCarritoCompras = document.getElementById("btnCarritoCompras");
const badge = document.getElementById("badge");
const cart = document.getElementById("sideBar");
const filtroItem = document.querySelectorAll(".filtroItem");
const iconMenu = document.querySelector(".icon-menu")
const menuHamburguesa = document.querySelector(".menu-hamburguesa")

// const musibara= new Audio("../musibara.mp3")
// window.addEventListener("scroll", ()=>{
//     if (window.scrollY>=0) {
//      musibara.play()
//      musibara.autoplay=true
//      musibara.volume=0.05
//      musibara.loop=true
//     }
// })

const productoDentroCarrito = document.getElementById(
  "productoDentroCarrito"
).content;

let carrito = {};

document.addEventListener("DOMContentLoaded", () => {
  mostrarProductos(productos);

  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    mostrarCarrito();
  }
  menuHamburguesa.style.display="none"
});

const mostrarProductos = (productos) => {
  cargaProductos.innerHTML = "";

  productos.map((item) => {
    const clon = cardsTemplate.cloneNode(true);

    clon.getElementById("templateImg").setAttribute("src", item.imagen);
    clon.getElementById("templateProducto").textContent = item.nombre;
    clon.getElementById("templatePrecio").textContent = "$" + item.precio;
    clon.getElementById("templateButton").dataset.id = item.id;

    fragment.appendChild(clon);
  });
  cargaProductos.appendChild(fragment);
};

const agregarCarrito = (event) => {
  if (event.target.classList.contains("btn")) {
    guardarProducto(event.target.parentElement);
  }
  event.stopPropagation();
};

const guardarProducto = (producto) => {
  const product = {
    id: producto.querySelector("#templateButton").dataset.id,
    imagen: producto.querySelector("#templateImg").getAttribute("src"),
    nombre: producto.querySelector("#templateProducto").textContent,
    precio: producto.querySelector("#templatePrecio").textContent,
    cantidad: 1,
  };

  if (carrito.hasOwnProperty(product.id)) {
    product.cantidad = carrito[product.id].cantidad + 1;
  }

  carrito[product.id] = { ...product };

  mostrarCarrito();
};

cargaProductos.addEventListener("click", (event) => {
  agregarCarrito(event);
});

btnCarritoCompras.addEventListener("click", () => {
  if (sideBar.style.display === "none") {
    sideBar.style.display = "block";
  } else {
    sideBar.style.display = "none";
  }
});

const pintarBadge = () => {
  const nCantidad = Object.values(carrito).reduce(
    (acc, { cantidad }) => acc + cantidad,
    0
  );
  if (nCantidad === 0) {
    badge.style.display = "none";
  } else {
    badge.style.display = "block";
    badge.textContent = nCantidad;
  }
};

const mostrarCarrito = () => {
  cart.innerHTML = "";
  Object.values(carrito).forEach((productoSelecionado) => {
    let str = productoSelecionado.precio;
    let num = str.replace(/\$/g, "");

    productoDentroCarrito
      .querySelector(".templateAñadidoCarritoImg")
      .setAttribute("src", productoSelecionado.imagen);
    productoDentroCarrito.querySelector(
      ".templateAñadidoCarritoProducto"
    ).textContent = productoSelecionado.nombre;
    productoDentroCarrito.querySelector(
      ".templateCantidadCarrito"
    ).textContent = productoSelecionado.cantidad;
    productoDentroCarrito.querySelector(
      ".templateAñadidoCarritoPrecio"
    ).textContent = "$" + parseInt(num) * productoSelecionado.cantidad;
    productoDentroCarrito.querySelector(".borrarCarrito").dataset.id =
      productoSelecionado.id;

    const clonTwo = productoDentroCarrito.cloneNode(true);
    fragment.appendChild(clonTwo);
  });
  cart.appendChild(fragment);

  localStorage.setItem("carrito", JSON.stringify(carrito));

  if (localStorage.getItem("carrito") === "{}") {
    cart.innerHTML = `<p class="pSideBar">No hay carpinchos en el carritobara 😥</p>`;
  }

  pintarBadge();
};

sideBar.addEventListener("click", (e) => {
  cartBtnActions(e);
});

const cartBtnActions = (e) => {
  if (e.target.classList.contains("borrarCarrito")) {
    delete carrito[e.target.dataset.id];
    mostrarCarrito();
  }
  e.stopPropagation();
};

filtroItem.forEach((item)=>{
    item.addEventListener("click",()=>{
        const itemFiltrado = item.textContent
        if (itemFiltrado !== "todos") {
            const capibaraYaFiltrado = productos.filter((capibara)=>capibara.rareza===itemFiltrado)
            mostrarProductos(capibaraYaFiltrado)
        }
        else {
            mostrarProductos(productos)
        }
    })
})

iconMenu.addEventListener("click", ()=>{
 if ( menuHamburguesa.style.display==="none") {
  menuHamburguesa.style.display="block"
 }
 else { menuHamburguesa.style.display="none"}
})
