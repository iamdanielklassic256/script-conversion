const fs = require('fs');

function formatBibleText(text) {
    /**
     * Convert Bible text into a numbered verse format.
     * Removes copyright notice and specific header text.
     * Only treats lines starting with numbers as new verses.
     */
    
    // Remove the specific text and copyright notice
    text = text.replace(/Acoli Baibul/g, '')
              .replace(/© 1985, Bible Society of Uganda\./g, '')
              .replace(/©/g, ''); // Remove any remaining copyright symbols
    
    // Split the text into lines
    const lines = text.trim().split('\n');
    
    const formattedVerses = [];
    let currentBook = '';
    let currentChapter = '';
    let currentVerseText = '';
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Skip empty lines
        if (!line) {
            // If we have accumulated verse text, save it before the blank line
            if (currentVerseText) {
                formattedVerses.push(currentVerseText);
                currentVerseText = '';
            }
            continue;
        }
        
        // Check if this is a chapter heading (e.g., "Acakki 19")
        const chapterMatch = line.match(/^(\w+)\s+(\d+)$/);
        if (chapterMatch) {
            // Save any accumulated verse text before starting new chapter
            if (currentVerseText) {
                formattedVerses.push(currentVerseText);
                currentVerseText = '';
            }
            
            // Start new chapter
            currentBook = chapterMatch[1];
            currentChapter = chapterMatch[2];
            continue;
        }
        
        // Check if line starts with a verse number
        const verseMatch = line.match(/^(\d+)(.*)/);
        if (verseMatch && currentBook && currentChapter) {
            // Save any previous verse text
            if (currentVerseText) {
                formattedVerses.push(currentVerseText);
            }
            
            // Start new verse
            const verseNumber = verseMatch[1];
            const verseContent = verseMatch[2].trim();
            currentVerseText = `${currentBook} ${currentChapter}:${verseNumber} ${verseContent}`;
        } else if (currentVerseText) {
            // This is a continuation of the current verse
            currentVerseText += ' ' + line;
        }
    }
    
    // Don't forget to add the last verse if there is one
    if (currentVerseText) {
        formattedVerses.push(currentVerseText);
    }
    
    // Join all verses with newlines
    return formattedVerses.join('\n');
}

// Example usage with the provided text
const sampleText = `Acoli Baibul
© 1985, Bible Society of Uganda.

Acakki 19
1Lumalaika aryo gubino i Codom otyeno; gunoŋo Lot obedo piny i dog gaŋ me
Codom. Ka Lot onenogi, ci oa malo, ocito ka jologi, oryebbe, okulo waŋe piny i
ŋom,
2kun wacci, "Luditona, alegowu, wulokke, wudwog kany, wudony i oda an
laticwu, wubed iye nino acel, wulwok iye tyenwu, ci doŋ wubia giwu odiko con,
wucito i yo wotwu." Gugamo ni, "Pe; piny biru ki wan i dye gaŋ, kany."

Acakki 20
1Abraim ocako wot me cito i lobo me Negeb ma tye i kin Kadec ki Cur, obedo i
Gerar, ka ma otiro iye macalo labedo.
2 Abraim ocako lok i kom dakone Cara ni, "En lamera." Ci Abimelek kabaka me
Gerar ocwalo jone guomo Cara.

Acakki 21
1Rwot dok olimo Cara kit ma con owaco, ci otime kit ma yam ociko kwede.
2 Cara ogamo ic, ci onywalo latin laco ki Abraim, ma kun en doŋ oti woko, i kare
ma yam Lubaŋa otitte pire-ni.`;

// Format the text and save to file
const formattedText = formatBibleText(sampleText);
fs.writeFileSync('formatted_bible.txt', formattedText, 'utf8');

console.log('Formatted text has been saved to formatted_bible.txt');