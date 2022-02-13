import PropTypes from "prop-types";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { QUERY_TYPES } from "../hooks/useQuery";

function DebugInfo({ req, res }) {
  return (
    <div>
      <h2>Debug info</h2>
      {req && (
        <div>
          <h3>Query</h3>
          <SyntaxHighlighter language="json" style={monokaiSublime}>{`db.${
            req.collectionName
          }.${
            req?.type === QUERY_TYPES.FIND_ONE
              ? "findOne"
              : req?.type === QUERY_TYPES.AGGREGATE
              ? "aggregate"
              : "find"
          }(${JSON.stringify(req.query, null, 2)})`}</SyntaxHighlighter>
        </div>
      )}
      {res && (
        <div>
          <h3>Response</h3>
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
