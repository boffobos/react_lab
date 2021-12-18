import { lazy, PureComponent, Suspense } from "react";
import * as constants from "./constants";
import { Header, Footer, RequireAuth, Spinner } from "./components/components";
import { Route, Routes, Navigate } from "react-router-dom";
import { Home /* Products , About, Profile, Cart */ } from "./pages/pages";
const Products = lazy(() => import("./components/components").then((module) => ({ default: module.Products })));
const About = lazy(() => import("./components/components").then((module) => ({ default: module.About })));
const Profile = lazy(() => import("./components/components").then((module) => ({ default: module.Profile })));
const Cart = lazy(() => import("./components/components").then((module) => ({ default: module.Cart })));
import { SignIn } from "./pages/SignIn";

interface IProps {}

interface IState {}

class MainApp extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  componentDidCatch(e: Error) {
    //console.error("Error: " + e);
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
                <Suspense fallback={<Spinner />}>
                  <About />
                </Suspense>
              </RequireAuth>
            }
          />
          <Route
            path={constants.PRODUCTS_URL}
            element={
              <RequireAuth>
                <Suspense fallback={<Spinner />}>
                  <Products />
                </Suspense>
              </RequireAuth>
            }
          >
            <Route
              path=":platform"
              element={
                <RequireAuth>
                  <Suspense fallback={<Spinner />}>
                    <Products />
                  </Suspense>
                </RequireAuth>
              }
            />
          </Route>
          <Route
            path={constants.PROFILE_URL}
            element={
              <RequireAuth>
                <Suspense fallback={<Spinner />}>
                  <Profile />
                </Suspense>
              </RequireAuth>
            }
          />
          <Route
            path={constants.CART_URL}
            element={
              <RequireAuth>
                <Suspense fallback={<Spinner />}>
                  <Cart />
                </Suspense>
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
