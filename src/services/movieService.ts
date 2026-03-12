import axios from "axios";
import type { Movie } from "../types/movie";

interface MoviesHttpResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchMovies = async (topic: string): Promise<Movie[]> => {
  const myKey = import.meta.env.VITE_TMDB_TOKEN;
  const response = await axios.get<MoviesHttpResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query: topic,
        include_adult: false,
        language: "en-US",
        page: 1,
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${myKey}`,
      },
    },
  );
  return response.data.results;
};
