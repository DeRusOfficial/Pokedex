const dialogRef = document.querySelector('[data-id="dialog"]');

function loadCard(currentNum) {
    let pokemon = JSON.parse(localStorage.listOfPkms);
    content.innerHTML += `
            <button data-id="card" class="pkm-card ${pokemon.pokemon[currentNum].bgColor}" onclick="openPkmDetails(${currentNum})" >
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



function openPkmDetails(currentNum) {
    let pokemon = JSON.parse(localStorage.listOfPkms);
    dialogRef.showModal();
    dialogRef.style.display = 'flex';
    dialogRef.innerHTML = `
        <div data-id="overlay-${pokemon.pokemon[currentNum].name}" class="details ${pokemon.pokemon[currentNum].bgColor}">
            <div class="details__header">
                <div class="details__header_num num">#${pokemon.pokemon[currentNum].id}</div>
                <h2 class="details__header_name">${pokemon.pokemon[currentNum].name}</h2>
            </div>
            <div class="details__img">
                <img data-id="dialog-image" src="./assets/icons/logo/logo.png" alt="Background image">
                <img data-id="card-image" src="${pokemon.pokemon[currentNum].img}" alt="Picture of ${pokemon.pokemon[currentNum].name}">
            </div>
            <div class="details__infos">
                <div class="details__infos_menu">
                    <p class="details__infos_menu-about active" onclick="loadPkmAbout(${currentNum})">About</p>
                    <p class="details__infos_menu-stats" onclick="loadPkmStats(${currentNum})">Stats</p>
                </div>
                <div class="details__infos_field" onload="${loadPkmAbout(currentNum)}">
                
                </div>
            </div>
            <div class="details__arrows">
                <button data-id="prev-button" class="details__arrows_left arrow" onclick="showPrevPkm(${currentNum})"><img src="./assets/icons/arrows/prev-arrow.svg" alt="prev-arrow.svg"></button>
                <button data-id="close-dialog-button" class="details__arrows_close arrow" onclick="closePkmDetails()"><img src="./assets/icons/arrows/close-arrow.svg" alt="close-arrow.svg"></button>
                <button data-id="next-button" class="details__arrows_right arrow" onclick="showNextPkm(${currentNum})"><img src="./assets/icons/arrows/next-arrow.svg" alt="next-arrow.svg"></button>
            </div>
        </div>
        `
}

async function loadTypesAtDetails(currentNum) {
    let pokemon = JSON.parse(localStorage.listOfPkms);
    for (let i = 0; i < pokemon.pokemon[currentNum].types.length; i++) {
        document.getElementById(`details__types-${await currentNum}`).innerHTML += `
                <div class="details__types_type">
                    <div class="details__types_type-name">${pokemon.pokemon[currentNum].types[i]}</div>
                    <img class="details__types_type-icon" src="./assets/icons/types/${pokemon.pokemon[currentNum].types[i]}.svg" alt="${pokemon.pokemon[currentNum].types[i]}.svg">
                </div>
            `
    }
}

async function loadPkmAbout(currentNum) {
    let detailsField = document.getElementsByClassName('details__infos_field');
    await currentNum;
    detailsField[0].innerHTML = '';
    detailsField[0].innerHTML = tableTemplateOfAbout(currentNum);
}

function tableTemplateOfAbout(currentNum) {
    let pokemon = JSON.parse(localStorage.listOfPkms);
    return `
        <table>
            <tr>
                <th>Abilities</th>
            </tr>
                ${pokemon.pokemon[currentNum].abilities}
            <tr>
                <th>Height</th>
                <td>${pokemon.pokemon[currentNum].height}</td>
            </tr>
            <tr>
                <th>Weight</th>
                <td>${pokemon.pokemon[currentNum].weight}</td>
            </tr>
        </table>
    `
}

async function loadPkmStats(currentNum) {
    let detailsField = document.getElementsByClassName('details__infos_field');
    let pokemon = JSON.parse(localStorage.listOfPkms);
    await currentNum;
    detailsField[0].innerHTML = '';
    detailsField[0].innerHTML = `
        <table class="details__infos_field-stats">
            ${pokemon.pokemon[currentNum].stats}
        </table>
    `;
}

function showPrevPkm(currentNum) {
    if (currentNum > 1) {
        openPkmDetails(currentNum - 1)
    }
}

function showNextPkm(currentNum) {
    if (currentNum < endNum) {
        openPkmDetails(currentNum + 1)
    }
}

function closePkmDetails() {
    dialogRef.close();
    dialogRef.style.display = 'none';
}