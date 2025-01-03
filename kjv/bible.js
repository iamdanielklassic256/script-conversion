const fs = require('fs');
const path = require('path');

function parseBibleText(text) {
    // Split into lines and normalize line endings
    let lines = text.split(/\r?\n/).map(line => line.trim()).filter(line => line);
    
    const bibleJson = {
        versions: [{
            name: "KJV",
            books: []
        }]
    };
    
    let currentBook = null;
    let currentBookObj = null;
    let currentChapter = null;
    let currentVerse = null;
    let hasMultipleLines = false;
    
    console.log('\nVerses with multiple lines:');
    console.log('-------------------------');
    
    for (let i = 0; i < lines.length; i++) {
        const currentLine = lines[i].trim();
        
        // Updated regex to handle complex book names
        // This will match patterns like:
        // - "Genesis 1:1"
        // - "1 Kings 1:1"
        // - "2 Samuel 1:1"
        // - "Song of Solomon 1:1"
        const verseMatch = currentLine.match(/^((?:\d+\s+)?[A-Za-z]+(?:\s+[A-Za-z]+)*)\s+(\d+):(\d+)\s+(.+)$/);
        
        if (verseMatch) {
            // If we had a multi-line verse, log it before moving to the next verse
            if (currentVerse && hasMultipleLines) {
                console.log(`${currentBook} ${currentChapter.number}:${currentVerse.number}`);
                console.log(`Text: ${currentVerse.text}`);
                console.log('-------------------------');
            }
            
            const [_, book, chapter, verse, verseText] = verseMatch;
            
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
            currentChapter = currentBookObj.chapters.find(
                ch => ch.number === parseInt(chapter)
            );
            
            if (!currentChapter) {
                currentChapter = {
                    number: parseInt(chapter),
                    verses: []
                };
                currentBookObj.chapters.push(currentChapter);
            }
            
            // Create new verse
            currentVerse = {
                number: parseInt(verse),
                text: verseText
            };
            currentChapter.verses.push(currentVerse);
            hasMultipleLines = false;
            
        } else {
            // This line doesn't start with a verse reference
            // Treat it as a continuation of the previous verse
            if (currentVerse) {
                // Remove any quotes if they exist at the start or end
                const cleanedLine = currentLine.replace(/^["']|["']$/g, '');
                currentVerse.text += ' ' + cleanedLine;
                hasMultipleLines = true;
            }
        }
    }
    
    // Check for the last verse if it was multi-line
    if (currentVerse && hasMultipleLines) {
        console.log(`${currentBook} ${currentChapter.number}:${currentVerse.number}`);
        console.log(`Text: ${currentVerse.text}`);
        console.log('-------------------------');
    }
    
    // Post-processing: clean up and validate
    for (const book of bibleJson.versions[0].books) {
        for (const chapter of book.chapters) {
            // Sort verses by number
            chapter.verses.sort((a, b) => a.number - b.number);
            
            // Clean up verse text: normalize spaces and punctuation
            chapter.verses.forEach(verse => {
                verse.text = verse.text
                    .replace(/\s+/g, ' ')  // normalize spaces
                    .replace(/\s+([.,;:!?])/g, '$1')  // fix punctuation spacing
                    .replace(/\s*"\s*/g, '"')  // normalize quote spacing
                    .replace(/\s*'\s*/g, "'")  // normalize apostrophe spacing
                    .trim();
            });
        }
    }
    
    return bibleJson;
}

// Add validation function to check the structure
function validateVerse(book, chapter, verse, text) {
    const issues = [];
    
    if (!verse.match(/^\d+$/)) {
        issues.push(`Invalid verse number format: ${verse}`);
    }
    
    if (!chapter.match(/^\d+$/)) {
        issues.push(`Invalid chapter number format: ${chapter}`);
    }
    
    if (!text.trim()) {
        issues.push(`Empty verse text for ${book} ${chapter}:${verse}`);
    }
    
    return issues;
}

// Test function to demonstrate the parser works with complex book names
function testComplexBookNames() {
    const sampleVerses = [
        "Genesis 1:1 In the beginning",
        "1 Kings 1:1 Now king David was old",
        "2 Samuel 1:1 After the death of Saul",
        "Song of Solomon 1:1 The song of songs",
        "2 Kings 1:1 Then Moab rebelled"
    ].join('\n');
    
    console.log('\nTesting complex book name parsing:');
    console.log('-------------------------');
    const result = parseBibleText(sampleVerses);
    console.log('Parsed books:', result.versions[0].books.map(b => b.name));
}

try {
    const bibleText = fs.readFileSync(path.join(__dirname, 'bible.txt'), 'utf-8');
    const bibleJson = parseBibleText(bibleText);
    
    // Test complex book names
    testComplexBookNames();
    
    // Write to JSON file
    fs.writeFileSync(
        'bible.json',
        JSON.stringify(bibleJson, null, 2),
        'utf-8'
    );
    
    console.log('\nSuccessfully converted bible.txt to bible.json');
} catch (error) {
    console.error('Error processing file:', error.message);
}