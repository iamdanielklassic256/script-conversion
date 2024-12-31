const fs = require('fs');
const path = require('path');

function parseBibleText(text) {
    // Split the input text into lines, trim whitespace, and filter out empty lines
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);

    // Initialize the JSON structure
    const bibleJson = {
        versions: [{
            name: "BAIBUL",
            books: [{
                name: "Acakki",
                chapters: []
            }]
        }]
    };

    const book = bibleJson.versions[0].books[0];
    let currentChapter = null;

    for (const line of lines) {
        // Match chapter headers like "Acakki 1"
        const chapterMatch = line.match(/^Acakki\s+(\d+)$/);
        if (chapterMatch) {
            const chapterNumber = parseInt(chapterMatch[1]);

            // Create a new chapter
            currentChapter = {
                number: chapterNumber,
                verses: []
            };
            book.chapters.push(currentChapter);
            continue;
        }

        // Match verse lines like "1 In the beginning..."
        const verseMatch = line.match(/^(\d+)\s+(.+)$/);
        if (verseMatch && currentChapter) {
            const verseNumber = parseInt(verseMatch[1]);
            const verseText = verseMatch[2];

            // Add the verse to the current chapter
            currentChapter.verses.push({
                number: verseNumber,
                text: verseText
            });
        }
    }

    // Sort chapters and verses to ensure proper order
    book.chapters.sort((a, b) => a.number - b.number);
    for (const chapter of book.chapters) {
        chapter.verses.sort((a, b) => a.number - b.number);
    }

    return bibleJson;
}

// Read the input file
try {
    const bibleText = fs.readFileSync(path.join(__dirname, 'acakki.txt'), 'utf-8');

    // Convert to JSON
    const bibleJson = parseBibleText(bibleText);

    // Write to JSON file
    fs.writeFileSync(
        'bible.json',
        JSON.stringify(bibleJson, null, 2),
        'utf-8'
    );

    console.log('Successfully converted acakki.txt to bible.json');
} catch (error) {
    console.error('Error processing file:', error.message);
}
