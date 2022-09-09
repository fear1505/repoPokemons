let root = document.getElementById("root");
let fragment = document.createDocumentFragment();
const url = "https://pokeapi.co/api/v2/pokemon";

function createHeader(){
  let header = document.createElement("header");
  header.classList.add("header");
  let text = document.createElement("h1");
  text.classList.add("text_header");
  text.textContent = "POKEMONS";
  
  root.appendChild(header);
  header.appendChild(text);
}

function createFaceCard(data ,id , card){
  let cardFace = document.createElement("div")
  cardFace.classList.add("face")
  cardFace.classList.add("front")

  let containerImg = document.createElement("div");
  containerImg.classList.add("card_container_img");

  let imgPoke = document.createElement("img");
  imgPoke.src = data.sprites.front_default;

  let titlePoke = document.createElement("h2");
  titlePoke.classList.add("card_title");
  titlePoke.textContent = data.name[0].toUpperCase() + data.name.substring(1);

  let btn = document.createElement("button");
  btn.classList.add("btn");
  btn.dataset.id = id;
  btn.textContent = "DETALLE";

  btn.addEventListener("click", () =>{
    card.classList.add("active")
  })

  cardFace.appendChild(containerImg);
  containerImg.appendChild(imgPoke);
  cardFace.appendChild(titlePoke);
  cardFace.appendChild(btn);
  card.appendChild(cardFace)
}

function createBackCard(data, card){
  let cardBack = document.createElement("div")
  cardBack.classList.add("face")
  cardBack.classList.add("back")

  let pokeAbilities = document.createElement("h3")
  pokeAbilities.textContent = `Habilidad: ${data.abilities[0].ability.name}`

  let pokeExpe = document.createElement("h3")
  pokeExpe.textContent = `Experiencia: ${data.base_experience}` 

  let pokeweight = document.createElement("h3")
  pokeweight.textContent = `Peso: ${data.weight}`

  let pokeMove = document.createElement("h3")
  pokeMove.textContent = `Movimiento: ${data.moves[0].move.name}` 

  let btnBack = document.createElement("button")
  btnBack.classList.add("btn_back")
  btnBack.textContent = "REGRESAR"

  btnBack.addEventListener("click", ()=>{
    card.classList.remove("active")
  })
    
  cardBack.appendChild(pokeAbilities)
  cardBack.appendChild(pokeExpe)
  cardBack.appendChild(pokeweight)
  cardBack.appendChild(pokeMove)
  cardBack.appendChild(btnBack)
  card.appendChild(cardBack)
}

function getPokemons(){
  fetch(url)
  .then(res => res.json())
  .then(data => {
    let container = document.createElement("main");
    container.classList.add("main");
    
    let containerCard = document.createElement("div")
    containerCard.classList.add("content_cards")

    for (const i of data.results) {
      console.log(i.url)
      fetch(i.url)
      .then(res => res.json())
      .then(data => {
        let card = document.createElement("div");
        card.classList.add("card");
        
        let id = data.id;

        createFaceCard(data, id, card)
        createBackCard(data, card)

        fragment.appendChild(containerCard);
        containerCard.appendChild(card)
        container.appendChild(fragment);
      })
    }
    root.appendChild(container);
  })
}

getPokemons()
createHeader()


