import PropTypes from "prop-types";
import { Select } from "antd";
const { Option } = Select;

const COUNTRIES = [
  { _id: null, name: "No filter" },
  { _id: "gb", name: "United Kingdom" },
  { _id: "us", name: "United States of America" },
  { _id: "cz", name: "Czechia" },
  { _id: "at", name: "Austria" },
];

function CountrySelect({ setCountryQuery }) {
  const handleChange = (value) => {
    setCountryQuery(
      value
        ? {
            availabilities: {
              $elemMatch: { countryCode: value, isAvailable: true },
            },
          }
        : null
    );
  };

  return (
    <Select
      defaultValue={null}
      style={{ width: "100%" }}
      onChange={handleChange}
    >
      {COUNTRIES.map((country) => (
        <Option value={country._id} key={country._id}>
          {country.name}
        </Option>
      ))}
    </Select>
  );
}

CountrySelect.propTypes = {
  setCountryQuery: PropTypes.func.isRequired,
};

export default CountrySelect;
