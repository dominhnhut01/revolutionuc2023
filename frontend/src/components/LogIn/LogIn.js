import "./LogIn.css";
// import '../../util.css';
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { logInWithEmailAndPassword } from "../../user_auth/firebase";
import axios from "axios";

function LogIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {

  // }, [user]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    logInWithEmailAndPassword(email, password).then((user) => {
      axios
        .get("https://my-kalory-api.site/user/info/", {
          params: { uid: user.uid },
        })
        .then((response) => {
          if (response.status === 200) navigate("/user/main_feed");
          else if (response.status === 204) navigate("/user/create");
          else console.log("Error");
        });
    });
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
          <form
            className="login100-form validate-form flex-sb flex-w"
            onSubmit={handleSubmit}
          >
            <span className="login100-form-title p-b-32">Sign In</span>
            <div className="p-t-10 p-b-9">
              <span className="txt1">Email</span>
            </div>
            <div
              className="wrap-input100 validate-input"
              data-validate="Email is required"
            >
              <input
                className="input100"
                type="text"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="focus-input100"></span>
            </div>

            <div className="p-t-13 p-b-9">
              <span className="txt1">Password</span>
            </div>
            <div
              className="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <input
                className="input100"
                type="password"
                name="pass"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="focus-input100"></span>
            </div>

            <div className="container-login100-form-btn p-b-32 w-100 d-flex justify-content-center">
              <button className="login100-form-btn w-25 m-t-25" type="submit">
                Sign In
              </button>
            </div>

            <div className="w-full text-center p-t-55">
              <span className="txt3">Not a member?</span>

              <Link to="/user/signup" className="txt2 p-l-10">
                Sign up now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
