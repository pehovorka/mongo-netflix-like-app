import PropTypes from "prop-types";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { FIND_TYPES } from "../hooks/useFind";

function DebugInfo({ req, res }) {
  return (
    <div>
      <h2>Debug info</h2>
      {req && (
        <div>
          <h3>Query</h3>
          <SyntaxHighlighter
            language="javascript"
            style={monokaiSublime}
          >{`db.${req.collectionName}.${
            req?.type === FIND_TYPES.FIND_ONE ? "findOne" : "find"
          }(${JSON.stringify(req.query)})`}</SyntaxHighlighter>
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
    query: PropTypes.object,
  }),
  res: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default DebugInfo;
