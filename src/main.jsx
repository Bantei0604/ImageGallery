import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ImageProvider } from "./context/ImageContext.jsx";

createRoot(document.getElementById("root")).render(
  <ImageProvider>
    <App />
  </ImageProvider>
);
