let startNum;
let endNum;
const content = document.querySelector('[data-id=content]');

function init() {
    startNum = 1;
    endNum = 20;
    render();
}

async function render() {
    for (startNum; startNum < endNum; startNum++) {
        content.innerHTML += await loadCard(startNum);
    }
}

async function fetchPkmAPI(x) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${x}`);
    let responseToJson = await response.json();
    return responseToJson;
}