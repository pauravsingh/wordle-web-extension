import {generateSuggestions} from './generateSuggestions';
import {getInputData} from './getInputData';

// On pop up window load run generate suggestions function
window.onload = function ($event) {
    chrome.tabs.query({active: true, currentWindow: true}, async function (tabs) {
        try {
            // Get the Wordle page's current state
            const results = await chrome.scripting.executeScript({
                target: { tabId: <number>tabs[0].id },
                world: 'MAIN',
                func: getInputData,
                args: []
            });

            // Get suggestions based on current state of the game
            const words = generateSuggestions(results[0].result);

            // Display the suggestions
            displayResults(words);

        } catch (e: any) {
            console.error(e);
        }
    });
}

// Inject HTML to pop up
function displayResults(results: string[]) {
    // Output HTML string
    let output = '';
    // Append each word to a new row in the output
    for (const word of results) {
        output += '<div class="row">';
        for (const letter of word.split('')) {
            output += '<span class="tile">' + letter + '</span>';
        }
        output += '</div><br/>'
    }

    // Add HTML to the output element
    const suggestionsElement = document.getElementById('suggestions');
    if (suggestionsElement) {
        suggestionsElement.innerHTML = output;
    }
}
