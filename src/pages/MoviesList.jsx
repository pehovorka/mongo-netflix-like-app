import { Link } from "react-router-dom";
import { Skeleton } from "antd";
import Title from "antd/lib/typography/Title";

import { QUERY_TYPES, useQuery } from "../hooks/useQuery";
import { collections } from "../config/db";
import DebugInfo from "../components/DebugInfo";
import PageLayout from "../components/PageLayout";

function MoviesList() {
  const req = {
    collectionName: collections.movies,
    query: {},
    type: QUERY_TYPES.FIND,
  };
  const { data: movies, loading, error } = useQuery(req);

  return (
    <PageLayout>
      <Title>Movies</Title>
      {loading && <Skeleton active />}
      {error && error.toString()}
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
    </PageLayout>
  );
}

export default MoviesList;
