import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import Content from "./components/Content";
import InputBox from "./components/InputBox";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <InputBox />
        <Content />
      </div>
    </Provider>
  );
};

export default App;
