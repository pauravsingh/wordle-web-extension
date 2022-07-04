export function getInputData(): any {

    // Output array of letters with corresponding status and position
    const letters: {letter:string, status: string, position: number}[] = [];

    // Get the HTML element with user input data
    const gameRowElements = document
        ?.getElementById('wordle-app-game')
        ?.getElementsByTagName('div')[0]
        ?.getElementsByTagName('div')[0].children

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
function checkStatsModalOpen(): boolean {
    return document
        ?.querySelector('game-app')
        ?.shadowRoot
        ?.querySelector('game-modal')
        ?.hasAttribute('open') || false;
}
