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
    <div className="grid grid-cols-4 gap-3">
      {state.images.length > 0 ? (
        state.images.map((image, index) => (
          <div
            key={index}
            className="max-w-sm rounded overflow-hidden shadow-lg"
          >
            <img
              src={image.largeImageURL}
              alt={image.tags}
              className="w-full"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-grey-500 text-m">{image.user}</div>
              <ul>
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
              <div className="px-6 py-4">
                {image.tags.split(", ").map((tag, i) => (
                  <span
                    key={i}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semi-bold text-gray-700 mr-2"
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
