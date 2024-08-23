import './App.css'
import {Outlet, Route, Routes} from "react-router";
import {Header} from "./components/Header/Header";
import {Spinner} from "./components/Spinner/Spinner";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      // <Provider store={store}>
        <Routes>
            <Route path="/" element={<Layout></Layout>}>
                <Route path="/items" element={<Spinner/>}/>
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
        </div>
    )
}
