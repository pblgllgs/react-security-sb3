import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import Rutas from "./routes/Rutas";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Rutas />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
