import { FIND_TYPES, useFind } from "../hooks/useFind";
import DebugInfo from "../components/DebugInfo";

function MoviesList() {
  const req = { collectionName: "movies", query: {}, type: FIND_TYPES.FIND };
  const { data: movies, loading, error } = useFind(req);

  if (loading) return "Loading...";
  if (error) return error.toString();

  return <DebugInfo req={req} res={movies} />;
}

export default MoviesList;
