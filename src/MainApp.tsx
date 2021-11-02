import { Component, ErrorInfo } from "react";
import * as Constants from "./constants";
import { Header, Footer } from "./components/export";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { Home, Products, About, SignIn, SignUp } from "./pages/export";

interface Props {}

export class MainApp extends Component {
  constructor(props: Props) {
    super(props);
    this.state = { errorMessage: "" };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    this.setState({ errorMessare: info });
    console.log(error);
  }

  render() {
    return (
      <Router>
        <Header siteName={Constants.SITE_NAME} link={Constants.HOME_URL} />
        <Switch>
          <Route path={Constants.PRODUCTS_URL}>
            <Products />
          </Route>
          <Route path={Constants.ABOUT_URL}>
            <About />
          </Route>
          <Route path={Constants.SIGNIN_URL}>
            <SignIn />
          </Route>
          <Route path={Constants.SIGNUP_URL}>
            <SignUp />
          </Route>
          <Route path={Constants.HOME_URL}>
            <Home />
          </Route>
        </Switch>
        <Footer siteName={Constants.SITE_NAME} />
      </Router>
    );
  }
}
