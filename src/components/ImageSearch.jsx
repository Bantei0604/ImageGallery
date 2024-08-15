import React, { useContext } from "react";
import { ImageContext } from "../context/ImageContext";
import { actions } from "../context/ImageContext"; // Import actions separately

const ImageSearch = () => {
  const { state, dispatch } = useContext(ImageContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchTerm = e.target.elements.searchTerm.value;
    dispatch({ type: actions.SET_TERM, payload: searchTerm });
  };

  return (
    <div className="max-w-sm rounded overflow-hidden my-10 mx-auto">
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="flex items-center border-b-2 border-teal-400 py-2">
          <input
            name="searchTerm"
            className="appearance-none bg-transparent border-none w-full text-gray-500 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Search Image Term..."
          />
          <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ImageSearch;
