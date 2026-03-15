import axios from "axios";
import type { Movie } from "../types/movie";

interface MoviesHttpResponse {
  results: Movie[];
  total_pages: number;
  page: number;
}

export const fetchMovies = async (
  topic: string,
  page: number,
): Promise<MoviesHttpResponse> => {
  const myKey = import.meta.env.VITE_TMDB_TOKEN;
  const response = await axios.get<MoviesHttpResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query: topic,
        include_adult: false,
        language: "en-US",
        page,
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${myKey}`,
      },
    },
  );
  return response.data;
};
