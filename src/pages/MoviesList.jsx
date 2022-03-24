import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, List, PageHeader, Row, Skeleton } from "antd";
import Title from "antd/lib/typography/Title";

import { QUERY_TYPES, useQuery } from "../hooks/useQuery";
import { collections } from "../config/db";
import {
  DebugInfo,
  PageLayout,
  GenreSelect,
  CountrySelect,
} from "../components";

function MoviesList() {
  const [req, setReq] = useState({
    collectionName: collections.movies,
    query: {},
    type: QUERY_TYPES.FIND,
  });
  const { data: movies, loading, error, setCalled } = useQuery(req);
  const [countryQuery, setCountryQuery] = useState(null);
  const [genreQuery, setGenreQuery] = useState(null);

  useEffect(() => {
    let queries = [];

    genreQuery && queries.push(genreQuery);
    countryQuery && queries.push(countryQuery);

    setReq({
      collectionName: collections.movies,
      type: QUERY_TYPES.FIND,
      ...(queries.length === 0
        ? { query: {} }
        : queries.length === 1
        ? { query: queries[0] }
        : {
            query: {
              $and: [...queries],
            },
          }),
    });

    setCalled(false);
  }, [countryQuery, genreQuery, setCalled]);

  return (
    <PageLayout>
      <PageHeader ghost={false} title="Movies" style={{ marginBottom: "2rem" }}>
        <Row gutter={20}>
          <Col xs={12}>
            <Title level={5}>Filter genre</Title>
            <GenreSelect setGenreQuery={setGenreQuery} />
          </Col>
          <Col xs={12}>
            <Title level={5}>Filter country availability</Title>
            <CountrySelect setCountryQuery={setCountryQuery} />
          </Col>
        </Row>
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
