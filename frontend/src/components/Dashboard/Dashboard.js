import "./Dashboard.css";
// import "../../util.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { auth, logout } from "../../user_auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  console.log(user);
  const navigate = useNavigate();
  const [info, setInfo] = useState([]);
  useEffect(() => {
    try {
      axios
        .get("https://my-kalory-api.site/user/info/", { params: { uid: user.uid } })
        .then((response) => {
          if (response.status === 200) {
            setInfo(response.data);
            console.log(response.data[0]["calories"]);
          }
        });
    } catch {}
  });

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 text-center">
          <h2>Let's see how you eat today!</h2>
        </div>
      </div>
      <br />
      <br />
      <div className="container-fluid d-flex justify-content-center">
        {info.length === 0 ? (
          <div className="row">
            <div className="col-12"></div>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-6">
              <div className="calorie-circle p-5 text-center">
                <h3 className="mb-4">Total Calories</h3>
                <span className="calorie-content">
                  {info.reduce((accumulate, currentVal) => {
                    return accumulate + currentVal["calories"];
                  }, 0)}
                </span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row">
                {info.map((i) => (
                  <div className="col-12 mb-4">
                    <div className="nutrition-card p-3">
                      <div className="row">
                        <div className="col-6">
                          <div className="row">
                            <div className="col-12">
                              <span className="first-child">
                                <b>Cal</b>
                              </span>
                            </div>
                            <div className="col-12">
                              <span className="second-child">
                                {i["calories"]}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-12">
                              <span>
                                <b>Protein</b>
                              </span>
                            </div>
                            <div className="col-12">
                              <span>{i["protein"]}</span>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12">
                              <span>
                                <b>Fat</b>
                              </span>
                            </div>
                            <div className="col-12">
                              <span>{i["fat"]}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
      </div>
      <br />
      <br />
      <div className="row">
        <div className="col-12 text-center">
          <button
            type="button"
            className="btn btn-primary mr-5"
            onClick={(e) => {
              e.preventDefault();
              navigate("/user/main_feed");
            }}
          >
            Go back to main feed
          </button>
        </div>
      </div>
      <br />
      <br />
      <div className="row">
        <div className="col-12 text-center">
          <button
            type="button"
            className="btn btn-warning mr-5"
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
