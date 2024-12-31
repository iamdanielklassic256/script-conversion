const fs = require('fs');
const pdf = require('pdf-parse');

async function extractBibleBooks(pdfPath, startPage, endPage, options = {}) {
    const {
        debugMode = false
    } = options;

    const log = debugMode ? console.log : () => {};
    const books = new Set(); // Use Set to store unique book names

    try {
        log('Starting book extraction process...');
        
        if (!fs.existsSync(pdfPath)) {
            throw new Error(`Input file does not exist: ${pdfPath}`);
        }

        const dataBuffer = fs.readFileSync(pdfPath);
        
        const render_page = async function(pageData) {
            try {
                let render_options = {
                    normalizeWhitespace: false,
                    disableCombineTextItems: false
                };

                let textContent = await pageData.getTextContent(render_options);
                return textContent.items.map(item => item.str).join(' ');
            } catch (error) {
                log(`Warning: Page render error: ${error.message}`);
                return '';
            }
        };

        const pdfOptions = {
            pagerender: render_page,
            max: endPage,
            firstPage: startPage
        };
        
        log('Parsing PDF...');
        const data = await pdf(dataBuffer, pdfOptions);
        
        if (!data || !data.text) {
            throw new Error('Failed to extract text from PDF');
        }

        // Split into lines and clean up
        const lines = data.text.split('\n')
            .map(line => String(line).trim())
            .filter(line => line.length > 0);
        
        // Pattern for book/chapter headings in Acholi Bible
        const bookPattern = /^([A-ZÈŊŌƆ][a-zèŋōɔ]+)\s+\d+/;
        
        log('\nExtracting books...');
        
        for (const line of lines) {
            const match = line.match(bookPattern);
            if (match) {
                const bookName = match[1];
                books.add(bookName);
                if (debugMode) {
                    log(`Found book: ${bookName}`);
                }
            }
        }
        
        // Convert Set to sorted array
        const sortedBooks = Array.from(books).sort();
        
        log('\nBooks found:');
        sortedBooks.forEach((book, index) => {
            console.log(`${index + 1}. ${book}`);
        });
        
        return {
            books: sortedBooks,
            count: sortedBooks.length,
            success: true
        };
        
    } catch (error) {
        console.error('\nError during extraction:', error);
        return {
            books: [],
            count: 0,
            success: false,
            error: error.message
        };
    }
}

// Example usage
const pdfPath = './acholi.pdf';
const startPage = 3;
const endPage = 1990;

console.log('Starting Bible book extraction process...');
console.log('PDF Path:', pdfPath);

extractBibleBooks(pdfPath, startPage, endPage, { debugMode: true })
    .then(result => {
        if (result.success) {
            console.log(`\nExtraction complete: ${result.count} books found`);
        } else {
            console.log(`\nExtraction failed: ${result.error}`);
        }
    })
    .catch(error => {
        console.error('Processing failed:', error);
        process.exit(1);
    });