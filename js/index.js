import { productos } from "./productos.js";

const cargaProductos=document.getElementById("cartas-container")
const cardsTemplate=document.getElementById("paintCard").content
const fragment=document.createDocumentFragment()
const sideBar=document.getElementById("sideBar")
const btnCarritoCompras=document.getElementById("btnCarritoCompras")
const badge=document.getElementById("badge")
const cart=document.getElementById("cart")
const productoDentroCarrito=document.getElementById("productoDentroCarrito")

const carrito=[]

document.addEventListener("DOMContentLoaded",()=>{
    mostrarProductos(productos)
})

const mostrarProductos=(productos)=> {
    cargaProductos.innerHTML=""

    productos.map((item)=>{
        const clon=cardsTemplate.cloneNode(true)

    clon.getElementById("templateImg").setAttribute("src",item.imagen)
    clon.getElementById("templateProducto").textContent=item.nombre
    clon.getElementById("templatePrecio").textContent=item.precio
    clon.getElementById("templateButton").dataset.id=item.id

fragment.appendChild(clon)

    })
cargaProductos.appendChild(fragment)
}

const agregarCarrito=(event)=>{
    if (event.target.classList.contains("btn")) {
      guardarProducto(event.target.parentElement) 
    }
event.stopPropagation()
}

const guardarProducto=(producto)=>{
    const product={
        id: producto.querySelector("#templateButton").dataset.id,
        imagen:producto.querySelector("#templateImg").getAttribute("src",),
        nombre:producto.querySelector("#templateProducto").textContent,
        precio:producto.querySelector("#templatePrecio").textContent,
        cantidad:1
    }

const productosExistentes= carrito.findIndex((item)=>item.id===product.id)

if (productosExistentes!==-1) {
    carrito[productosExistentes].cantidad+=1
} else{
    carrito.push(product)
}
pintarBadge()
mostrarCarrito()
}

cargaProductos.addEventListener("click",(event)=>{
    agregarCarrito(event)
})

btnCarritoCompras.addEventListener("click",()=>{
    if (sideBar.style.display==="none") {
        sideBar.style.display="block"
    }
    else{
        sideBar.style.display="none"
    }
})

const pintarBadge=()=>{
const nCantidad=carrito.reduce((acc,{cantidad})=>acc+cantidad,0)
if (nCantidad===0) {
    badge.style.display="none"
}
else{
    badge.style.display="block"
    badge.textContent=nCantidad
}
}

const mostrarCarrito=()=>{
    cart.innerHTML=""
    carrito.forEach((productoSelecionado)=>{
        productoDentroCarrito.querySelector(".productoDentroCarrito").setAttribute("src",productoSelecionado.imagen)
        productoDentroCarrito.querySelector(".productoDentroCarrito").textContent = productoSelecionado.nombre
        productoDentroCarrito.querySelector(".productoDentroCarrito").textContent = productoSelecionado.precio

        const clonTwo=productoDentroCarrito.cloneNode(true)
        fragment.appendChild(clonTwo)
    })
cart.appendChild(fragment)
pintarBadge()
}


