function loadMorePkm() {
    endNum = endNum + 20;
    init();
}

async function loadTypesOfPkm(currentNum, pokemon) {
    for (let i = 0; i < pokemon.pokemon[currentNum].types.length; i++) {
        document.getElementById(`pkm-card__types-${await currentNum}`).innerHTML += `
                <div class="pkm-card__types_details">
                    <div class="pkm-card__types_details-name font-montserrat">${pokemon.pokemon[currentNum].types[i]}</div>
                    <img class="pkm-card__types_details-icon" src="./assets/icons/types/${pokemon.pokemon[currentNum].types[i]}.svg" alt="${pokemon.pokemon[currentNum].types[i]}.svg">
                </div>
            `
    }
}

async function loadPkmDetails(currentNum) {
    let detailsField = document.getElementsByClassName('details__infos_field');
    let pokemon = JSON.parse(localStorage.listOfPkms);
    await currentNum;
    detailsField[0].innerHTML = '';
    detailsField[0].innerHTML = tableTemplateOfDetails(currentNum, pokemon);
    addUnderlineAtDetails();
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
    addUnderlineAtStats();
}

async function searchPkm() {
    let searchedPkm = convertLetterToLowerCase(inputValue.value);
    if ((inputValue.value.length <= 2) && ((content.innerHTML == '') || (content.children.length !== endNum))) {
        content.innerHTML = '';
        currentNum = 1;
        init();
        loadMoreBtn.style.display = 'flex';
    } else if (inputValue.value.length > 2) {
        content.innerHTML = '';
        loadMoreBtn.style.display = 'none';
        await loadSearchedPkm(searchedPkm);
    }
}

async function loadSearchedPkm(searchedPkm) {
    activateLoadingScreen();
    try {
        await lookForSearchedPkm(searchedPkm);
    } catch (error) {
        console.log(error);
    } finally {
        deactivateLoadingScreen();
    }
}

async function lookForSearchedPkm(searchedPkm) {
    let quantityOfPkms = await getQuantityOfPkms();
    for (let i = 1; i <= quantityOfPkms; i++) {
        let responseToJson = await fetchPkmAPI(i);
        if ((convertLetterToLowerCase(responseToJson.name)).includes(searchedPkm)) {
            render(i);
        }
    }
    if (content.innerHTML == '') {
        content.innerHTML = `
            <p data-id="not-found" aria-errormessage="Searched Pokemon couldn't be found" >Pokemon "${searchedPkm}" could not be found. Please try again using a different spelling.</p>
        `
    }
}

function activateLoadingScreen() {
    content.inert = true;
    inputValue.readOnly = true;
    loadingOverlay.style.display = 'flex';
    document.body.classList.add('no-scroll');
}

function deactivateLoadingScreen() {
    content.inert = false;
    inputValue.readOnly = false;
    loadingOverlay.style.display = 'none';
    document.body.classList.remove('no-scroll');
}

function openPkmDialog(currentNum) {
    let pokemon = JSON.parse(localStorage.listOfPkms);
    dialogRef.showModal();
    dialogRef.style.display = 'flex';
    loadPkmDialog(currentNum, pokemon);
    blockArrows(currentNum);
}

function showPrevPkm(currentNum) {
    if (currentNum > 1) {
        openPkmDialog(currentNum - 1);
    }
}

function showNextPkm(currentNum) {
    if (currentNum < endNum) {
        openPkmDialog(currentNum + 1);
    }
}

function blockArrows(currentNum) {
    arrowsAtDialog = document.getElementsByClassName('arrow');
    if ((currentNum === 1)) {
        arrowsAtDialog[0].style.cursor = 'not-allowed';
        arrowsAtDialog[0].style.filter = 'opacity(0.5)';
    } else if (currentNum === endNum) {
        arrowsAtDialog[2].style.cursor = 'not-allowed';
        arrowsAtDialog[2].style.filter = 'opacity(0.5)';
    }
}

function closeDialog() {
    window.onclick = function(event) {
        if (event.target == dialogRef) {
            dialogRef.close();
            dialogRef.style.display = 'none';
        }
    };
}

function closePkmDetails() {
    dialogRef.close();
    dialogRef.style.display = 'none';
}

function capitalizeFirstLetters(currentPkmName) {
    return currentPkmName.replace(/\b\w/g, char => char.toUpperCase());
}

function convertLetterToLowerCase(currentPkmName) {
    return currentPkmName.toLowerCase();
}

function addUnderlineAtDetails() {
    let detailsBtn = document.getElementById('detailsBtn');
    let statsBtn = document.getElementById('statsBtn');

    statsBtn.classList.remove('active');
    detailsBtn.classList.add('active');
}

function addUnderlineAtStats() {
    let detailsBtn = document.getElementById('detailsBtn');
    let statsBtn = document.getElementById('statsBtn');

    detailsBtn.classList.remove('active');
    statsBtn.classList.add('active');
}