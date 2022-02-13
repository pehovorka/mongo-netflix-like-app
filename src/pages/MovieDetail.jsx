import { useParams, useNavigate } from "react-router-dom";

import DebugInfo from "../components/DebugInfo";
import { collections } from "../config/db";
import { QUERY_TYPES, useQuery } from "../hooks/useQuery";

function MovieDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const req = {
    collectionName: collections.movies,
    query: [
      { $match: { slug: slug } },
      {
        $lookup: {
          from: collections.genres,
          localField: "genres",
          foreignField: "_id",
          as: "genres",
        },
      },
    ],
    type: QUERY_TYPES.AGGREGATE,
  };
  const {
    data: [movie],
    loading,
    error,
  } = useQuery(req);

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
