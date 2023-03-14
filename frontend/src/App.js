import "./App.css";
import "./util.css";
import LogIn from "./components/LogIn/LogIn";
import SignUp from "./components/SignUp/SignUp";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ProtectedRouteAddProduct from "./components/ProtectedRoute/ProtectedRouteAddProduct";
import ProtectedRouteCreateUser from "./components/ProtectedRoute/ProtectedRouteCreateUser";
import ProtectedRouteDashboard from "./components/ProtectedRoute/ProtectedRouteDashboard";
import ProtectedRouteMainFeed from "./components/ProtectedRoute/ProtectedRouteMainFeed";

import { MDBFooter } from "mdb-react-ui-kit";
import { VscGithub } from "react-icons/vsc";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/user/login" />} />
          <Route path="/user/login" element={<LogIn />} />
          <Route path="/user/main_feed" element={<ProtectedRouteMainFeed />} />
          <Route path="/user/signup" element={<SignUp />} />
          <Route path="/user/create" element={<ProtectedRouteCreateUser />} />
          <Route path="/product/add" element={<ProtectedRouteAddProduct />} />
          <Route path="/user/dashboard" element={<ProtectedRouteDashboard />} />
        </Routes>
      </Router>

      <MDBFooter bgColor="white" className="text-center text-lg-left p-t-50">
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          &copy; {new Date().getFullYear()} Copyright:{" "}
          <h6>Nhut Do, Duong Vo, Lam Nguyen, Loc Tran</h6>
          <h7>Find our code on Github! </h7>
          <a
            href="https://github.com/dominhnhut01/revolutionuc2023"
            target="_blank"
          >
            <VscGithub size={30} />
          </a>
        </div>
      </MDBFooter>
    </div>
  );
}

export default App;
