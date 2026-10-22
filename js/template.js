async function loadCard(currentNum) {
    // let responseToJson = await fetchPkmAPI(startNum);
    let pokemon = JSON.parse(localStorage.listOfPkms)
    return `
            <button data-id="card" class="pkm-card">
                <div class="pkm-card__header">
                    <span class="pkm-card__header_num">#${pokemon.pokemon[currentNum].id}</span>
                    <h2 class="pkm-card__header_name">${pokemon.pokemon[currentNum].name}</h2>
                </div>
                <div id="pkm-card__types-${currentNum}" class="pkm-card__types">
                    
                </div>
                <div class="pkm-card__img">
                    <img src="./assets/icons/logo/logo.png" alt="pkm_IMG">
                </div>
            </button>
        `
}