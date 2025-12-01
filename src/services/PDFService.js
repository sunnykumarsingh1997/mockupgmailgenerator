import { PDFDocument } from 'pdf-lib';

const PASSWORD_STORAGE_KEY = 'pdf_passwords';

// Get stored passwords from localStorage
export const getStoredPasswords = () => {
    try {
        const stored = localStorage.getItem(PASSWORD_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Error reading stored passwords:', error);
        return [];
    }
};

// Save password to localStorage
export const savePassword = (password) => {
    if (!password || password.trim() === '') return;
    
    try {
        const passwords = getStoredPasswords();
        // Add password if not already in list
        if (!passwords.includes(password)) {
            passwords.unshift(password); // Add to beginning
            // Keep only last 20 passwords
            const limitedPasswords = passwords.slice(0, 20);
            localStorage.setItem(PASSWORD_STORAGE_KEY, JSON.stringify(limitedPasswords));
        }
    } catch (error) {
        console.error('Error saving password:', error);
    }
};

// Try to unlock PDF with password
export const unlockPDF = async (file, password) => {
    try {
        const arrayBuffer = await file.arrayBuffer();
        
        // Try to load the PDF with the password
        // Note: pdf-lib doesn't support password-protected PDFs directly
        // We'll need to use a different approach or library
        // For now, we'll return the file as-is and handle password in the backend/service
        
        // If password is provided, save it
        if (password) {
            savePassword(password);
        }
        
        return arrayBuffer;
    } catch (error) {
        console.error('Error unlocking PDF:', error);
        throw new Error('Failed to unlock PDF. Please check the password.');
    }
};

// Check if PDF is password protected (basic check)
export const isPasswordProtected = async (file) => {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        
        // Check for encryption markers in PDF
        const pdfString = new TextDecoder('latin1').decode(uint8Array.slice(0, 1024));
        return pdfString.includes('/Encrypt') || pdfString.includes('/Filter/Standard');
    } catch (error) {
        console.error('Error checking PDF protection:', error);
        return false;
    }
};

