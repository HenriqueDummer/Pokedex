const pokemon_img = document.querySelector(".pokemon_img")
const pokemon_name = document.querySelector(".name")
const pokemon_id = document.querySelector(".id")
const next = document.querySelector(".next")
const previous = document.querySelector(".previous")
const form = document.querySelector(".form")
const input_search = document.querySelector(".input_search")
const pokeball = document.querySelector(".pokeball")
let pokemon_selector = 1

pokeball.classList.add("hide")


const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if(APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    pokeball.classList.remove("hide")
    pokemon_id.innerHTML = ''
    pokemon_name.innerHTML = "Pesquisando.."
    
    const data = await fetchPokemon(pokemon);
    pokeball.classList.add("hide")

    if(data){

        pokemon_img.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"]
        pokemon_name.innerHTML = data["name"]
        pokemon_id.innerHTML = data["id"]
        pokemon_selector = data["id"]
    } else{
        pokemon_img.src = 'https://i.pinimg.com/originals/0c/b2/36/0cb236777f219f7ddb6d21a8ac7ff2fa.png'
        pokemon_name.innerHTML = "Não Encontrado :("
        pokemon_id.innerHTML = ''
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault()

    renderPokemon(input_search.value.toLowerCase())
    input_search.value = ''
})

next.addEventListener("click", () => {
    if(pokemon_selector < 649){
        pokemon_selector += 1;
        renderPokemon(pokemon_selector)
    } else{
        pokemon_selector = 1;
        renderPokemon(pokemon_selector)
    }
})

previous.addEventListener("click", () => {
    if(pokemon_selector > 1){
        pokemon_selector -= 1;
        renderPokemon(pokemon_selector)
    } else {
        pokemon_selector = 649;
        renderPokemon(pokemon_selector)
    }
})

renderPokemon(pokemon_selector)

pokemon_name.innerHTML = "images/594337-200.png"
