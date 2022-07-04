import * as _ from 'lodash';
import {wordsList} from './wordsList';

export function generateSuggestions(inputs: {letter:string, status: string, position: number}[]): string[] {
    try {
        // Weight for each alphabet based on frequency of occurrence in each 5-letter english word
        const alphabets = {
            a: 6096,
            b: 1516,
            c: 2130,
            d: 2127,
            e: 5780,
            f: 941,
            g: 1491,
            h: 1665,
            i: 3700,
            j: 269,
            k: 1276,
            l: 3269,
            m: 1859,
            n: 2966,
            o: 4003,
            p: 1820,
            q: 109,
            r: 3869,
            s: 5307,
            t: 3084,
            u: 2451,
            v: 646,
            w: 822,
            x: 275,
            y: 1810,
            z: 324
        };

        // Data extracted from input
        const correct: string[] = [];
        const present: string[] = [];
        const absent: string[] = [];

        // Prioritize words with duplicate letters higher in the ranking
        const allowDuplicates = false;

        // Regular expression for the filter condition
        let condition = '';

        // If the user has entered one or more words in the game
        if (inputs.length) {

            for (const input of inputs) {
                if (input.status === 'absent') {
                    for (let i = 0; i < 5; i++) {
                        absent[i] = (absent[i] || '') + input.letter
                    }
                }
                if (input.status === 'present') {
                    absent[input.position] = (absent[input.position] || '') + input.letter;
                    present.push(input.letter);
                }
                if (input.status === 'correct') {
                    correct[input.position] = input.letter;
                }
            }

            for (let i = 0; i < 5; i++) {
                // If confirmed alphabet in this position
                if (correct[i]) {
                    // Set regex to match the exact character
                    condition += `[${correct[i]}]`;
                }
                else {
                    // Set the regex to match any character except those in the absent list
                    condition += `[^${absent[i]}]`
                }
            }
        }
        // If no inputs, look for all words and reset conditions
        else {
            condition = '.*';
        }

        // Store 5-letter words
        const words: {word: string, weight: number}[] = [];

        let count: number = 0;
        // Loop for each word in the file
        for (const word of wordsList) {
            try {
                // Manage loop start and end
                count++;
                if (count > 12000) {break;}
                if (count <= 0) {continue;}
                // console.log(count);

                // Check if word is only 5 letter long and meets the position requirements based on previous attempts
                if (word.length === 5 && word.match(new RegExp(condition))
                    && confirmLettersExist(word, correct) && confirmLettersExist(word, present)
                ) {
                    // Initialize weight for this word to 0
                    let weight = 0;
                    // Break word into individual letters
                    let letters = word.split('');
                    // Remove duplicates, to get the word with most common unique letters combined the highest score
                    if (!allowDuplicates) {
                        letters = _.uniq(letters);
                    }
                    // Loop for each unique letter in the word
                    for (const letter of letters) {
                        // Increment weight for the word
                        weight += alphabets[letter];
                    }
                    // Add word and its weight to output
                    words.push({word: word, weight: weight});
                }
            } catch (e: any) {
                console.error(e.message);
            }
        }

        // Sort all words by weight
        const sortedWords: string[] = _.map(_.orderBy(words, 'weight', 'desc'), v => v.word);

        // Display only top 10 most plausible words
        console.log(sortedWords.slice(0, 10));

        return sortedWords.slice(0, 10);
    } catch (err) {
        console.error(err);
        // Return 0 suggestion on error
        return []
    }

}

// Util function to check if given letter(s) exists in a word
function confirmLettersExist(word: string, letters: string[]): boolean {
    for (const letter of letters) {
        if (letter && !word.includes(letter)) {
            return false;
        }
    }
    return true;
}
