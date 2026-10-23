let currentNum;
let endNum;
// let currentPkm;
let pkmQuantity = 1025;
const content = document.querySelector('[data-id=content]');
let currentPkmDetails = [];

function init() {
    currentNum = 1;
    endNum = 20;
    for (currentNum; currentNum <= endNum; currentNum++) {
        render(currentNum);
    } 
}

async function render(currentNum) {
        await getCurrentPkmDetails(currentNum);
        loadToLocalStorage();
        loadCard(currentNum);
}

async function loadToLocalStorage() {
    localStorage.listOfPkms = JSON.stringify({
        "pokemon": await getCurrentPkmDetails(currentNum),
    })
}

async function getCurrentPkmDetails(currentNum) {
    let responseToJson = await fetchPkmAPI(currentNum);
    currentPkmDetails[currentNum] = {
        "id": await responseToJson.id,
        "name": await responseToJson.name,
        "types": await getTypesOfPkm(currentNum),
        "abilities": await getAbilitiesOfPkm(currentNum),
        "stats": await responseToJson.stats,
        "height": await responseToJson.height,
        "weight": await responseToJson.weight,
        "bgColor": await responseToJson.types[0].type.name,
        "img" : await getPkmImg(currentNum),
    }
    return currentPkmDetails
}

async function getTypesOfPkm(currentNum) {
    let responseToJson = await fetchPkmAPI(currentNum);
    const arrOfPkmTypes = [];
    for (let i = 0; i < responseToJson.types.length; i++) {
        arrOfPkmTypes.push(responseToJson.types[i].type.name)
    }
    return arrOfPkmTypes
} 

async function getAbilitiesOfPkm(currentNum) {
    let responseToJson = await fetchPkmAPI(currentNum);
    const arrOfPkmAbilities = [];
    for (let i = 0; i < responseToJson.abilities.length; i++) {
        arrOfPkmAbilities.push(responseToJson.abilities[i].ability.name)
    }
    return arrOfPkmAbilities
} 

async function getPkmImg(currentNum) {
    let pkmImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${currentNum}.svg`;
    return pkmImg
}



async function fetchPkmAPI(currentNum) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${currentNum}`);
    let responseToJson = await response.json();
    return responseToJson;
}