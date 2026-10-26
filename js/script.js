let currentNum = 1;
let endNum = 20;
// let currentPkm;
let pkmQuantity = 1025;
const content = document.querySelector('[data-id=content]');
let currentPkmDetails = [];

async function init() {
    for (currentNum; currentNum <= endNum; currentNum++) {
        await render(currentNum);
    }
}

async function render(currentNum) {
    await getCurrentPkmDetails(currentNum);
    await loadToLocalStorage();
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
    let inputValue = document.querySelector('[data-id="search-input"]');
    if (inputValue.value.length < 3) {
        content.innerHTML = '';
        currentNum = 1;
        endNum;
        init();
    } else {
        content.innerHTML = '';
        for (let i = 1; i <= pkmQuantity; i++) {
            let responseToJson = await fetchPkmAPI(i);
            if ((responseToJson.name).includes(inputValue.value)) {
                render(i);
            }
        }
    }

}



async function fetchPkmAPI(currentNum) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${currentNum}`);
    let responseToJson = await response.json();
    return responseToJson;
}