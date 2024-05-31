import PropTypes from "prop-types";

const Button = ({ isFetching, onClick }) => {
  return (
    <button
      className={`w-full mt-2 text-white font-body font-semibold bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg ${
        isFetching && "opacity-50 cursor-wait"
      }`}
      onClick={onClick}
      disabled={isFetching}
    >
      Rechercher
    </button>
  );
};

Button.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
