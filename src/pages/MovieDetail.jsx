import { PageHeader, Skeleton } from "antd";
import Title from "antd/lib/typography/Title";
import { useParams } from "react-router-dom";

import { DebugInfo, StructuredDetails, PageLayout } from "../components";
import { collections } from "../config/db";
import { QUERY_TYPES, useQuery } from "../hooks/useQuery";

function MovieDetail() {
  const { slug } = useParams();

  const req = {
    collectionName: collections.movies,
    query: { slug: slug },
    type: QUERY_TYPES.FIND_ONE,
  };
  const { data: movie, loading, error } = useQuery(req);

  return (
    <PageLayout>
      {loading && <Skeleton active />}
      {error && error.toString()}
      {movie && (
        <PageHeader
          ghost={false}
          title={movie?.name}
          style={{ marginBottom: "2rem" }}
        >
          <StructuredDetails obj={movie} />
        </PageHeader>
      )}
      <DebugInfo req={req} res={movie} />
    </PageLayout>
  );
}

export default MovieDetail;
