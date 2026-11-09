let currentNum = 1;
let endNum = 20;
let currentPkmDetails = [];
let inputValue = document.querySelector('[data-id="search-input"]');
const content = document.querySelector('[data-id=content]');
const loadingOverlay = document.getElementById('loadingOverlay');
const dialogRef = document.querySelector('[data-id="dialog"]');
const loadMoreBtn = document.querySelector('[data-id=load-more-button]');



async function init() {
    activateLoadingScreen()
    try {
        for (currentNum; currentNum <= endNum; currentNum++) {
            await loadToLocalStorage(currentNum);
            await render(currentNum);
        }
    } catch (error) {
        console.log(error);
    } finally {
        deactivateLoadingScreen();
    }
}

async function render(currentNum) {
    let pokemon = JSON.parse(localStorage.listOfPkms);
    loadCard(currentNum, pokemon);
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