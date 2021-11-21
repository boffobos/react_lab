import { Component, ReactElement } from "react";
import * as constants from "./constants";
import { Header, Footer, SignInModal, RequireAuth } from "./components/components";
import { Route, Routes, Navigate } from "react-router-dom";
import { Home, Products, About, Profile } from "./pages/pages";
import { SignIn } from "./pages/SignIn";

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
      signInOpen: true,
    };
    this.handlerUserNameSet = this.handlerUserNameSet.bind(this);
    this.handlerAddToCart = this.handlerAddToCart.bind(this);
    this.modalSwitch = this.modalSwitch.bind(this);
  }

  handlerUserNameSet(user: string | null) {
    this.setState({ userName: user });
  }

  modalSwitch(state: boolean) {
    this.setState({ signInOpen: state });
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
    <Navigate to="/" />;
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
          <Route
            path={constants.ABOUT_URL}
            element={
              <RequireAuth
                loggedUserName={this.state.userName}
                setUserName={this.handlerUserNameSet}
                isModalOpen={this.state.signInOpen}
                modalSwitchFunc={this.modalSwitch}
              >
                <About />
              </RequireAuth>
            }
          />
          <Route
            path={constants.PRODUCTS_URL}
            element={
              <RequireAuth
                loggedUserName={this.state.userName}
                setUserName={this.handlerUserNameSet}
                isModalOpen={this.state.signInOpen}
                modalSwitchFunc={this.modalSwitch}
              >
                <Products />
              </RequireAuth>
            }
          />
          <Route
            path={constants.PROFILE_URL}
            element={
              <RequireAuth
                loggedUserName={this.state.userName}
                setUserName={this.handlerUserNameSet}
                isModalOpen={this.state.signInOpen}
                modalSwitchFunc={this.modalSwitch}
              >
                <Profile username={this.state.userName} />
              </RequireAuth>
            }
          />
          <Route
            path={constants.SIGNIN_URL}
            element={<SignIn loggedUserName={this.state.userName} setUserName={this.handlerUserNameSet} />}
          />
        </Routes>
        <Footer siteName={constants.SITE_NAME} />
      </>
    );
  }
}

export default MainApp;
