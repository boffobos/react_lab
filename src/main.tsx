import "./styles/main.css";
import "./styles/main.scss";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
import { StrictMode, useState } from "react";
import ReactDom from "react-dom";
import someTypeScript from "./someTypeScript";
import MainApp from "./MainApp";
import { BrowserRouter as Router } from "react-router-dom";

interface AppProps {
  nothing: boolean;
}
interface AppState {
  title: string;
}

const AppContainer = (props: AppProps) => {
  const [title, setTitle] = useState(someTypeScript("Test-block for css-modules"));

  // test class-dead-code
  const goExlcude = true;
  if (!goExlcude) {
    console.warn("class-dead-code doesn't work");
  }

  return (
    <StrictMode>
      <Router>
        <MainApp />
      </Router>
    </StrictMode>
  );
};

ReactDom.render(<AppContainer nothing={false} />, document.getElementById("app"));
