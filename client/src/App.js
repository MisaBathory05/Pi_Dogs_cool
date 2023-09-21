import './App.css';
import {Routes, Route, useLocation} from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import Form from "./components/Form/Form";
import LandingPage from "./components/Landing/Landing";
import PathRoutes from './components/helpers';

function App() {
  const location = useLocation();
  const noNavRoutes = ["/"];
  const hideNav = noNavRoutes.includes(location.pathname);

  return (
    <div className="App">
      {!hideNav && <Nav />}
      <Routes>
        <Route path= {PathRoutes.LANDING} element={<LandingPage />} />
        <Route path= {PathRoutes.HOME} element={<Home />} />
        <Route path= {PathRoutes.DOGDETAIL} element={<Detail />} />
        <Route path= {PathRoutes.DOGCREATE} element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
