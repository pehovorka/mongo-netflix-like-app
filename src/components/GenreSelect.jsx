import PropTypes from "prop-types";
import { Select } from "antd";
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

function GenreSelect({ setGenreQuery }) {
  const handleChange = (value) => {
    setGenreQuery(value ? { "genres._id": value } : null);
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
  setGenreQuery: PropTypes.func.isRequired,
};

export default GenreSelect;
