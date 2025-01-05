const fs = require('fs');

/**
 * Convert Bible JSON from the BIBLEBOOK format to the versions format and save to file
 * @param {Object} inputJson - Input JSON in BIBLEBOOK format
 * @param {string} outputPath - Path where to save the output JSON file
 */
function convertAndSaveBibleFormat(inputJson, outputPath = 'swahili.json') {
    try {
        const output = {
            versions: [
                {
                    name: "Swahili",
                    books: []
                }
            ]
        };

        // Ensure BIBLEBOOK is an array
        const biblebooks = Array.isArray(inputJson.BIBLEBOOK) 
            ? inputJson.BIBLEBOOK 
            : [inputJson.BIBLEBOOK];

        // Process each book
        biblebooks.forEach(book => {
            const newBook = {
                name: book.book_name,
                chapters: []
            };

            // Ensure CHAPTER is an array
            const chapters = Array.isArray(book.CHAPTER) 
                ? book.CHAPTER 
                : [book.CHAPTER];

            // Process each chapter
            chapters.forEach(chapter => {
                if (!chapter) return; // Skip if chapter is null or undefined

                const newChapter = {
                    number: parseInt(chapter.chapter_number),
                    verses: []
                };

                // Ensure VERSES is an array
                const verses = Array.isArray(chapter.VERSES) 
                    ? chapter.VERSES 
                    : [chapter.VERSES];

                // Process each verse
                verses.forEach(verse => {
                    if (!verse) return; // Skip if verse is null or undefined

                    const newVerse = {
                        number: parseInt(verse.verse_number),
                        text: verse.verse_text
                    };
                    newChapter.verses.push(newVerse);
                });

                if (newChapter.verses.length > 0) {
                    newBook.chapters.push(newChapter);
                }
            });

            if (newBook.chapters.length > 0) {
                output.versions[0].books.push(newBook);
            }
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
try {
    // Load your input JSON file
    const inputJson = require('./swahili.json'); // Replace with your input file path
    convertAndSaveBibleFormat(inputJson);
} catch (error) {
    console.error('Failed to process Bible data:', error);
}