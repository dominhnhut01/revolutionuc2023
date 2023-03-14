import './SignUp.css';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { registerWithEmailAndPassword } from "../../user_auth/firebase";

function SignUp() {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	// const [user, loading, error] = useAuthState(auth);


	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("register");
		registerWithEmailAndPassword(email, password)
		.then((user) => {
			console.log(user);
			if (user)	navigate("/user/create");
		})
	}

    return (
        <div className="limiter">
		<div className="container-login100">
			<div className="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
				<form className="login100-form validate-form flex-sb flex-w" onSubmit={handleSubmit}>
					<span className="login100-form-title p-b-32">
						Sign Up
					</span>

					<div className="p-t-10 p-b-9">
						<span className="txt1">
							Email
						</span>
					</div>
					<div className="wrap-input100 validate-input" data-validate = "Email is required">
						<input className="input100" type="text" name="email" onChange={(e) => setEmail(e.target.value)} />
						<span className="focus-input100"></span>
					</div>
					
					<div className="p-t-13 p-b-9">
						<span className="txt1">
							Password
						</span>
					</div>
					<div className="wrap-input100 validate-input" data-validate = "Password is required">
						<input className="input100" type="password" name="pass" onChange={(e) => setPassword(e.target.value)} />
						<span className="focus-input100"></span>
					</div>

					<div className="container-login100-form-btn p-b-32 w-100 d-flex justify-content-center">
						<button className="login100-form-btn w-25 m-t-25">
							Sign Up
						</button>
					</div>

					<div className="w-full text-center p-t-55">
						<Link to = "/user/login" className="txt2 p-l-10">
							Back to Login
						</Link>
					</div>
				</form>
			</div>
		</div>
	</div>
    );
}

export default SignUp;