async function getCurrentPkmDetails(currentNum) {
    let responseToJson = await fetchPkmAPI(currentNum);
    currentPkmDetails[currentNum] = {
        "id": await responseToJson.id,
        "name": capitalizeFirstLetters(await responseToJson.name),
        "types": await getPkmTypes(responseToJson),
        "abilities": await getPkmAbilities(responseToJson),
        "stats": await getPkmStats(responseToJson),
        "height": await responseToJson.height,
        "weight": await responseToJson.weight,
        "bgColor": await responseToJson.types[0].type.name,
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
        arrOfPkmAbilities += `<tr><td class="font-montserrat">${responseToJson.abilities[i].ability.name}</td></tr>`
    }
    return arrOfPkmAbilities
}

async function getPkmStats(responseToJson) {
    let arrOfPkmStats = [];
    for (let i = 0; i < responseToJson.stats.length; i++) {
        arrOfPkmStats += `
            <tr>
                <th class="font-montserrat">${responseToJson.stats[i].stat.name}</th>
                <td class="font-silkscreen">${responseToJson.stats[i].base_stat}</td>
            </tr>
        `
    }
    return arrOfPkmStats
}

async function getPkmImg(currentNum) {
    let pkmImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${currentNum}.svg`;
    return pkmImg
}

async function getQuantityOfPkms() {
    let pkmQuantity = await fetch('https://pokeapi.co/api/v2/pokemon-species');
    let pkmQuantityJson = await pkmQuantity.json()
    return pkmQuantityJson.count
}