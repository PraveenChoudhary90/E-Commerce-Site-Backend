import multer from "multer";

// Store files in memory to send directly to ImageKit
const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // max 10MB per file
});
