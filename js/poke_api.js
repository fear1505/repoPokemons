let root = document.getElementById("root");
const contentCards = document.createElement("div")
contentCards.classList.add("content_cards")
let fragment = document.createDocumentFragment();
const url = "https://pokeapi.co/api/v2/pokemon";

const carrito = []

document.addEventListener("DOMContentLoaded", ()=>{
  fetchPokemons()
})

function createHeader(){
  let header = document.createElement("header");
  header.classList.add("header");
  let text = document.createElement("h1");
  text.classList.add("text_header");
  text.textContent = "POKEMONS";
  
  root.appendChild(header);
  header.appendChild(text);
}

const fetchPokemons = async () => {
   try {
    const res = await fetch(url)
    const data = await res.json()

    //console.log(data.results)

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
   //console.log(data)
  const pokemon = {
    img: data.sprites.front_default,
    name: data.name,
    exp: data.base_experience,
    height: data.height,
    weight: data.weight,
    abilities: data.abilities[0].ability.name,
    id: data.id
  }
  const card = document.createElement("div")
  card.classList.add("card")
  createFaceCard(pokemon, card)
  createBackCard(pokemon, card)
}

function createFaceCard(pokemon, card){  
  //console.log(pokemon)

  const cardFace = document.createElement("div")
  cardFace.classList.add("face")
  cardFace.classList.add("front")

  const cardContentImg = document.createElement("div")
  cardContentImg.classList.add("card_container_img")

  const imgCard = document.createElement("img")
  imgCard.src = pokemon.img
  
  const titleCard = document.createElement("h3")
  titleCard.classList.add("card_title")
  titleCard.textContent = pokemon.name

  const price = document.createElement("p")
  price.classList.add("precio")
  price.textContent = `$ ${pokemon.exp}`

  const contentBtn = document.createElement("div")
  contentBtn.classList.add("container__btn")

  const btnDetail = document.createElement("button")
  btnDetail.classList.add("btn")
  btnDetail.textContent = "DETALLE"
  btnDetail.dataset.id = pokemon.id

  const btnCarrito  = document.createElement("button")
  btnCarrito.classList.add("btn")
  btnCarrito.textContent = "COMPRAR"
  
  card.appendChild(cardFace)
  cardFace.appendChild(cardContentImg)
  cardContentImg.appendChild(imgCard)
  cardFace.appendChild(titleCard)
  cardFace.appendChild(contentBtn)
  contentBtn.appendChild(btnCarrito)
  contentBtn.appendChild(btnDetail)
  contentCards.appendChild(card)
  fragment.appendChild(contentCards)
  root.appendChild(fragment)

  cardFace.addEventListener("click", e =>{
    if(e.target.dataset.id === btnDetail.dataset.id){
      card.classList.add("active")
    }
  })
}

function createBackCard(pokemon, card){
  //console.log(data,card)
  const cardBack = document.createElement("div")
  cardBack.classList.add("back")
  cardBack.classList.add("face")

  const pokeName = document.createElement("h3")
  pokeName.textContent = `Nombre: ${pokemon.name}`

  const pokeExp = document.createElement("h3")
  pokeExp.textContent = `Experiencia: ${pokemon.exp}`

  const pokeHeight = document.createElement("h3")
  pokeHeight.textContent = `Altura: ${pokemon.height}cm`

  const pokeWeight = document.createElement("h3")
  pokeWeight.textContent = `Peso: ${pokemon.weight}kg`

  const pokeAbilities = document.createElement("h3")
  pokeAbilities.textContent = `Habilidad: ${pokemon.abilities}`
  
  const btnReturn = document.createElement("button")
  btnReturn.dataset.id = pokemon.id
  btnReturn.classList.add("btn_back")
  btnReturn.textContent = "REGRESAR"

  card.appendChild(cardBack)
  cardBack.appendChild(pokeName)
  cardBack.appendChild(pokeExp)
  cardBack.appendChild(pokeHeight)
  cardBack.appendChild(pokeWeight)
  cardBack.appendChild(pokeAbilities)
  cardBack.appendChild(btnReturn)
  contentCards.appendChild(card)
  fragment.appendChild(contentCards)
  root.appendChild(fragment)

  cardBack.addEventListener("click", e =>{
    if(e.target.dataset.id === btnReturn.dataset.id){
      card.classList.remove("active")
    }
  })
}

createHeader()


