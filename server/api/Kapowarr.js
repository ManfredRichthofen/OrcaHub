import axios from 'axios';

const KAPOWARR_API_KEY = process.env.KAPOWARR_API_KEY;
const KAPOWARR_BASE_URL = process.env.KAPOWARR_BASE_URL;

// Function to send comic data to Kapowarr
export const addComicToKapowarr = async (comic) => {
  if (!KAPOWARR_API_KEY || !KAPOWARR_BASE_URL) {
    throw new Error('Kapowarr API key or base URL is missing in environment variables.');
  }

  try {
    // Prepare the data to be sent to Kapowarr
    const payload = {
      title: comic.title,
      description: comic.description,
      coverUrl: comic.coverUrl,
      externalId: comic.id, // Use Anilist ID
      source: 'Anilist', // Custom source identifier
    };

    // Send a POST request to Kapowarr's API
    const response = await axios.post(
      `${KAPOWARR_BASE_URL}/api/comics`,
      payload,
      {
        headers: {
          'X-Api-Key': KAPOWARR_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data; // Return the Kapowarr response
  } catch (error) {
    console.error('Error adding comic to Kapowarr:', error.message);
    throw new Error('Failed to add comic to Kapowarr');
  }
};
