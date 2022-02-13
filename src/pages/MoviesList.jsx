import { FIND_TYPES, useFind } from "../hooks/useFind";
import DebugInfo from "../components/DebugInfo";
import { Link } from "react-router-dom";

function MoviesList() {
  const req = { collectionName: "movies", query: {}, type: FIND_TYPES.FIND };
  const { data: movies, loading, error } = useFind(req);

  if (loading) return "Loading...";
  if (error) return error.toString();

  return (
    <>
      <h1>Movies</h1>
      {movies && (
        <ul>
          {movies.map((movie) => (
            <li key={movie._id}>
              <Link to={movie.slug}>{movie.name}</Link>
            </li>
          ))}
        </ul>
      )}
      <DebugInfo req={req} res={movies} />
    </>
  );
}

export default MoviesList;
