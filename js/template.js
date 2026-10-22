async function loadCard(currentPkm) {
    // let responseToJson = await fetchPkmAPI(startNum);
    await loadToLocalStorage(currentPkm);
    return `
            <button data-id="card" class="pkm-card">
                <div class="pkm-card__header">
                    <span class="pkm-card__header_num">${responseToJson.id}</span>
                    <h2 class="pkm-card__header_name">${responseToJson.name}</h2>
                </div>
                <div id="pkm-card__types-${startNum}" class="pkm-card__types" onload="${loadTypesOfPkm(startNum)}">
                    
                </div>
                <div class="pkm-card__img">
                    <img src="./assets/icons/logo/logo.png" alt="pkm_IMG">
                </div>
            </button>
        `
}