let currentNum = 1;
let endNum = 20;
// let currentPkm;
// let pkmQuantity = 1025;
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

async function getCurrentPkmDetails(currentNum) {
    let responseToJson = await fetchPkmAPI(currentNum);
    currentPkmDetails[currentNum] = {
        "id": await responseToJson.id,
        "name": capitalizeFirstLetters(await responseToJson.name),
        "types": await getPkmTypes(currentNum),
        "abilities": await getPkmAbilities(currentNum),
        "stats": await getPkmStats(currentNum),
        "height": await responseToJson.height,
        "weight": await responseToJson.weight,
        "bgColor": await responseToJson.types[0].type.name,
        "img": await getPkmImg(currentNum),
    }
    return currentPkmDetails
}

async function getPkmTypes(currentNum) {
    let responseToJson = await fetchPkmAPI(currentNum);
    const arrOfPkmTypes = [];
    for (let i = 0; i < responseToJson.types.length; i++) {
        arrOfPkmTypes.push(responseToJson.types[i].type.name)
    }
    return arrOfPkmTypes
}

async function getPkmAbilities(currentNum) {
    let responseToJson = await fetchPkmAPI(currentNum);
    let arrOfPkmAbilities = [];
    for (let i = 0; i < responseToJson.abilities.length; i++) {
        arrOfPkmAbilities += `<tr><td>${responseToJson.abilities[i].ability.name}</td></tr>`
    }
    return arrOfPkmAbilities
}

async function getPkmStats(currentNum) {
    let responseToJson = await fetchPkmAPI(currentNum);
    let arrOfPkmStats = [];
    for (let i = 0; i < responseToJson.stats.length; i++) {
        arrOfPkmStats += `
            <tr>
                <th>${responseToJson.stats[i].stat.name}</th>
                <td>${responseToJson.stats[i].base_stat}</td>
            </tr>
        `
    }
    return arrOfPkmStats
}

async function getPkmImg(currentNum) {
    let pkmImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${currentNum}.svg`;
    return pkmImg
}

function loadMorePkm() {
    endNum = endNum + 20;
    init();
}

async function searchPkm() {
    let searchedPkm = convertLetterToLowerCase(inputValue.value);
    content.innerHTML = '';
    if (inputValue.value.length <= 2) {
        currentNum = 1;
        init();
        loadMoreBtn.style.display = 'flex';
    } else {
        loadMoreBtn.style.display = 'none';
        activateLoadingScreen()
        await lookForSearchedPkm(searchedPkm)
        deactivateLoadingScreen()
    }
}

async function lookForSearchedPkm(searchedPkm) {
    for (let i = 1; i <= await getQuantityOfPkms(); i++) {
        let responseToJson = await fetchPkmAPI(i);
        if ((convertLetterToLowerCase(responseToJson.name)).includes(searchedPkm)) {
            render(i);
        }
    }
}

function activateLoadingScreen() {
    loadingOverlay.style.display = 'flex';
    document.body.classList.add('no-scroll')
}

function deactivateLoadingScreen() {
    loadingOverlay.style.display = 'none';
    document.body.classList.remove('no-scroll')
}



// Using REGEX to change only the first letter of each word - after a space or symbol like "-"
// Structure of Regex-Literal: /PATTERN/FLAGS
// \b - search for a beginning letter, a letter after a space or "-" ("_" REGEX treat it like a letter)
// \w - search for the first letter after a boundary (/b) 
function capitalizeFirstLetters(currentPkmName) {
    return currentPkmName.replace(/\b\w/g, char => char.toUpperCase());
}

// This is used so that the case (upper/lower case) does not matter during a search
function convertLetterToLowerCase(currentPkmName) {
    return currentPkmName.toLowerCase()
}

async function getQuantityOfPkms() {
    let pkmQuantity = await fetch('https://pokeapi.co/api/v2/pokemon-species');
    let pkmQuantityJson = await pkmQuantity.json()
    return pkmQuantityJson.count
}

async function fetchPkmAPI(currentNum) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${currentNum}`);
    let responseToJson = await response.json();
    return responseToJson;
}