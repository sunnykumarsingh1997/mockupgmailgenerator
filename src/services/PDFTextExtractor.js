// PDF Text Extraction Service using pdf.js
import * as pdfjsLib from 'pdfjs-dist';

// Set worker source - using CDN for better compatibility
// Use a fixed version URL that matches the installed package
if (typeof window !== 'undefined' && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.js`;
}

export const extractTextFromPDF = async (file, password = null) => {
    try {
        console.log('Starting PDF text extraction...');
        const arrayBuffer = await file.arrayBuffer();
        
        const loadingTask = pdfjsLib.getDocument({
            data: arrayBuffer,
            password: password || undefined,
            verbosity: 0 // Reduce console noise
        });

        const pdf = await loadingTask.promise;
        console.log(`PDF loaded successfully. Pages: ${pdf.numPages}`);
        
        let fullText = '';

        // Extract text from all pages
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            try {
                const page = await pdf.getPage(pageNum);
                const textContent = await page.getTextContent();
                
                // Better text extraction - preserve spacing and structure
                let pageText = '';
                let lastY = null;
                
                for (const item of textContent.items) {
                    // Add newline if Y position changed significantly (new line)
                    if (lastY !== null && Math.abs(item.transform[5] - lastY) > 5) {
                        pageText += '\n';
                    }
                    pageText += item.str + ' ';
                    lastY = item.transform[5];
                }
                
                fullText += pageText.trim() + '\n\n';
                console.log(`Page ${pageNum} extracted: ${pageText.substring(0, 100)}...`);
            } catch (pageError) {
                console.error(`Error extracting page ${pageNum}:`, pageError);
                // Continue with other pages
            }
        }

        if (!fullText || fullText.trim().length === 0) {
            throw new Error('No text could be extracted from the PDF. The PDF might be image-based or corrupted.');
        }

        console.log(`Text extraction complete. Total length: ${fullText.length} characters`);
        return fullText;
    } catch (error) {
        console.error('Error extracting text from PDF:', error);
        
        if (error.name === 'PasswordException' || error.message?.includes('password')) {
            throw new Error('PDF is password protected. Please provide the password.');
        }
        
        if (error.message?.includes('Invalid PDF')) {
            throw new Error('Invalid PDF file. Please check if the file is corrupted.');
        }
        
        throw new Error(`Failed to extract text from PDF: ${error.message || 'Unknown error'}`);
    }
};

