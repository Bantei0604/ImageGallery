import React, { useContext } from "react";
import { ImageContext } from "../context/ImageContext";

const Images = () => {
  const { state } = useContext(ImageContext);

  if (state.isLoading) {
    return (
      <p className="text-center text-2xl text-gray-600 mt-8 font-bold">
        Loading...
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {state.images.length > 0 ? (
        state.images.map((image, index) => (
          <div
            key={index}
            className="max-w-sm rounded overflow-hidden shadow-lg bg-white"
          >
            <img
              src={image.largeImageURL}
              alt={image.tags}
              className="w-full h-48 object-cover"
            />
            <div className="px-4 py-2">
              <div className="font-bold text-gray-700 text-lg">
                {image.user}
              </div>
              <ul className="text-gray-600 mt-2">
                <li>
                  <strong>Views: </strong>
                  {image.views}
                </li>
                <li>
                  <strong>Downloads: </strong>
                  {image.downloads}
                </li>
                <li>
                  <strong>Likes: </strong>
                  {image.likes}
                </li>
              </ul>
              <div className="mt-2">
                {image.tags.split(", ").map((tag, i) => (
                  <span
                    key={i}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-medium text-gray-700 mr-2 mb-1"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-2xl text-gray-600 mt-8 font-bold">
          No images found
        </p>
      )}
    </div>
  );
};

export default Images;
