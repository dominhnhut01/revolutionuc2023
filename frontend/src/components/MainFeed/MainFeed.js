import "./MainFeed.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../user_auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function MainFeed() {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  console.log(user);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 dashboard-column">
          <img
            src={require("../../dashboard.png")}
            alt="Logo"
            className="dashboard-img mx-auto d-block"
          />
          <div className="text-center">
            <span className="feed-title"> Track What You Eat </span>
          </div>
          <div className="text-center mt-3">
            <button
              className="btn btn-success"
              onClick={() => navigate("/user/dashboard")}
            >
              Dashboard
            </button>
          </div>
        </div>
        <div className="col-md-6 camera-column">
          <img
            src={require("../../calorie.png")}
            alt="Logo"
            className="dashboard-img mx-auto d-block"
          />
          <div className="text-center">
            <span className="feed-title"> Capture What You Eat </span>
          </div>
          <div className="text-center mt-3">
            <button
              className="btn btn-success"
              onClick={() => navigate("/product/add")}
            >
              Capture
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainFeed;
