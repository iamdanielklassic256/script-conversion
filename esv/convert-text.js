const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

// Function to convert XML to text with chapter and verse references
function xmlToText(xmlData) {
    let text = '';

    // Loop through each book in the Bible
    xmlData.bible.b.forEach(book => {
        const bookName = book.$.n;  // Book name (e.g., Genesis)

        // Loop through each chapter
        book.c.forEach(chapter => {
            const chapterNumber = chapter.$.n;  // Chapter number (e.g., 1)

            // Loop through each verse in the chapter
            chapter.v.forEach(verse => {
                const verseNumber = verse.$.n;  // Verse number (e.g., 1)
                const verseText = verse._;  // Verse text

                // Add formatted text for each verse: "BookName Chapter:Verse Text"
                text += `${bookName} ${chapterNumber}:${verseNumber}\t${verseText}\n`;
            });
        });
    });

    return text;
}

// Function to read XML, convert it to text, and write to a .txt file
function convertXmlToText(inputFile, outputFile) {
    fs.readFile(inputFile, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading XML file:', err);
            return;
        }

        // Parse XML into a JavaScript object
        xml2js.parseString(data, (parseErr, result) => {
            if (parseErr) {
                console.error('Error parsing XML:', parseErr);
                return;
            }

            // Convert the parsed XML to text
            const text = xmlToText(result);

            // Write the plain text to a .txt file
            fs.writeFile(outputFile, text, 'utf-8', writeErr => {
                if (writeErr) {
                    console.error('Error writing to text file:', writeErr);
                    return;
                }
                console.log('File successfully written to', outputFile);
            });
        });
    });
}

// Usage
const inputFilePath = path.join(__dirname, 'esv.xml'); // Input XML file
const outputFilePath = path.join(__dirname, 'esv.txt'); // Output text file

convertXmlToText(inputFilePath, outputFilePath);
