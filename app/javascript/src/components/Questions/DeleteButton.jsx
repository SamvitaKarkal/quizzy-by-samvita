import React from "react";
import PropTypes from "prop-types";

const DeleteButton = ({ type = "button", deleteOption }) => {
  return (
    <div className="mt-8">
      <button
        type={type}
        onClick={deleteOption}
        className="relative py-2 text-white w-10 mt-4 font-bold font-4xl bg-red-600 hover:bg-red-800 shadow-sm        text-sm font-medium leading-5 text-white transition duration-150
         ease-in-out border border-transparent 
         group hover:bg-opacity-90 focus:outline-none"
      >
        -
      </button>
    </div>
  );
};

DeleteButton.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default DeleteButton;
