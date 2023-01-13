let fetchConfig = {
    method: "GET"
}

var div = document.querySelectorAll("ol")[0]
var id = 0   
for ( i = 1; i < 19; i++){
    var urlApi = 'https://pokeapi.co/api/v2/pokemon/' + String(i)
    fetch(urlApi,fetchConfig)
            .then(resposta => resposta.json()).then((data) => {
                // console.log(data)
                let pokemons = data.results
                createBox(data,id+=1);
            })
}
   
function createBox(element,x){
    div.innerHTML += 
        `<li class="card_${element.types.map(typeInfo => typeInfo.type.name)[0]}" id="pokemons">
            <div class="circle"></div>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${element.id}.gif" class="pokemonImage" alt="foto do pokemon ${element.name}" id="foto">
            <p class="pokemonId">#${id.toString().padStart(3,0)}</p>
            <p class="pokemonName">${element.name}</p>
            <p class="pokemonType">${element.types.map(typeInfo => typeInfo.type.name).join(' | ')} </p>
        </li>`
 }