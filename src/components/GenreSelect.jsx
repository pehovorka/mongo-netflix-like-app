import PropTypes from "prop-types";
import { Select } from "antd";
import { QUERY_TYPES } from "../hooks/useQuery";
const { Option } = Select;

const GENRES = [
  { _id: null, name: "No filter" },
  { _id: "comedy", name: "Comedy" },
  { _id: "basedOnBooks", name: "Movies Based on Books" },
  { _id: "basedOnRealLife", name: "Movies Based on Real life" },
  { _id: "drama", name: "Drama" },
  { _id: "lateNightComedy", name: "Late Night Comedy" },
  { _id: "actionAndAdventure", name: "Action & Adventure" },
];

function GenreSelect({ req, setReq, setCalled }) {
  const handleChange = (value) => {
    setReq({
      ...req,
      ...(value ? { query: { "genres._id": value } } : { query: {} }),
    });
    setCalled(false);
  };

  return (
    <Select
      defaultValue={null}
      style={{ width: "100%" }}
      onChange={handleChange}
    >
      {GENRES.map((genre) => (
        <Option value={genre._id} key={genre._id}>
          {genre.name}
        </Option>
      ))}
    </Select>
  );
}

GenreSelect.propTypes = {
  setReq: PropTypes.func,
  req: PropTypes.shape({
    collectionName: PropTypes.string,
    query: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    type: PropTypes.oneOf(Object.values(QUERY_TYPES)),
  }),
  setCalled: PropTypes.func,
};

export default GenreSelect;
