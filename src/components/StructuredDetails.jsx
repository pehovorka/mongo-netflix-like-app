import React from "react";
import PropTypes from "prop-types";
import { Descriptions, Table } from "antd";
import { Link } from "react-router-dom";

function StructuredDetails({ obj }) {
  const items = Object.keys(obj);

  return (
    <Descriptions title="Entity info" bordered>
      {items.map((item) => (
        <Descriptions.Item label={item} key={item}>
          {Array.isArray(obj[item]) ? (
            <RenderArray array={obj[item]} label={item} />
          ) : (
            obj[item].toString()
          )}
        </Descriptions.Item>
      ))}
    </Descriptions>
  );
}

StructuredDetails.propTypes = {
  obj: PropTypes.object,
};

function RenderArray({ array, label }) {
  if (typeof array[0] === "object") {
    return (
      <Table
        columns={Object.keys(array[0]).map((key) => ({
          title: key,
          dataIndex: key,
        }))}
        dataSource={array.map((item, index) => ({
          ...item,
          ...(item.slug && {
            slug: <Link to={`/movies/${item.slug}`}>{item.slug}</Link>,
          }),
          ...(label === "cast" || label === "directors" || label === "writers"
            ? {
                _id: (
                  <Link to={`/people/${item._id.toString()}`}>
                    {item._id.toString()}
                  </Link>
                ),
              }
            : label === "roles"
            ? {
                _id: (
                  <Link to={`/roles/${item._id.toString()}`}>
                    {item._id.toString()}
                  </Link>
                ),
              }
            : {
                _id: item._id.toString(),
              }),
          key: index,
        }))}
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

export default StructuredDetails;
