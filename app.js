let fetchConfig = {
    method: "GET"
}
const body = document.querySelector('body')
var div = document.querySelectorAll("ol")[0]
var id = 0   
const allPokemons = 152 


async function getPokemons(){ 
    for ( i = 1; i < 9; i++){
        var urlApi = 'https://pokeapi.co/api/v2/pokemon/' + String(i)
        await fetch(urlApi,fetchConfig)
                .then(resposta => resposta.json()).then((data) => {
                    console.log(data)
                    let pokemons = data.results
                    createBox(data,id+=1);
                })
    }
}   

getPokemons();

function createBox(element,x){
    div.innerHTML += 
        `<li class="card_${element.types.map(typeInfo => typeInfo.type.name)[0]}" id="pokemons" onclick ='viewPoke(${id})'>
            <div class="circle"></div>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${element.id}.png" class="pokemonImage" alt="foto do pokemon ${element.name}" id="foto">
            <p class="pokemonId">#${id.toString().padStart(3,0)}</p>
            <p class="pokemonName">${element.name}</p>
            <p class="pokemonType">${element.types.map(typeInfo => typeInfo.type.name).join(' | ')} </p>
        </li>`
}

function viewPoke(id){
    async function req(){
        var urlApi = 'https://pokeapi.co/api/v2/pokemon/' + id
         await  fetch(urlApi,fetchConfig)
                .then(resposta => resposta.json()).then((data) => {
                    createView(data);
                })
            }
    req();
    function createView(element){
        divView = document.querySelector('.viewPoke')
        divView.style.display = 'flex'
        divView.innerHTML += 
        `
        <div class='contentView'> 
            <button class='buttonExit' onclick ='exit(this)'>X</button>
            <div class='viewLeft'>
                <div class='infoPoke'>
                    <h1>${element.name[0].toUpperCase() + element.name.substring(1)}</h1>
                    <div> 
                        <p class='infoWeight'><i class="fa-solid fa-weight-hanging"></i> Weight</p>
                        <p><span>${element.weight / 10}</span> kg</p>
                    </div>
                    <div> 
                        <p class='infoHeight'><i class="fa-solid fa-ruler"></i> Height</p>
                        <p><span>${element.height * 10}</span> cm</p>
                    </div>
                </div>

                <ul class="stats">
                    <h1>Stats</h1>
                    <li id='hp'>
                        <div class="contentBaseStat">
                            <i class="fa-solid fa-heart"></i>
                            <p>${element.stats[0].stat.name}</p>
                        </div>
                            <span>${element.stats[0].base_stat}</span>
                    </li>

                    <li id='attack'>
                        <div class="contentBaseStat">
                            <i class="fa-solid fa-burst"></i>
                            <p>${element.stats[1].stat.name}</p>
                        </div>
                        <span>${element.stats[1].base_stat}</span>
                    </li>

                    <li id='defense'>
                        <div class="contentBaseStat">
                            <i class="fa-solid fa-shield"></i>
                            <p>${element.stats[2].stat.name}</p>
                        </div>
                        <span>${element.stats[2].base_stat}</span>
                    </li>


                    <li id='speed'>
                        <div class="contentBaseStat">
                            <i class="fa-solid fa-bolt"></i>
                            <p>${element.stats[5].stat.name}</p>
                        </div>
                        <span>${element.stats[5].base_stat}</span>
                    </li>
                </ul>
                <div class="contentType">
                    <h1>Type</h1>
                    <div class="boxTypes">

                    </div>
                </div>
            </div>

            <div class='viewRight card_${element.types.map(typeInfo => typeInfo.type.name)[0]}'>
                <div class="viewCircle"> </div>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${element.id}.png" alt="foto do pokemon ${element.name}" >
            </div>
        </div>
        `
        function createBarStats(){
            var arr = [0,1,2,3,4,5]
            let arx = ['hp','attack','defense','speed']
            var contador = 0
            for (let j of arx){
                let elementStats = arr[contador]
                let li = document.getElementById(`${j}`)
                let a = document.createElement('div')

                a.className = 'barStats'
                a.innerHTML += 
                `<div>
                    <div class="levelBarra card_${element.types.map(typeInfo => typeInfo.type.name)[0]}" id='a' style="width:${element.stats[elementStats].base_stat}px;}"></div>
                </div>`
                li.appendChild(a)
                contador++;
            }
        }
        function createTypeView(){
            let totalType = element.types.map(typeInfo => typeInfo.type.name).length
            for(let i = 0; i < totalType; i++){
                let boxType = document.querySelector('.boxTypes')
                let type = document.createElement('p')

                type.className = `card_${element.types.map(typeInfo => typeInfo.type.name)[i]} `
                type.innerText = `${element.types.map(typeInfo => typeInfo.type.name)[i]}`

                boxType.appendChild(type)
            }
            
            
        }

        createTypeView();
        createBarStats();
    }
    
    createView();
}


function search_pokemon() {
    let input = document.getElementById('searchbar').value
    input = input.toLowerCase();
    let x = document.getElementsByTagName('li');
      
    for (i = 0; i < x.length; i++) { 
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display="none";
        }
        else {
            x[i].style.display="flex";
            x[i].style.height="310px"             
        }
    }
}