import Select from "react-select";
import PropTypes from "prop-types";
import { getSelectStyles, getThemeClass } from "../utils/helpers";
import ErrorComponent from "./ErrorComponent";

const FilterBox = ({
  theme,
  customStyles,
  disabled,
  label,
  options,
  handleChangefn,
  error,
}) => {
  return (
    <div className="my-4">
      <label
        className={`font-medium font-body ${
          theme === "dark" ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {label} :
      </label>
      <Select
        isDisabled={disabled}
        options={options}
        onChange={handleChangefn}
        className={`basic-multi-select font-body bg-opacity-20 focus:ring-indigo-900 rounded border text-base outline-none leading-8 transition-colors duration-200 ease-in-out
         ${getThemeClass(
           "bg-gray-600 border-gray-600 focus:border-indigo-500 text-white",
           "bg-gray-200 border-gray-300 focus:border-indigo-500 text-black",
           theme
         )}`}
        styles={getSelectStyles(theme, customStyles)}
      />
      {error && <ErrorComponent errorMessage={error} />}
    </div>
  );
};
FilterBox.propTypes = {
  theme: PropTypes.string.isRequired,
  customStyles: PropTypes.object,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  handleChangefn: PropTypes.func.isRequired,
  error: PropTypes.string,
};
export default FilterBox;
