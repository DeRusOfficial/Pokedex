function loadMorePkm() {
    endNum = endNum + 20;
    init();
}

async function searchPkm() {
    let searchedPkm = convertLetterToLowerCase(inputValue.value);
    content.innerHTML = '';
    if ((inputValue.value.length <= 2) && (content.innerHTML == '')) {
        currentNum = 1;
        init();
        loadMoreBtn.style.display = 'flex';
    } else {
        loadMoreBtn.style.display = 'none';
        activateLoadingScreen()
        await lookForSearchedPkm(searchedPkm)
        deactivateLoadingScreen()
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

function showPrevPkm(currentNum) {
    getArrowsFromDialog();
    if (currentNum > 1) {
        openPkmDetails(currentNum - 1);
    }
    if (currentNum === 2) {
        arrowsAtDialog[0].style.cursor = 'not-allowed';
        arrowsAtDialog[0].style.filter = 'opacity(0.5)';
    }
}

function showNextPkm(currentNum) {
    getArrowsFromDialog();
    if (currentNum < endNum) {
        openPkmDetails(currentNum + 1);
    }
    if (currentNum === endNum - 1) {
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


function getArrowsFromDialog() {
    return arrowsAtDialog = document.getElementsByClassName('arrow');
}

function capitalizeFirstLetters(currentPkmName) {
    return currentPkmName.replace(/\b\w/g, char => char.toUpperCase());
}

function convertLetterToLowerCase(currentPkmName) {
    return currentPkmName.toLowerCase();
}