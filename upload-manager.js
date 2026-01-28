// upload-manager.js
import { ref, uploadString, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";
import { storage } from "./firebase-config.js"; // Importing from our new config file

// Helper: Convert a single file to a Base64 string
const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

// Helper: Resize image (to save bandwidth/storage)
const resizeImage = (base64Str, maxWidth = 800) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = base64Str;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            let width = img.width;
            let height = img.height;
            
            if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
            }
            
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', 0.8));
        };
    });
};

// Main Function: Handles the upload of multiple files
export async function processAndUploadFiles(fileList) {
    const uploadPromises = Array.from(fileList).map(async (file) => {
        // 1. Convert to Base64
        const originalBase64 = await fileToBase64(file);
        
        // 2. Resize
        const resizedBase64 = await resizeImage(originalBase64);
        
        // 3. Return the data URL directly (or you can upload to Storage here)
        // For now, we return the resized data URL to be stored in Firestore
        // If you want to upload to Storage bucket, we would use uploadString() here.
        return resizedBase64;
    });

    // Wait for ALL images to be processed
    return Promise.all(uploadPromises);
}