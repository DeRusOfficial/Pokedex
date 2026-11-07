let currentNum = 1;
let endNum = 20;
const content = document.querySelector('[data-id=content]');
let inputValue = document.querySelector('[data-id="search-input"]');
const loadMoreBtn = document.querySelector('[data-id=load-more-button]');
const loadingOverlay = document.getElementById('loadingOverlay');
let currentPkmDetails = [];



async function init() {
    activateLoadingScreen()
    for (currentNum; currentNum <= endNum; currentNum++) {
        await render(currentNum);
    }
    deactivateLoadingScreen()
}

async function render(currentNum) {
    await loadToLocalStorage(currentNum);
    loadCard(currentNum);
}

async function loadToLocalStorage(currentNum) {
    localStorage.listOfPkms = JSON.stringify({
        "pokemon": await getCurrentPkmDetails(currentNum),
    })
}

async function fetchPkmAPI(currentNum) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${currentNum}`);
    let responseToJson = await response.json();
    return responseToJson;
}