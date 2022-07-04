export function getInputData() {
    var _a, _b, _c;
    // Output array of letters with corresponding status and position
    const letters = [];
    // Get the HTML element with user input data
    const gameRowElements = (_c = (_b = (_a = document === null || document === void 0 ? void 0 : document.querySelector('game-app')) === null || _a === void 0 ? void 0 : _a.shadowRoot) === null || _b === void 0 ? void 0 : _b.getElementById('board')) === null || _c === void 0 ? void 0 : _c.getElementsByTagName('game-row');
    for (const gameRowElement of gameRowElements || []) {
        if (gameRowElement && gameRowElement.shadowRoot) {
            // Get all the tile elements
            const gameTileElements = gameRowElement.shadowRoot.querySelectorAll('div game-tile');
            // Track position of each letter for each attempt
            let index = 0;
            // For each tile, get each letter with its status and position
            for (const gameTileElement of gameTileElements) {
                if (gameTileElement) {
                    const letter = gameTileElement.getAttribute('letter');
                    const evaluation = gameTileElement.getAttribute('evaluation');
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
