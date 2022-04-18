import React from "react";
import AppRouter from "./router/AppRouter";
import { BrowserRouter } from "react-router-dom";
// import { ChakraProvider } from '@chakra-ui/react'

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <ChakraProvider> */}
          <AppRouter />
        {/* </ChakraProvider> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
