import axios from 'axios';

const READARR_API_KEY = process.env.READARR_API_KEY;
const READARR_BASE_URL = process.env.READARR_BASE_URL;

// Function to add a book request to Readarr
export const addBookToReadarr = async (book) => {
  if (!READARR_API_KEY || !READARR_BASE_URL) {
    throw new Error('Readarr API key or base URL is missing.');
  }

  try {
    // Prepare the payload to send to Readarr
    const payload = {
      title: book.title,
      author: book.author,
      foreignId: book.isbn || null, // ISBN for Readarr to match
    };

    // Send POST request to Readarr's "add" API endpoint
    const response = await axios.post(
      `${READARR_BASE_URL}/api/v1/book`,
      payload,
      {
        headers: {
          'X-Api-Key': READARR_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data; // Return the response from Readarr
  } catch (error) {
    console.error('Error adding book to Readarr:', error.message);
    throw new Error('Failed to add book to Readarr');
  }
};
