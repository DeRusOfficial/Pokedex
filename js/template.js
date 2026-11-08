
function loadCard(currentNum, pokemon) {
    return content.innerHTML += `
            <button data-id="card" aria-haspopup="dialog" aria-controls="pkmDialog" class="pkm-card ${pokemon.pokemon[currentNum].bgColor}" onclick="openPkmDialog(${currentNum})">
                <div class="pkm-card__header">
                    <span class="pkm-card__header_num font-silkscreen">#${pokemon.pokemon[currentNum].id}</span>
                    <h2 id="pkmName" class="pkm-card__header_name font-montserrat">${pokemon.pokemon[currentNum].name}</h2>
                </div>
                <div id="pkm-card__types-${currentNum}" class="pkm-card__types" onload="${loadTypesOfPkm(currentNum, pokemon)}">
                    
                </div>
                <div class="pkm-card__img">
                    <img src="${pokemon.pokemon[currentNum].img}" alt="Picture of ${pokemon.pokemon[currentNum].name}">
                </div>
            </button>
        `;
}

function loadPkmDialog(currentNum, pokemon) {
    return dialogRef.innerHTML = `
        <div data-id="overlay-${pokemon.pokemon[currentNum].name}" class="details ${pokemon.pokemon[currentNum].bgColor}">
            <div class="details__header">
                <div class="details__header_num num font-silkscreen">#${pokemon.pokemon[currentNum].id}</div>
                <h2 class="details__header_name font-montserrat">${pokemon.pokemon[currentNum].name}</h2>
            </div>
            <div class="details__img">
                <img data-id="dialog-image" src="./assets/icons/logo/logo.png" alt="Background image">
                <img data-id="card-image" src="${pokemon.pokemon[currentNum].img}" alt="Picture of ${pokemon.pokemon[currentNum].name}">
            </div>
            <div class="details__infos">
                <div class="details__infos_menu">
                    <p aria-label="Pokemon details" tabindex="0" role="button" id="detailsBtn" class="details__infos_menu-details font-montserrat active" onclick="loadPkmDetails(${currentNum})" onkeydown="if(event.key === 'Enter') loadPkmDetails(${currentNum})">Details</p>
                    <p aria-label="Pokemon stats" tabindex="0" role="button" id="statsBtn" class="details__infos_menu-stats font-montserrat" onclick="loadPkmStats(${currentNum})" onkeydown="if(event.key === 'Enter') loadPkmStats(${currentNum})">Stats</p>
                </div>
                <div class="details__infos_field" onload="${loadPkmDetails(currentNum)}">
                
                </div>
            </div>
            <div class="details__arrows">
                <button aria-label="Show previous pokemon" data-id="prev-button" class="details__arrows_left arrow" onclick="showPrevPkm(${currentNum})"><img src="./assets/icons/arrows/prev-arrow.svg" alt="prev-arrow.svg"></button>
                <button aria-label="Close dialog" data-id="close-dialog-button" class="details__arrows_close arrow" onclick="closePkmDetails()"><img src="./assets/icons/arrows/close-arrow.svg" alt="close-arrow.svg"></button>
                <button aria-label="Show next pokemon" data-id="next-button" class="details__arrows_right arrow" onclick="showNextPkm(${currentNum})"><img src="./assets/icons/arrows/next-arrow.svg" alt="next-arrow.svg"></button>
            </div>
        </div>
        `
}

function tableTemplateOfDetails(currentNum, pokemon) {
    return `
        <table>
            <tr>
                <th class="font-montserrat td-fw-500">Abilities</th>
            </tr>
                ${pokemon.pokemon[currentNum].abilities}
            <tr>
                <th class="font-montserrat td-fw-500">Height</th>
                <td class="font-silkscreen">${pokemon.pokemon[currentNum].height}</td>
            </tr>
            <tr>
                <th class="font-montserrat td-fw-500">Weight</th>
                <td class="font-silkscreen">${pokemon.pokemon[currentNum].weight}</td>
            </tr>
        </table>
    `
}   