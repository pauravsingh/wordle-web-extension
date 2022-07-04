var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { generateSuggestions } from './generateSuggestions';
import { getInputData } from './getInputData';
// On pop up window load run generate suggestions function
window.onload = function ($event) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Get the Wordle page's current state
                const results = yield chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    world: 'MAIN',
                    func: getInputData,
                    args: []
                });
                // Get suggestions based on current state of the game
                const words = generateSuggestions(results[0].result);
                // Display the suggestions
                displayResults(words);
            }
            catch (e) {
                console.error(e);
            }
        });
    });
};
// Inject HTML to pop up
function displayResults(results) {
    // Output HTML string
    let output = '';
    // Append each word to a new row in the output
    for (const word of results) {
        output += '<div class="row">';
        for (const letter of word.split('')) {
            output += '<span class="tile">' + letter + '</span>';
        }
        output += '</div><br/>';
    }
    // Add HTML to the output element
    const suggestionsElement = document.getElementById('suggestions');
    if (suggestionsElement) {
        suggestionsElement.innerHTML = output;
    }
}
