import { Component } from "react";
import * as constants from "./constants";
import { Header, Footer, RequireAuth } from "./components/components";
import { Route, Routes, Navigate } from "react-router-dom";
import { Home, Products, About, Profile, Cart } from "./pages/pages";
import { SignIn } from "./pages/SignIn";

interface IProps {}

interface IState {}

class MainApp extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
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
        <Header siteName={constants.SITE_NAME} link={constants.HOME_URL} />
        <Routes>
          <Route path={constants.HOME_URL} element={<Home />} />
          <Route
            path={constants.ABOUT_URL}
            element={
              <RequireAuth>
                <About />
              </RequireAuth>
            }
          />
          <Route
            path={constants.PRODUCTS_URL}
            element={
              <RequireAuth>
                <Products />
              </RequireAuth>
            }
          >
            <Route
              path=":platform"
              element={
                <RequireAuth>
                  <Products />
                </RequireAuth>
              }
            />
          </Route>
          <Route
            path={constants.PROFILE_URL}
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path={constants.CART_URL}
            element={
              <RequireAuth>
                <Cart />
              </RequireAuth>
            }
          />
          <Route path={constants.SIGNIN_URL} element={<SignIn />} />
        </Routes>
        <Footer siteName={constants.SITE_NAME} />
      </>
    );
  }
}

export default MainApp;
