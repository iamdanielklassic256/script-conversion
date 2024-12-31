from PyPDF2 import PdfReader
import re

def extract_books_from_pdf(pdf_path):
    """
    Extract book names from a PDF based on patterns.
    """
    reader = PdfReader(pdf_path)
    book_names = []

    # Regex pattern to match book names
    # Update the pattern to reflect how book names appear in the text
    book_pattern = re.compile(r"^Acakki\s+\w+", re.MULTILINE)

    # Loop through each page to find matches
    for page in reader.pages:
        text = page.extract_text()
        if text:
            matches = book_pattern.findall(text)
            book_names.extend(matches)
    
    # Remove duplicates and return unique book names
    return sorted(set(book_names))

def main():
    pdf_path = './acholi.pdf'
    try:
        print("Extracting book names...")
        books = extract_books_from_pdf(pdf_path)
        
        # Save books to a text file
        with open('acholi_books.txt', 'w', encoding='utf-8') as f:
            for book in books:
                f.write(book + '\n')
        
        print("Books extracted and saved to 'acholi_books.txt'")
        print("Extracted Books:", books)
    except Exception as e:
        print(f"Error processing PDF: {str(e)}")

if __name__ == "__main__":
    main()
