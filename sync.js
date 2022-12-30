'use strict';

const path = require('node:path');
const fs = require('node:fs');
const readline = require('node:readline');

const startTime = Math.floor(new Date().getTime());
let wordCount = 0;
let selectedWords = [];

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

                    const filePointer = fs.openSync(fullPathTranslation, 'r');
                    const buffer = Buffer.alloc(1024);
                    let leftOver = '';
                    let read;
                    let line;
                    let startPosition;
                    let position;
                    label:
                        while (0 !== (read = fs.readSync(filePointer, buffer, 0, 1024, null))) {
                            leftOver += buffer.toString('utf8', 0, read);
                            startPosition = 0
                            while (-1 !== (position = leftOver.indexOf("\n", startPosition))) {
                                line = leftOver.substring(startPosition, position);
                                word = line;
                                break label;
                                startPosition = position + 1;
                            }
                            leftOver = leftOver.substring(startPosition);
                        }

                    if ('' == word) {
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
    console.log('' + ++i + ' ' + word);
});
*/
