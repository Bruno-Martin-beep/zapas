import React from "react";
// import "./App.scss";
import "./styles/main.scss";
import { Provider } from "react-redux";
import store from "./store";
import Experience from "./experience/components/Experience";

function App() {
  return (
    <Provider store={store}>
      <Experience />
    </Provider>
  );
}

export default App;
