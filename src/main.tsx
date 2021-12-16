import "./styles/main.css";
import "./styles/main.scss";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
import { StrictMode } from "react";
import ReactDom from "react-dom";
import someTypeScript from "./someTypeScript";
import MainApp from "./MainApp";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./helpers/store";

interface AppProps {
  nothing: boolean;
}
interface AppState {
  title: string;
}

const AppContainer = (props: AppProps) => {
  // test class-dead-code
  const goExlcude = true;
  if (!goExlcude) {
    console.warn("class-dead-code doesn't work");
  }

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

ReactDom.render(<AppContainer nothing={false} />, document.getElementById("app"));
