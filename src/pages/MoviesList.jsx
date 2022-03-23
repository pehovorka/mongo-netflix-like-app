import { useState } from "react";
import { Link } from "react-router-dom";
import { List, PageHeader, Skeleton } from "antd";
import Title from "antd/lib/typography/Title";

import { QUERY_TYPES, useQuery } from "../hooks/useQuery";
import { collections } from "../config/db";
import { DebugInfo, PageLayout } from "../components";
import GenreSelect from "../components/GenreSelect";

function MoviesList() {
  const [req, setReq] = useState({
    collectionName: collections.movies,
    query: {},
    type: QUERY_TYPES.FIND,
  });
  const { data: movies, loading, error, setCalled } = useQuery(req);

  return (
    <PageLayout>
      <PageHeader ghost={false} title="Movies" style={{ marginBottom: "2rem" }}>
        <Title level={5}>Filter genre</Title>
        <GenreSelect req={req} setReq={setReq} setCalled={setCalled} />
        {loading && <Skeleton active />}
        {error && error.toString()}
        {movies && (
          <div style={{ margin: "1rem 0" }}>
            <Title level={5}>Found movies ({movies.length})</Title>
            <List
              dataSource={movies}
              bordered
              renderItem={(movie) => (
                <List.Item>
                  <Link to={movie.slug}>{movie.name}</Link>
                </List.Item>
              )}
            ></List>
          </div>
        )}
      </PageHeader>
      <DebugInfo req={req} res={movies} />
    </PageLayout>
  );
}

export default MoviesList;
