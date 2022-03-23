import Title from "antd/lib/typography/Title";
import PropTypes from "prop-types";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { BSON } from "realm-web";

import { QUERY_TYPES } from "../hooks/useQuery";

function DebugInfo({ req, res }) {
  return (
    <div>
      <Title level={3}>Debug info</Title>
      {req && (
        <div>
          <Title level={4}>Query</Title>
          <SyntaxHighlighter language="json" style={monokaiSublime}>{`db.${
            req.collectionName
          }.${
            req?.type === QUERY_TYPES.FIND_ONE
              ? "findOne"
              : req?.type === QUERY_TYPES.AGGREGATE
              ? "aggregate"
              : "find"
          }(${
            BSON.ObjectId.isValid(req.query?._id)
              ? `{\n  "_id": ObjectId("${req.query._id.toString()}")\n}`
              : JSON.stringify(req.query, null, 2)
          })`}</SyntaxHighlighter>
        </div>
      )}
      {res && (
        <div>
          <Title level={4}>Response</Title>
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
