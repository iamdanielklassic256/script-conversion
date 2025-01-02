const fs = require('fs');

function formatBibleText(text) {
    /**
     * Convert Bible text into a numbered verse format.
     * Input text should have chapter number at the start.
     */
    
    // Split the text into lines and remove empty lines at start/end
    const lines = text.trim().split('\n');
    
    // Get the book name and chapter number from the first line
    const firstLine = lines[0].trim();
    const [book, chapter] = firstLine.split(' ');
    
    // Process the remaining lines
    const formattedVerses = [];
    let currentVerse = 1;
    
    // Skip the first line as it contains book/chapter
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Skip empty lines
        if (!line) {
            continue;
        }
        
        // Format the verse with book, chapter, and verse number
        const formattedVerse = `${book} ${chapter}:${currentVerse} ${line}`;
        formattedVerses.push(formattedVerse);
        currentVerse++;
    }
    
    // Join all verses with newlines
    return formattedVerses.join('\n');
}

// Example usage
const sampleText = `Acakki 12
1 Rwot owaco bot Abram ni, "A woko ki i lobo tuwu, ki i kakawu, ki i paco pa
woru, ci icit i lobo ma abinyutti.
2Abimiyi idoko rok madit, abimiyi gum bene, abimiyo nyiŋi bedo dit, pien ibibedo
lakelgum.
3Abimiyo gum i kom jo ma leggi gum, abiceno ŋat mo ma biceni; dok piri en aye
kaka ducu ma wi lobo bilimo iye gumgi."`;

// Format the text
const formattedText = formatBibleText(sampleText);

// Write to file
fs.writeFileSync('formatted_bible.txt', formattedText, 'utf8');

console.log('Formatted text has been saved to formatted_bible.txt');