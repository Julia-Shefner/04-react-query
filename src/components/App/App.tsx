import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import MovieGrid from "../MovieGrid/MovieGrid";
import type { Movie } from "../../types/movie";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { fetchMovies } from "../../services/movieService";
import MovieModal from "../MovieModal/MovieModal";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const handleSearch = async (query: string) => {
    try {
      setMovies([]);
      setIsLoading(true);
      setIsError(false);
      const data = await fetchMovies(query);
      if (data.length === 0) {
        toast.error("No movies found for your request", { duration: 2000 });
      }
      setMovies(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleModalClose = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={css.app}>
      <Toaster position="top-center" />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleMovieSelect} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleModalClose} />
      )}
    </div>
  );
}

export default App;
