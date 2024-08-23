import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {Outlet, Route, Routes} from "react-router";
import {Header} from "./components/Header/Header";
import {Footer} from "./components/Footer/Footer";
import {MainPage} from "./pages/MainPage/MainPage";

function App() {
  return (
      // <Provider store={store}>
        <Routes>
            <Route path="/" element={<Layout></Layout>}>
                <Route path="/" element={<MainPage/>}/>
            </Route>
        </Routes>
      // </Provider>
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
