import axios from "axios";

const ANILIST_API_URL = "https://graphql.anilist.co";

/* ============================
   Fetch Top Comics
   ============================ */
export const fetchTopComics = async () => {
  const query = `
    query {
      Page(perPage: 20) {
        media(type: MANGA, sort: POPULARITY_DESC, isAdult: false) {
          id
          title {
            english
            romaji
          }
          coverImage {
            large
          }
          description
        }
      }
    }
  `;

  try {
    const response = await axios.post(
      ANILIST_API_URL,
      { query },
      { headers: { "Content-Type": "application/json" } }
    );

    // Map the results into a clean structure
    return response.data.data.Page.media.map((comic) => ({
      id: comic.id,
      title: comic.title.english || comic.title.romaji || "Unknown Title",
      coverUrl: comic.coverImage?.large || null,
      description: comic.description || "No description available.",
    }));
  } catch (error) {
    console.error("Error fetching top comics:", error.message);
    throw new Error("Failed to fetch top comics.");
  }
};

/* ============================
   Fetch Comics by Search Query
   ============================ */
export const fetchComicsBySearch = async (title) => {
  const query = `
    query ($search: String) {
      Page(perPage: 10) {
        media(search: $search, type: MANGA, sort: POPULARITY_DESC, isAdult: false) {
          id
          title {
            english
            romaji
          }
          coverImage {
            large
          }
          description
        }
      }
    }
  `;

  try {
    const response = await axios.post(
      ANILIST_API_URL,
      { query, variables: { search: title } },
      { headers: { "Content-Type": "application/json" } }
    );

    return response.data.data.Page.media.map((comic) => ({
      id: comic.id,
      title: comic.title.english || comic.title.romaji || "Unknown Title",
      coverUrl: comic.coverImage?.large || null,
      description: comic.description || "No description available.",
    }));
  } catch (error) {
    console.error("Error fetching comics by search:", error.message);
    throw new Error("Failed to fetch comics by search.");
  }
};
