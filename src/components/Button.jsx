import PropTypes from "prop-types";

const Button = ({ disabled, onClick }) => {
  return (
    <button
      className={`w-full mt-2 text-white font-body font-semibold bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg ${
        disabled && "opacity-50 cursor-wait"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      Rechercher
    </button>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
