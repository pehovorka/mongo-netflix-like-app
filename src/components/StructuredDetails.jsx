import React from "react";
import PropTypes from "prop-types";
import { Descriptions, Table } from "antd";
import { Link } from "react-router-dom";
import { BSON } from "realm-web";

function StructuredDetails({ obj }) {
  const items = Object.keys(obj);

  return (
    <Descriptions title="Entity info">
      {items.map((item) => (
        <Descriptions.Item label={item} key={item}>
          {Array.isArray(obj[item]) ? (
            <RenderArray array={obj[item]} label={item} />
          ) : typeof obj[item] === "object" && obj[item] !== null ? (
            <RenderObject object={obj[item]} />
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
          ...(item.isAvailable && {
            isAvailable: item.isAvailable ? "true" : "false",
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

function RenderObject({ object }) {
  if (BSON.ObjectId.isValid(object)) {
    return object.toString();
  }

  return (
    <Table
      columns={[
        {
          title: "key",
          dataIndex: "key",
        },
        {
          title: "value",
          dataIndex: "value",
        },
      ]}
      dataSource={Object.keys(object).map((key) => ({
        key: key,
        value: object[key].toString(),
      }))}
      size="small"
      pagination={false}
    />
  );
}

export default StructuredDetails;
