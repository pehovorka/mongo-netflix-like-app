import { useEffect } from "react";
import { Alert, PageHeader, Skeleton } from "antd";
import { useParams } from "react-router-dom";
import { BSON } from "realm-web";
import PropTypes from "prop-types";

import { DebugInfo, StructuredDetails, PageLayout } from "../components";
import { collections } from "../config/db";
import { QUERY_TYPES, useQuery } from "../hooks/useQuery";

function GeneralEntityDetail({ type }) {
  const { entityId } = useParams();
  const entityObjectId = BSON.ObjectId.isValid(entityId)
    ? BSON.ObjectId(entityId)
    : null;

  let collectionName;
  if (type === "person") {
    collectionName = collections.people;
  } else if (type === "role") {
    collectionName = collections.roles;
  }

  const req = {
    collectionName: collectionName,
    query: { _id: entityObjectId },
    type: QUERY_TYPES.FIND_ONE,
  };

  const { data: entity, loading, error, setCalled } = useQuery(req);

  useEffect(() => {
    setCalled(false);
  }, [entityId, setCalled]);

  return (
    <PageLayout>
      {loading && <Skeleton active />}
      {error && error.toString()}
      {!entityObjectId && (
        <Alert message="Entered ObjectId is not valid!" type="error" />
      )}
      {entity && (
        <PageHeader
          ghost={false}
          title={entity?.name}
          style={{ marginBottom: "2rem" }}
        >
          <StructuredDetails obj={entity} />
        </PageHeader>
      )}
      <DebugInfo req={req} res={entity} />
    </PageLayout>
  );
}

GeneralEntityDetail.propTypes = {
  type: PropTypes.oneOf(["person", "role"]),
};

export default GeneralEntityDetail;
