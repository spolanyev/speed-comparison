//@author Stanislav Polaniev <spolanyev@gmail.com>

'use strict';

const path = require('node:path');
const fs = require('node:fs');

const startTime = Math.floor(new Date().getTime());
let wordCount = 0;
const selectedWords = [];

const fullPathDirectory = path.join(__dirname, '..', 'data', 'a');
if (fs.statSync(fullPathDirectory).isDirectory()) {
    const directory = fs.opendirSync(fullPathDirectory);
    let entry;
    while (null !== (entry = directory.readSync())) {
        wordCount++;
        const fullPathFrequency = path.join(fullPathDirectory, entry.name, '2015-2017-spoken-frequency.txt');
        if (fs.statSync(fullPathFrequency).isFile()) {
            const number = fs.readFileSync(fullPathFrequency, 'utf8');
            if (parseInt(number) >= 798) {
                const fullPathTranslation = path.join(fullPathDirectory, entry.name, 'translation.txt');
                if (fs.statSync(fullPathTranslation).isFile()) {
                    
                    let word = '';
                    const chunk = Buffer.alloc(128);
                    let bytesRead = 0;
                    let remaining = '';
                    let isNewLineFound = false;

                    const filePointer = fs.openSync(fullPathTranslation, 'r');
                    while ((bytesRead = fs.readSync(filePointer, chunk, 0, chunk.length)) > 0) {
                        remaining += chunk;
                        let newlineIndex;
                        if ((newlineIndex = remaining.indexOf('\n')) !== -1) {
                            isNewLineFound = true;
                            word = remaining.substring(0, newlineIndex).trim();
                            break;
                        }
                    }

                    if (!isNewLineFound) {
                        word = remaining.trim();
                    }

                    if ('' === word) {
                        word = entry.name;
                    }
                    selectedWords.push(word);
                }
            }
        }
    }
    directory.closeSync();
}

console.log('selected ' + selectedWords.length + ' words from ' + wordCount + ', took ' + (Math.floor(new Date().getTime()) - startTime) / 1000 + ' seconds');
/*
selectedWords.forEach((word, i) => {
    console.log('' + ++i + '. ' + word);
});
*/
