let root = document.getElementById("root");
let seccionCarrito = document.querySelector(".carrito")
const contenedorCard = document.createElement("div")
contenedorCard.classList.add("contenedor_cards")
const productos = document.getElementById("productos")
let fragment = document.createDocumentFragment();
const url = "https://pokeapi.co/api/v2/pokemon";
location.hash = "#productos"

let carrito = []
document.addEventListener("DOMContentLoaded", ()=>{
  fetchPokemons()
})

contenedorCard.addEventListener("click", e =>{
  agregarAlCarrito(e)
})

productos.addEventListener("click", (e)=>{
  btnAccion(e)
})

window.addEventListener("hashchange", e =>{
  seccionCarrito.classList.remove("carrito_activo")
  contenedorCard.classList.add("inactivo")
  switch(location.hash){
    case "#productos": contenedorCard.classList.remove("inactivo")
    break
    case "#carrito": seccionCarrito.classList.add("carrito_activo")
    break
  }
})

const fetchPokemons = async () => {
   try {
    const res = await fetch(url)
    const data = await res.json()

    data.results.forEach(item =>{
      fetch(item.url)
      .then(res => res.json())
      .then(data =>{
        pokemon(data)
      })
    })
   } catch (error) {
    console.log(error)
  }
}

const pokemon = data =>{
  const pokemon = {
    img: data.sprites.front_default,
    name: data.name,
    exp: data.base_experience,
    precio: parseInt(data.base_experience),
    height: data.height,
    weight: data.weight,
    abilities: data.abilities[0].ability.name,
    id: data.id
  }
  const card = document.createElement("div")
  card.classList.add("contenedor_cards__card")
  card.id = pokemon.id
  crearCardFrontal(pokemon, card)
  crearCardTrasera(pokemon, card)
}

function crearHeader(){
  let header = document.createElement("header");
  header.classList.add("header");
  let text = document.createElement("h1");
  text.classList.add("header__text");
  text.textContent = "POKEMONS";

  let divHeader = document.createElement("a")

  let logoCarrito = document.createElement("img")
  logoCarrito.classList.add("header__logo")
  logoCarrito.src = "./img/compra.png"

  let contadorCarrito = document.createElement("p")
  contadorCarrito.classList.add("header__contador")
  contadorCarrito.textContent = "0"
  
  header.appendChild(text);
  divHeader.appendChild(logoCarrito)
  divHeader.appendChild(contadorCarrito)
  header.appendChild(divHeader)
  root.appendChild(header);

  divHeader.addEventListener("click", e =>{
    location.hash = "#carrito"
    seccionCarrito.classList.add("carrito_activo")
    contenedorCard.classList.add("inactivo")
  })
  
  text.addEventListener("click", e =>{
    location.hash = "#productos"
    seccionCarrito.classList.remove("carrito_activo")
    contenedorCard.classList.remove("inactivo")
  })
}

function crearCardFrontal(pokemon, card){  
  const cardFrontal = document.createElement("div")
  cardFrontal.classList.add("contenedor_cards__card__cara")
  cardFrontal.classList.add("contenedor_cards__card__frontal")

  const contenedorImg = document.createElement("div")
  contenedorImg.classList.add("contenedor_cards__card__frontal__img")

  const imgCard = document.createElement("img")
  imgCard.src = pokemon.img

  const contenedorTituloPrecio = document.createElement("div")
  contenedorTituloPrecio.classList.add("contenedor_cards__card__frontal__titulo_precio")
  
  const titiloCard = document.createElement("h3")
  titiloCard.classList.add("contenedor_cards__card__frontal__titulo_precio__h3")
  titiloCard.textContent = pokemon.name

  const precio = document.createElement("p")
  precio.classList.add("contenedor_cards__card__frontal__titulo_precio__precio")
  precio.textContent = pokemon.precio

  const contenedorBtn = document.createElement("div")
  contenedorBtn.classList.add("contenedor_cards__card__frontal__btn")

  const detalleBtn = document.createElement("button")
  detalleBtn.classList.add("btn")
  detalleBtn.textContent = "DETALLE"
  detalleBtn.dataset.id = pokemon.id

  const carritoBtn  = document.createElement("button")
  carritoBtn.classList.add("btn")
  carritoBtn.id = pokemon.id
  carritoBtn.textContent = "COMPRAR"
  
  card.appendChild(cardFrontal)
  cardFrontal.appendChild(contenedorImg)
  contenedorImg.appendChild(imgCard)
  cardFrontal.appendChild(contenedorTituloPrecio)
  contenedorTituloPrecio.appendChild(titiloCard)
  contenedorTituloPrecio.append(precio)
  cardFrontal.appendChild(contenedorBtn)
  contenedorBtn.appendChild(carritoBtn)
  contenedorBtn.appendChild(detalleBtn)
  contenedorCard.appendChild(card)
  fragment.appendChild(contenedorCard)
  root.appendChild(fragment)
  
  cardFrontal.addEventListener("click", e =>{
    if(e.target.dataset.id === detalleBtn.dataset.id){
      card.classList.add("active")
    }
  })

}

function crearCardTrasera(pokemon, card){
  const cardEspalda = document.createElement("div")
  cardEspalda.classList.add("contenedor_cards__card__espalda")
  cardEspalda.classList.add("contenedor_cards__card__cara")

  const pokeNombre = document.createElement("h3")
  pokeNombre.textContent = `Nombre: ${pokemon.name}`

  const pokeExp = document.createElement("h3")
  pokeExp.textContent = `Experiencia: ${pokemon.exp}`

  const pokeAltura = document.createElement("h3")
  pokeAltura.textContent = `Altura: ${pokemon.height}cm`

  const pokePeso = document.createElement("h3")
  pokePeso.textContent = `Peso: ${pokemon.weight}kg`

  const pokeHabilidad = document.createElement("h3")
  pokeHabilidad.textContent = `Habilidad: ${pokemon.abilities}`
  
  const regresarBtn = document.createElement("button")
  regresarBtn.dataset.id = pokemon.id
  regresarBtn.classList.add("contenedor_cards__card__espalda__btn")
  regresarBtn.textContent = "REGRESAR"

  card.appendChild(cardEspalda)
  cardEspalda.appendChild(pokeNombre)
  cardEspalda.appendChild(pokeExp)
  cardEspalda.appendChild(pokeAltura)
  cardEspalda.appendChild(pokePeso)
  cardEspalda.appendChild(pokeHabilidad)
  cardEspalda.appendChild(regresarBtn)
  contenedorCard.appendChild(card)
  fragment.appendChild(contenedorCard)
  root.appendChild(fragment)

  cardEspalda.addEventListener("click", e =>{
    if(e.target.dataset.id === regresarBtn.dataset.id){
      card.classList.remove("active")
    }
  })
}

const agregarAlCarrito = (e) => {
  if(e.target.textContent === "COMPRAR"){
    setcarrito(e.target.parentElement.parentElement)
  }
}

const setcarrito = (e) => {

  const producto = {
    id: e.querySelector(".btn").id,
    nombre: e.querySelector('.contenedor_cards__card__frontal__titulo_precio__h3').textContent,
    precio: parseInt(e.querySelector(".contenedor_cards__card__frontal__titulo_precio__precio").textContent),
    cantidad: 1
  }
  
  const index = carrito.findIndex(item =>{
    return item.id === producto.id
  })

  if(index === -1){
    carrito.push(producto)
  }else{
    carrito[index].cantidad++
  }

  pintarCarrito()
}

const pintarCarrito = () =>{
  const template = document.querySelector("#template-carrito").content
  document.querySelector(".header__contador").textContent = carrito.length
  productos.innerHTML = ``
  
  carrito.forEach((item)=>{
    template.querySelector("th").textContent = item.id
    template.querySelectorAll("td")[0].textContent = item.nombre
    template.querySelectorAll("td")[1].textContent = item.cantidad
    template.querySelector("span").textContent =  item.cantidad * item.precio
    template.querySelector(".btn-aumentar").dataset.id = item.id
    template.querySelector(".btn-disminuir").dataset.id = item.id
    const clone = template.cloneNode(true)
    fragment.appendChild(clone)
  })
  productos.appendChild(fragment)
  pintarFooter()
  
}

const pintarFooter = () =>{
  const footer = document.querySelector("#footer")
  const templateFooter = document.querySelector("#template-footer").content
  footer.innerHTML = ``

  if(carrito.length === 0){
    footer.innerHTML = `
      <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
    `
    return
  }

  const nCantidad = carrito.reduce((acc, item) =>{
    return acc + item.cantidad
  }, 0)

  const nPrecio = carrito.reduce((acc , item)=>{
    return acc + item.cantidad * item.precio
  }, 0)
  
  templateFooter.querySelectorAll("td")[0].textContent = nCantidad
  templateFooter.querySelector("span").textContent = nPrecio
  const clone = templateFooter.cloneNode(true)
  fragment.appendChild(clone)
  footer.appendChild(fragment)

  const vaciarCarrito = document.getElementById("vaciar-carrito")
  vaciarCarrito.addEventListener("click", ()=>{
    carrito = []
    pintarCarrito()
  })
}

const btnAccion = e =>{
  if(e.target.classList.contains("btn-aumentar")){
    carrito.forEach(item=>{
      if(item.id === e.target.dataset.id){
        item.cantidad++
        pintarCarrito()
      }
    })
  }
  
  if(e.target.classList.contains("btn-disminuir")){
    carrito.forEach(item=>{
      if(item.id === e.target.dataset.id){
        item.cantidad--  
      }
      if(item.cantidad === 0){
        const indice = carrito.findIndex(i =>{return i.id === item.id})
        carrito.splice(indice, 1)
      } 
    pintarCarrito()
    })
  }
}

crearHeader()


