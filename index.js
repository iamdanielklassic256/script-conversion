const fs = require('fs');
const path = require('path');

function parseBibleText(text) {
    // Split into lines and filter out empty lines
    const lines = text.split('\n')
        .map(line => line.trim())
        .filter(line => line);
    
    // Initialize the JSON structure
    const bibleJson = {
        versions: [{
            name: "KJV",
            books: []
        }]
    };
    
    let currentBook = null;
    let currentBookObj = null;
    
    for (const line of lines) {
        // Parse line with format "Genesis 1:1 In the beginning..."
        const match = line.match(/^(\w+)\s+(\d+):(\d+)\t(.+)$/);
        
        if (match) {
            const [_, book, chapter, verse, verseText] = match;
            
            // If we encounter a new book
            if (currentBook !== book) {
                currentBook = book;
                currentBookObj = {
                    name: book,
                    chapters: []
                };
                bibleJson.versions[0].books.push(currentBookObj);
            }
            
            // Find or create the chapter
            let chapterObj = currentBookObj.chapters.find(
                ch => ch.number === parseInt(chapter)
            );
            
            if (!chapterObj) {
                chapterObj = {
                    number: parseInt(chapter),
                    verses: []
                };
                currentBookObj.chapters.push(chapterObj);
            }
            
            // Add verse with both number and text
            chapterObj.verses.push({
                number: parseInt(verse),
                text: verseText
            });
        }
    }
    
    // Sort verses by number within each chapter
    for (const book of bibleJson.versions[0].books) {
        for (const chapter of book.chapters) {
            chapter.verses.sort((a, b) => a.number - b.number);
        }
    }
    
    return bibleJson;
}

// Read the input file
try {
    const bibleText = fs.readFileSync(path.join(__dirname, 'bible.txt'), 'utf-8');
    
    // Convert to JSON
    const bibleJson = parseBibleText(bibleText);
    
    // Write to JSON file
    fs.writeFileSync(
        'bible.json',
        JSON.stringify(bibleJson, null, 2),
        'utf-8'
    );
    
    console.log('Successfully converted bible.txt to bible.json');
} catch (error) {
    console.error('Error processing file:', error.message);
}