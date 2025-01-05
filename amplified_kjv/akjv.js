const fs = require('fs');

/**
 * Convert flat Bible JSON format to versions format
 * @param {Object} inputJson - Input JSON in flat format
 * @param {string} outputPath - Path where to save the output JSON file
 * @param {string} version - Version name (e.g., "KJV")
 */
function convertToVersionFormat(inputJson, outputPath = 'akjv2.json', version = 'AKJV') {
    try {
        const output = {
            versions: [
                {
                    name: version,
                    books: []
                }
            ]
        };

        // Process each book
        Object.entries(inputJson).forEach(([bookName, chapters]) => {
            const bookData = {
                name: bookName,
                chapters: []
            };

            // Process each chapter
            Object.entries(chapters).forEach(([chapterNum, verses]) => {
                const chapterData = {
                    number: parseInt(chapterNum),
                    verses: []
                };

                // Process each verse
                Object.entries(verses).forEach(([verseNum, verseText]) => {
                    const verseData = {
                        number: parseInt(verseNum),
                        text: verseText
                    };
                    chapterData.verses.push(verseData);
                });

                // Sort verses by number
                chapterData.verses.sort((a, b) => a.number - b.number);
                bookData.chapters.push(chapterData);
            });

            // Sort chapters by number
            bookData.chapters.sort((a, b) => a.number - b.number);
            output.versions[0].books.push(bookData);
        });

        // Save to file with pretty printing
        fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf8');
        console.log(`Successfully saved Bible data to ${outputPath}`);
        
        return output;
    } catch (error) {
        console.error('Error converting or saving Bible data:', error);
        throw error;
    }
}

// Example usage
// const sampleInput = {
//     "Genesis": {
//         "1": {
//             "1": "In the beginning God created the heaven and the earth.",
//             "2": "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.",
//             "3": "And God said, Let there be light: and there was light."
//         }
//     }
// };
const inputJson = require('./akjv.json');

try {

    convertToVersionFormat(inputJson);
    console.log('Conversion completed successfully');
} catch (error) {
    console.error('Failed to process Bible data:', error);
}

