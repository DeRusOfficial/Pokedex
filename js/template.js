async function loadCard(startNum) {
    let responseToJson = await fetchPkmAPI(startNum);
    console.log(responseToJson);
    return `
            <button data-id="card" class="pkm-card">
                <div class="pkm-card__header">
                    <span class="pkm-card__header_num">${responseToJson.id}</span>
                    <h2 class="pkm-card__header_name">${responseToJson.name}</h2>
                </div>
                <div class="pkm-card__types">
                    <div class="pkm-card__types_details">
                        <div class="pkm-card__types_details-name">grass</div>
                        <img class="pkm-card__types_details-icon" src="./assets/icons/types/bug.svg" alt="type-icon">
                    </div>
                    <div class="pkm-card__types_details">
                        <div class="pkm-card__types_details-name">poison</div>
                        <img class="pkm-card__types_details-icon" src="./assets/icons/types/poison.svg" alt="type-icon">
                    </div>
                </div>
                <div class="pkm-card__img">
                    <img src="./assets/icons/logo/logo.png" alt="pkm_IMG">
                </div>
            </button>
        `
}