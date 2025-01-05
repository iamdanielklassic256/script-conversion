const fs = require('fs');
const path = require('path');

function parseJeremia(text) {
    // Split into lines and normalize line endings
    let lines = text.split(/\r?\n/).map(line => line.trim()).filter(line => line);
    
    const jeremiaJson = {
        book: "Jeremia",
        chapters: []
    };
    
    let currentChapter = null;
    let currentVerse = null;
    let hasMultipleLines = false;
    
    for (let i = 0; i < lines.length; i++) {
        const currentLine = lines[i].trim();
        
        // Updated regex to specifically match Jeremia verses
        const verseMatch = currentLine.match(/^(Jeremia)\s+(\d+):(\d+)\s+(.+)$/);
        
        if (verseMatch) {
            const [_, book, chapter, verse, verseText] = verseMatch;
            const chapterNum = parseInt(chapter);
            
            // Find or create the chapter
            currentChapter = jeremiaJson.chapters.find(ch => ch.number === chapterNum);
            if (!currentChapter) {
                currentChapter = {
                    number: chapterNum,
                    verses: []
                };
                jeremiaJson.chapters.push(currentChapter);
            }
            
            // Create new verse
            currentVerse = {
                number: parseInt(verse),
                text: verseText
            };
            
            // If this isn't a multi-line verse, add it immediately
            if (!hasMultipleLines) {
                currentChapter.verses.push(currentVerse);
            }
            hasMultipleLines = false;
            
        } else if (currentVerse) {
            // This line doesn't start with a verse reference
            // Treat it as a continuation of the previous verse
            const cleanedLine = currentLine.replace(/^["']|["']$/g, '');
            currentVerse.text += ' ' + cleanedLine;
            hasMultipleLines = true;
            
            // If this is the first additional line, add the verse to the chapter
            if (!currentChapter.verses.includes(currentVerse)) {
                currentChapter.verses.push(currentVerse);
            }
        }
    }
    
    // Post-processing: clean up and sort
    jeremiaJson.chapters.forEach(chapter => {
        // Sort verses by number
        chapter.verses.sort((a, b) => a.number - b.number);
        
        // Clean up verse text
        chapter.verses.forEach(verse => {
            verse.text = verse.text
                .replace(/\s+/g, ' ')  // normalize spaces
                .replace(/\s+([.,;:!?])/g, '$1')  // fix punctuation spacing
                .replace(/\s*"\s*/g, '"')  // normalize quote spacing
                .replace(/\s*'\s*/g, "'")  // normalize apostrophe spacing
                .trim();
        });
    });
    
    // Sort chapters by number
    jeremiaJson.chapters.sort((a, b) => a.number - b.number);
    
    return jeremiaJson;
}

try {
    // Read the input file
    const bibleText = fs.readFileSync(path.join(__dirname, 'jeremiah.txt'), 'utf-8');
    
    // Parse and extract Jeremia
    const jeremiaJson = parseJeremia(bibleText);
    
    // Write to JSON file
    fs.writeFileSync(
        'Jeremia.json',
        JSON.stringify(jeremiaJson, null, 2),
        'utf-8'
    );
    
    console.log('Successfully created Jeremia.json');
} catch (error) {
    console.error('Error processing file:', error.message);
}