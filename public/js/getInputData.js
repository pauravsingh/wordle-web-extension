export function getInputData() {
    var _a, _b;
    // Output array of letters with corresponding status and position
    const letters = [];
    // Get the HTML element with user input data
    const gameRowElements = (_b = (_a = document === null || document === void 0 ? void 0 : document.getElementById('wordle-app-game')) === null || _a === void 0 ? void 0 : _a.getElementsByTagName('div')[0]) === null || _b === void 0 ? void 0 : _b.getElementsByTagName('div')[0].children;
    for (const gameRowElement of gameRowElements || []) {
        if (gameRowElement) {
            // Get all the tile elements
            const gameTileElements = gameRowElement.querySelectorAll('div[data-state]');
            // Track position of each letter for each attempt
            let index = 0;
            // For each tile, get each letter with its status and position
            for (const gameTileElement of gameTileElements) {
                if (gameTileElement) {
                    const letter = gameTileElement.innerHTML;
                    const evaluation = gameTileElement.getAttribute('data-state');
                    if (letter) {
                        // Add the letter information to the output
                        letters.push({
                            letter: letter || '',
                            status: evaluation || 'missing',
                            position: index
                        });
                    }
                    index++;
                }
            }
        }
    }
    // Return the array of letters with corresponding status and position
    return letters;
}
// Util function to check if Game Stats modal is open
function checkStatsModalOpen() {
    var _a, _b, _c;
    return ((_c = (_b = (_a = document === null || document === void 0 ? void 0 : document.querySelector('game-app')) === null || _a === void 0 ? void 0 : _a.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('game-modal')) === null || _c === void 0 ? void 0 : _c.hasAttribute('open')) || false;
}
