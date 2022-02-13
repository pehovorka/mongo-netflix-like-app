import React from "react";
import PropTypes from "prop-types";
import { Descriptions, Table } from "antd";

function MovieDetails({ movie }) {
  const items = Object.keys(movie);

  return (
    <Descriptions title="Movie info" bordered>
      {items.map((item) => (
        <Descriptions.Item label={item} key={item}>
          {Array.isArray(movie[item]) ? (
            <RenderArray array={movie[item]} />
          ) : (
            movie[item].toString()
          )}
        </Descriptions.Item>
      ))}
    </Descriptions>
  );
}

MovieDetails.propTypes = {
  movie: PropTypes.object,
};

function RenderArray({ array }) {
  if (typeof array[0] === "object") {
    return (
      <Table
        columns={Object.keys(array[0]).map((key) => ({
          title: key,
          dataIndex: key,
        }))}
        dataSource={array.map((item, index) => ({ ...item, key: index }))}
        size="small"
        pagination={false}
      ></Table>
    );
  } else {
    return (
      <ul style={{ padding: 0 }}>
        {array.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  }
}

export default MovieDetails;
