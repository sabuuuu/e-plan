import PropTypes from "prop-types";

const ErrorComponent = ({ errorMessage }) => {
  if (!errorMessage) return null;

  return (
    <p className="error-message text-red-700 text-center mt-2">
      {errorMessage}
    </p>
  );
};
ErrorComponent.propTypes = {
  errorMessage: PropTypes.string,
};

export default ErrorComponent;
