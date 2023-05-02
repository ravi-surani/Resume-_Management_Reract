import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { applyMiddleware, createStore } from "redux";
import { MainReducer } from "./Redux/Reducers/index";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = createStore(MainReducer, {}, applyMiddleware(thunk));

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
