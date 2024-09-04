import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {Navigate, Outlet} from "react-router";
import {Header} from "./components/Header/Header";
import {Footer} from "./components/Footer/Footer";
import {MainPage} from "./pages/MainPage/MainPage";
import {Provider} from "react-redux";
import {store} from "./store";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ContactsPage} from "./pages/ContactsPage/ContactsPage";
import {AboutPage} from "./pages/AboutPage/AboutPage";
import {CatalogPage} from "./pages/CatalogPage/CatalogPage";
import {ItemPage} from "./pages/ItemPage/ItemPage";
import {CartPage} from "./pages/CartPage/CartPage";
import {NotFoundPage} from "./pages/NotFoundPage/NotFoundPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <MainPage />,
            },
            {
                path: "/catalog",
                element: <CatalogPage />,
            },
            {
                path: "/catalog/:id",
                element: <ItemPage />,
            },
            {
                path: "/contacts",
                element: <ContactsPage />,
            },
            {
                path: "/about",
                element: <AboutPage />,
            },
            {
                path: "/cart",
                element: <CartPage />,
            },
            {
                path: "/404",
                element: <NotFoundPage />,
            },
            {
                path: "/*",
                element: <Navigate to="/404"/>
            },
        ],
    },
]);

function App() {
  return (
      <Provider store={store}>
          <RouterProvider router={router}/>
      </Provider>
  )
}

export default App

function Layout() {
    return (
        <div className="layout">
            <Header/>
            <main className="container">
                <div className="row">
                    <div className="col">
                        <Outlet/>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    )
}
