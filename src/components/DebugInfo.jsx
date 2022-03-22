import Title from "antd/lib/typography/Title";
import PropTypes from "prop-types";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { QUERY_TYPES } from "../hooks/useQuery";

function DebugInfo({ req, res }) {
  console.log(req.query);
  return (
    <div>
      <Title level={2}>Debug info</Title>
      {req && (
        <div>
          <Title level={3}>Query</Title>
          <SyntaxHighlighter language="json" style={monokaiSublime}>{`db.${
            req.collectionName
          }.${
            req?.type === QUERY_TYPES.FIND_ONE
              ? "findOne"
              : req?.type === QUERY_TYPES.AGGREGATE
              ? "aggregate"
              : "find"
          }(${
            req.query._id?.constructor?.name === "ObjectId"
              ? `{\n  "_id": ObjectId("${req.query._id.toString()}")\n}`
              : JSON.stringify(req.query, null, 2)
          })`}</SyntaxHighlighter>
        </div>
      )}
      {res && (
        <div>
          <Title level={3}>Response</Title>
          <SyntaxHighlighter language="json" style={monokaiSublime}>
            {JSON.stringify(res, null, 3)}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
}

DebugInfo.propTypes = {
  req: PropTypes.shape({
    collectionName: PropTypes.string,
    query: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    type: PropTypes.oneOf(Object.values(QUERY_TYPES)),
  }),
  res: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default DebugInfo;
