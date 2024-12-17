import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { searchBooks } from './api/OpenLibrary.js';
import { fetchTopComics, fetchComicsBySearch } from "./api/Anilist.js";
import { addComicToKapowarr } from './api/Kapowarr.js';
import { addBookToReadarr } from './api/Readarr.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

/* ===========================
   ROUTE: FETCH BOOKS
   =========================== */
app.get('/search-books', async (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ error: 'Book title is required.' });
  }

  try {
    const books = await searchBooks(title);
    res.json({ books });
  } catch (error) {
    console.error('Error in /search-books:', error.message);
    res.status(500).json({ error: 'Failed to fetch books.' });
  }
});
  


/* ============================
   Route: Fetch Top Comics
   ============================ */
   app.get("/top-comics", async (req, res) => {
    try {
      const comics = await fetchTopComics();
      res.json({ comics });
    } catch (error) {
      console.error("Error in /top-comics route:", error.message);
      res.status(500).json({ error: "Failed to fetch top comics." });
    }
  });
  
  /* ============================
     Route: Search Comics by Title
     ============================ */
  app.get("/search-comics", async (req, res) => {
    const { title } = req.query;
  
    if (!title) {
      return res.status(400).json({ error: "Comic title is required." });
    }
  
    try {
      const comics = await fetchComicsBySearch(title);
      res.json({ comics });
    } catch (error) {
      console.error("Error in /search-comics route:", error.message);
      res.status(500).json({ error: "Failed to fetch comics by search." });
    }
  });
  

/* ===========================
   ROUTE: REQUEST COMIC (Kapowarr)
   =========================== */
app.post('/add-comic', async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Comic title is required.' });
  }

  try {
    // Step 1: Fetch comic details from Anilist
    const comic = await searchComics(title);

    // Step 2: Send fetched data to Kapowarr
    const kapowarrResponse = await addComicToKapowarr(comic);

    res.json({
      message: `Comic "${comic.title}" added successfully to Kapowarr.`,
      kapowarrResponse,
    });
  } catch (error) {
    console.error('Error in /add-comic:', error.message);
    res.status(500).json({ error: 'Failed to add comic to Kapowarr.' });
  }
});

/* ===========================
   ROUTE: REQUEST BOOK (Readarr)
   =========================== */
app.post('/add-book', async (req, res) => {
  const { title, author, isbn } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: 'Book title and author are required.' });
  }

  try {
    const book = { title, author, isbn };
    const readarrResponse = await addBookToReadarr(book);

    res.json({
      message: `Book "${title}" requested successfully in Readarr.`,
      readarrResponse,
    });
  } catch (error) {
    console.error('Error in /add-book:', error.message);
    res.status(500).json({ error: 'Failed to add book to Readarr.' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
