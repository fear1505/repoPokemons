let root = document.getElementById("root");
const contentCards = document.createElement("div")
contentCards.classList.add("content_cards")
let fragment = document.createDocumentFragment();
const url = "https://pokeapi.co/api/v2/pokemon";

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
    abilities: data.abilities[0].ability.name
  }
  createFaceCard(pokemon)
}

function createFaceCard(pokemon){  
  const card = document.createElement("div")
  card.classList.add("card")

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
  
  card.appendChild(cardFace)
  cardFace.appendChild(cardContentImg)
  cardContentImg.appendChild(imgCard)
  cardFace.appendChild(titleCard)
  contentCards.appendChild(card)
  fragment.appendChild(contentCards)
  root.appendChild(fragment)
}

function createBackCard(data){
  
}



//getPokemons()
createHeader()


