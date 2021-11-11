import { Component } from "react";
import * as constants from "./constants";
import { Header, Footer } from "./components/components";
import { Route, Switch, withRouter, RouteComponentProps } from "react-router-dom";
import { Home, Products, About, SignIn, SignUp } from "./pages/pages";

interface Props extends RouteComponentProps {}

class MainApp extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidCatch(e: Error) {
    console.error("Error: " + e);
    this.props.history.push("/");
  }

  componentDidMount() {
    document.title = constants.SITE_NAME;
  }

  render() {
    return (
      <>
        <Header siteName={constants.SITE_NAME} link={constants.HOME_URL} />
        <Switch>
          <Route path={constants.PRODUCTS_URL}>
            <Products />
          </Route>
          <Route path={constants.ABOUT_URL}>
            <About />
          </Route>
          <Route path={constants.SIGNIN_URL}>
            <SignIn />
          </Route>
          <Route path={constants.SIGNUP_URL}>
            <SignUp />
          </Route>
          <Route path={constants.HOME_URL}>
            <Home />
          </Route>
        </Switch>
        <Footer siteName={constants.SITE_NAME} />
      </>
    );
  }
}

export default withRouter(MainApp);
