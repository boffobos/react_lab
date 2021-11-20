import { Component, ReactElement } from "react";
import * as constants from "./constants";
import { Header, Footer, SignInModal } from "./components/components";
import { Route, Routes } from "react-router-dom";
import { Home, Products, About, Profile } from "./pages/pages";

interface IProps {}

interface IState {
  userName: string | null;
  cart: number;
  signInOpen: boolean;
}

class MainApp extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      userName: null,
      cart: 0,
      signInOpen: false
    };
    this.handlerUserNameSet = this.handlerUserNameSet.bind(this);
    this.handlerAddToCart = this.handlerAddToCart.bind(this);
    this.requireAuth = this.requireAuth.bind(this);
  }

  requireAuth(children: ReactElement) {
    const closeSignInModal = () => {
      this.setState({signInOpen: false});
    }

    if (this.state.userName) return children;
    return (
      <SignInModal
        onClose={closeSignInModal}
        isOpen={this.state.signInOpen}
        handlerLogin={this.handlerUserNameSet}
        navigate={navigate}
      />
    );
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
        <Routes>
          <Route path={constants.HOME_URL} element={<Home cartHandler={this.handlerAddToCart} />} />
          <Route path={constants.PRODUCTS_URL} element={<Products />} />
          <Route path={constants.ABOUT_URL} element={<About />} />
          <Route path={constants.PROFILE_URL} element={<Profile username={this.state.userName} />} />
        </Routes>
        <Footer siteName={constants.SITE_NAME} />
      </>
    );
  }
}

export default MainApp;
