import { Component } from "react";
import * as constants from "./constants";
import { Header, Footer } from "./components/components";
import { Route, Switch, withRouter, RouteComponentProps } from "react-router-dom";
import { Home, Products, About, Profile } from "./pages/pages";

interface IProps extends RouteComponentProps {}

interface IState {
  userName: string | null;
  cart: number;
}

class MainApp extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      userName: null,
      cart: 0,
    };
    this.handlerUserNameSet = this.handlerUserNameSet.bind(this);
    this.handlerAddToCart = this.handlerAddToCart.bind(this);
  }

  handlerUserNameSet(user: string | null) {
    this.setState({ userName: user });
  }

  handlerAddToCart() {
    if (this.state.userName) {
      this.setState((state) => {
        return {
          cart: state.cart + 1,
        };
      });
    } else {
      alert("Please, log in");
    }
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
        <Header
          siteName={constants.SITE_NAME}
          link={constants.HOME_URL}
          loggedUserName={this.state.userName}
          cart={this.state.cart}
          handlerUserNameSet={this.handlerUserNameSet}
        />
        <Switch>
          <Route path={constants.PRODUCTS_URL} component={Products} />
          <Route path={constants.ABOUT_URL} component={About} />
          <Route path={constants.PROFILE_URL}>
            <Profile username={this.state.userName} />
          </Route>
          <Route path={constants.HOME_URL}>
            <Home cartHandler={this.handlerAddToCart} />
          </Route>
        </Switch>
        <Footer siteName={constants.SITE_NAME} />
      </>
    );
  }
}

export default withRouter(MainApp);
