import { createContext, useReducer, useEffect } from "react";
import axios from "axios";

export const ImageContext = createContext();

export const actions = {
  SET_IMAGES: "SET_IMAGES",
  SET_IS_LOADING: "SET_IS_LOADING",
  SET_TERM: "SET_TERM",
};

const initialState = {
  images: [],
  isLoading: true,
  term: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_IMAGES:
      return {
        ...state,
        images: action.payload,
      };
    case actions.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case actions.SET_TERM:
      return {
        ...state,
        term: action.payload,
      };
    default:
      return state;
  }
};

export const ImageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchInitialImages = async () => {
      try {
        const response = await axios.get(`https://pixabay.com/api/`, {
          params: {
            key: import.meta.env.VITE_PIXABAY_API_KEY,
            q: "aesthetic",
            image_type: "photo",
            per_page: 12,
          },
        });

        if (response.data && response.data.hits) {
          dispatch({
            type: actions.SET_IMAGES,
            payload: response.data.hits,
          });
        }
      } catch (err) {
        console.error("Error Fetching Initial Images", err);
      } finally {
        dispatch({ type: actions.SET_IS_LOADING, payload: false });
      }
    };

    fetchInitialImages();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      if (state.term) {
        dispatch({ type: actions.SET_IS_LOADING, payload: true });

        try {
          const response = await axios.get(`https://pixabay.com/api/`, {
            params: {
              key: import.meta.env.VITE_PIXABAY_API_KEY,
              q: state.term,
              image_type: "photo",
            },
          });
          console.log(response.data); // Check data structure

          if (response.data && response.data.hits) {
            dispatch({
              type: actions.SET_IMAGES,
              payload: response.data.hits,
            });
          } else {
            dispatch({
              type: actions.SET_IMAGES,
              payload: [],
            });
          }
        } catch (err) {
          console.error("Error Fetching Images", err);
          dispatch({
            type: actions.SET_IMAGES,
            payload: [],
          });
        } finally {
          dispatch({ type: actions.SET_IS_LOADING, payload: false });
        }
      } else {
        // If there's no term, stop loading and clear images
        dispatch({ type: actions.SET_IS_LOADING, payload: false });
        dispatch({ type: actions.SET_IMAGES, payload: [] });
      }
    };

    fetchImages();
  }, [state.term]);

  return (
    <ImageContext.Provider value={{ state, dispatch }}>
      {children}
    </ImageContext.Provider>
  );
};
