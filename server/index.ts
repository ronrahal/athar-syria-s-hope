import express from 'express';
import multer from 'multer';
import { put } from '@vercel/blob';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import "dotenv/config";

const app = express();
const prisma = new PrismaClient();
const upload = multer(); // Store in memory

app.use(cors());
app.use(express.json());

// Main Case Upload Route
app.post('/api/cases', upload.single('photo'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) throw new Error("Photo is required");

    // Upload to Vercel Blob
    const blob = await put(`athar/cases/${Date.now()}-${file.originalname}`, file.buffer, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    // Save to Database
    const newCase = await prisma.case.create({
      data: {
        ...req.body, // Ensure frontend sends fields matching the schema
        photo: blob.url,
        caseNumber: `ATH-${Date.now()}`,
        dateMissing: new Date(req.body.dateMissing),
        // Important: Link to your seeded admin
        authorId: req.body.authorId 
      }
    });

    res.status(201).json(newCase);
  } catch (err) {
    // Check if the error is actually an instance of the Error class
    if (err instanceof Error) {
      console.error("Database or Blob Error:", err.message);
      res.status(500).json({ error: err.message });
    } else {
      // Fallback for cases where something else was thrown
      console.error("An unknown error occurred:", err);
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
});

app.listen(3001, () => console.log("Backend running on http://localhost:3001"));