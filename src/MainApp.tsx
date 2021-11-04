import { Component } from "react";
import * as Constants from "./constants";
import { Header, Footer } from "./components/components";
import { Route, Switch } from "react-router-dom";
import { Home, Products, About, SignIn, SignUp } from "./pages/pages";

interface Props {}

export class MainApp extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }


  render() {
    return (
      <>
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
      </>
    );
  }
}

