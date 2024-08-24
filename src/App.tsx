import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {Outlet} from "react-router";
import {Header} from "./components/Header/Header";
import {Footer} from "./components/Footer/Footer";
import {MainPage} from "./pages/MainPage/MainPage";
import {Provider} from "react-redux";
import {store} from "./store";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <MainPage />,
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
            <Outlet/>
            <Footer/>
        </div>
    )
}
