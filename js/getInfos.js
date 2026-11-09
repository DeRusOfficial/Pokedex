async function getCurrentPkmDetails(currentNum) {
    let responseToJson = await fetchPkmAPI(currentNum);
    currentPkmDetails[currentNum] = {
        "id": responseToJson.id,
        "name": capitalizeFirstLetters(responseToJson.name),
        "types": await getPkmTypes(responseToJson),
        "abilities": await getPkmAbilities(responseToJson),
        "stats": await getPkmStats(responseToJson),
        "height": responseToJson.height,
        "weight": responseToJson.weight,
        "bgColor": responseToJson.types[0].type.name,
        "img": await getPkmImg(currentNum),
    }
    return currentPkmDetails
}

async function getPkmTypes(responseToJson) {
    const arrOfPkmTypes = [];
    for (let i = 0; i < responseToJson.types.length; i++) {
        arrOfPkmTypes.push(responseToJson.types[i].type.name)
    }
    return arrOfPkmTypes
}

async function getPkmAbilities(responseToJson) {
    let arrOfPkmAbilities = [];
    for (let i = 0; i < responseToJson.abilities.length; i++) {
        arrOfPkmAbilities += `<td class="font-montserrat">${responseToJson.abilities[i].ability.name}</td>`
    }
    return arrOfPkmAbilities
}

async function getPkmStats(responseToJson) {
    let arrOfPkmStats = [];
    for (let i = 0; i < responseToJson.stats.length; i++) {
        arrOfPkmStats += returnPkmStats(responseToJson, i)
    }
    return arrOfPkmStats
}

async function getPkmImg(currentNum) {
    let pkmImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${currentNum}.svg`;
    return pkmImg
}