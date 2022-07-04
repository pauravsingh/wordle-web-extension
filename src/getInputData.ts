export function getInputData(): any {

    // Output array of letters with corresponding status and position
    const letters: {letter:string, status: string, position: number}[] = [];

    // Get the HTML element with user input data
    const gameRowElements = document
        ?.querySelector('game-app')
        ?.shadowRoot
        ?.getElementById('board')
        ?.getElementsByTagName('game-row');

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
function checkStatsModalOpen(): boolean {
    return document
        ?.querySelector('game-app')
        ?.shadowRoot
        ?.querySelector('game-modal')
        ?.hasAttribute('open') || false;
}
