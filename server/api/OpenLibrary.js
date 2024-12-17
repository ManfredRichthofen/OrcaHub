import axios from 'axios';

// Function to fetch books from OpenLibrary
export const searchBooks = async (title) => {
  try {
    const response = await axios.get('https://openlibrary.org/search.json', {
      params: { title, limit: 5 },
    });

    // Map results to include title, author, OLID, and cover image URL
    return response.data.docs.map((book) => {
      const openLibraryId = book.edition_key?.[0] || null;
      return {
        title: book.title,
        author: book.author_name?.[0] || 'Unknown Author',
        olid: openLibraryId,
        coverUrl: openLibraryId
          ? `https://covers.openlibrary.org/b/olid/${openLibraryId}-M.jpg`
          : null,
      };
    });
  } catch (error) {
    console.error('Error fetching books from OpenLibrary:', error.message);
    throw new Error('Failed to fetch books from OpenLibrary');
  }
};
