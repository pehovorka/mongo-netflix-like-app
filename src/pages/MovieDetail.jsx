import { Skeleton } from "antd";
import Title from "antd/lib/typography/Title";
import { useParams } from "react-router-dom";

import { DebugInfo, MovieDetails, PageLayout } from "../components";
import { collections } from "../config/db";
import { QUERY_TYPES, useQuery } from "../hooks/useQuery";

function MovieDetail() {
  const { slug } = useParams();

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

  return (
    <PageLayout>
      {loading && <Skeleton active />}
      {error && error.toString()}
      {movie && (
        <>
          <Title>{movie?.name}</Title>
          <MovieDetails movie={movie} />
        </>
      )}
      <DebugInfo req={req} res={movie} />
    </PageLayout>
  );
}

export default MovieDetail;
