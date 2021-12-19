import "./styles/main.css";
import "./styles/main.scss";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
import { StrictMode } from "react";
import ReactDom from "react-dom";
import MainApp from "./MainApp";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./helpers/store";

const AppContainer = () => {
  return (
    <StrictMode>
      <Router>
        <Provider store={store}>
          <MainApp />
        </Provider>
      </Router>
    </StrictMode>
  );
};

ReactDom.render(<AppContainer />, document.getElementById("app"));
