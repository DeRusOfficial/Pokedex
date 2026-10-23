function loadCard(currentNum) {
    // let responseToJson = await fetchPkmAPI(startNum);
    let pokemon = JSON.parse(localStorage.listOfPkms)
    content.innerHTML +=  `
            <button data-id="card" class="pkm-card ${pokemon.pokemon[currentNum].bgColor}">
                <div class="pkm-card__header">
                    <span class="pkm-card__header_num">#${pokemon.pokemon[currentNum].id}</span>
                    <h2 class="pkm-card__header_name">${pokemon.pokemon[currentNum].name}</h2>
                </div>
                <div id="pkm-card__types-${currentNum}" class="pkm-card__types" onload="${loadTypesOfPkm(currentNum)}">
                    
                </div>
                <div class="pkm-card__img">
                    <img src="${pokemon.pokemon[currentNum].img}" alt="Picture of ${pokemon.pokemon[currentNum].name}">
                </div>
            </button>
        `
}

async function loadTypesOfPkm(currentNum) {
    let pokemon = JSON.parse(localStorage.listOfPkms);
    for (let i = 0; i < pokemon.pokemon[currentNum].types.length; i++) {
        document.getElementById(`pkm-card__types-${await currentNum}`).innerHTML += `
                <div class="pkm-card__types_details">
                    <div class="pkm-card__types_details-name">${pokemon.pokemon[currentNum].types[i]}</div>
                    <img class="pkm-card__types_details-icon" src="./assets/icons/types/${pokemon.pokemon[currentNum].types[i]}.svg" alt="${pokemon.pokemon[currentNum].types[i]}.svg">
                </div>
            `
    }
}