import { Link } from "react-router-dom";

import { QUERY_TYPES, useQuery } from "../hooks/useQuery";
import { collections } from "../config/db";
import DebugInfo from "../components/DebugInfo";

function MoviesList() {
  const req = {
    collectionName: collections.movies,
    query: {},
    type: QUERY_TYPES.FIND,
  };
  const { data: movies, loading, error } = useQuery(req);

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
