//These functions i took in a seperate .js file, because the user active can handle or see what is happening by clicking on something


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
    for (let i = 1; i <= await getQuantityOfPkms(); i++) {
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
    content.inert = true; //If inert is true, the user can't focus on other elements at the background while 
    inputValue.readOnly = true; //If readOnly is true, the user can't write or tip something in the inputField while the loadingScreen is active
    loadingOverlay.style.display = 'flex';
    document.body.classList.add('no-scroll')
}

function deactivateLoadingScreen() {
    content.inert = false;
    inputValue.readOnly = false;
    loadingOverlay.style.display = 'none';
    document.body.classList.remove('no-scroll')
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


// Using REGEX to change only the first letter of each word - after a space or symbol like "-"
// Structure of Regex-Literal: /PATTERN/FLAGS
// \b - search for a beginning letter, a letter after a space or "-" ("_" REGEX treat it like a letter)
// \w - search for the first letter after a boundary (/b) 
function capitalizeFirstLetters(currentPkmName) {
    return currentPkmName.replace(/\b\w/g, char => char.toUpperCase());
}

// This is used so that the case (upper/lower case) does not matter during a search
function convertLetterToLowerCase(currentPkmName) {
    return currentPkmName.toLowerCase()
}