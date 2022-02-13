import { useParams, useNavigate } from "react-router-dom";
import DebugInfo from "../components/DebugInfo";
import { FIND_TYPES, useFind } from "../hooks/useFind";
function MovieDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const req = {
    collectionName: "movies",
    query: { slug: slug },
    type: FIND_TYPES.FIND_ONE,
  };
  const { data: movie, loading, error } = useFind(req);

  if (loading) return "Loading...";
  if (error) return error.toString();

  return (
    <>
      <button onClick={() => navigate(-1)}>← go back</button>

      <h1>{movie?.name}</h1>
      <DebugInfo req={req} res={movie} />
    </>
  );
}

export default MovieDetail;
