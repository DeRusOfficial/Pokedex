let startNum;
let endNum;
let currentPkm;
let pkmQuantity = 1025;
const content = document.querySelector('[data-id=content]');
const currentPkmDetails = [];

function init() {
    startNum = 1;
    endNum = 20;
    render();
}

async function render() {
    for (startNum; startNum <= endNum; startNum++) {
        content.innerHTML += await loadCard(startNum);
    }
}

async function fetchPkmAPI(x) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${x}`);
    let responseToJson = await response.json();
    return responseToJson;
}

async function loadToLocalStorage(currentPkm) {
    localStorage.listOfPkms = JSON.strigify({
        "pokemon" : await getCurrentPkmDetails(currentPkm)
    })
}

async function getCurrentPkmDetails(currentPkm) {
    let responseToJson = await fetchPkmAPI(currentPkm);
    currentPkmDetails[currentPkm] = {
        "id" : await responseToJson.id,
        "name" : await responseToJson.name,
        "types" : await responseToJson.types,
        "abilities" : await responseToJson.abilities,
        "stats" : await responseToJson.stats,
        "height" : await responseToJson.height,
        "weight" : await responseToJson.weight,
        "bgColor" : await responseToJson.types[0].type.name,
    }

    return currentPkmDetails[currentPkm]
}