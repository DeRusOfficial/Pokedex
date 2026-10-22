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
        await getCurrentPkmDetails(currentNum)

        content.innerHTML += await loadCard(currentNum);

}

async function fetchPkmAPI(x) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${x}`);
    let responseToJson = await response.json();
    return responseToJson;
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
        "types": await responseToJson.types,
        "abilities": await responseToJson.abilities,
        "stats": await responseToJson.stats,
        "height": await responseToJson.height,
        "weight": await responseToJson.weight,
        "bgColor": await responseToJson.types[0].type.name,
    }
    return currentPkmDetails
}