import { useEffect, useState } from "react";
import { useRealmApp } from "../RealmApp";

export const QUERY_TYPES = {
  FIND: "find",
  FIND_ONE: "findOne",
  AGGREGATE: "aggregate",
};

export function useQuery({ collectionName, query, type }) {
  const app = useRealmApp();
  const [data, setData] = useState([]);
  const [called, setCalled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function findData() {
      const mongodb = app.currentUser.mongoClient("mongodb-atlas");
      const collection = mongodb
        .db(process.env.REACT_APP_DB_NAME)
        .collection(collectionName);
      setCalled(true);
      try {
        let data;
        if (type === QUERY_TYPES.FIND_ONE) {
          data = await collection.findOne(query);
        } else if (type === QUERY_TYPES.AGGREGATE) {
          data = await collection.aggregate(query);
        } else {
          data = await collection.find(query);
        }
        setData(data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    }

    !called && loading && findData();
  }, [app.currentUser, data, collectionName, query, loading, called, type]);

  return { data, called, loading, error };
}
