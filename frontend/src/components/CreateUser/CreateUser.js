import './CreateUser.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {auth} from "../../user_auth/firebase"
import { useAuthState } from "react-firebase-hooks/auth";

import axios from 'axios'

function CreateUser() {
	const [user, loading, error] = useAuthState(auth);

	const [name, setName] = useState("");
	const [height, setHeight] = useState("");
	const [weight, setWeight] = useState("");
	const [age, setAge] = useState("");
	const [bmi, setBMI] = useState("");
	const navigate = useNavigate();

	console.log(user);
	// Height setter
	function handleAgeChange(event) {
		setAge(event.target.value);
	}

	function handleHeightChange(event) {
		setHeight(event.target.value);
	}

	// Weight setter
	function handleWeightChange(event) {
		setWeight(event.target.value);
	}

	function handleNameChange(event) {
		setName(event.target.value);
	}

	function handleBMIChange(event) {
		setBMI(event.target.value);
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		try {
			axios({
				method: 'post',
				url: 'https://my-kalory-api.site/user/create',
				data: {
					uid: user.uid,
					email: user.email,
					name: name,
					age: age,
					height: height,
					weight: weight,
				}
			})
			.then(function (response) {
				console.log("Response from login");
				console.log(response);
				navigate("/user/main_feed");
			})
		} catch (error) {
			console.log(error.message);
		}
	}

	// Autofill BMI
	useEffect(() => {
		if (height && weight) {
		  const heightInM = height / 100;
		  const bmi = weight / (heightInM * heightInM);
		  setBMI(bmi.toFixed(2));
		} else {
		  setBMI("");
		}
	}, [height, weight]);

    return (
        <div className="limiter">
		<div className="container-login100">
			<div className="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
				<form className="login100-form validate-form flex-sb flex-w" onSubmit={handleSubmit}>
					<span className="login100-form-title p-b-32">
						Physical Index Form
					</span>

					<div className="p-t-10 p-b-9">
						<span className="txt1">
							Name
						</span>
					</div>
					<div className="wrap-input100 validate-input" data-validate = "Name is required">
						<input className="input100" type="text" name="name" onChange={handleNameChange}/>
						<span className="focus-input100"></span>
					</div>

					<div className="p-t-10 p-b-9">
						<span className="txt1">
							Age
						</span>
					</div>
					<div className="wrap-input100 validate-input" data-validate = "Age is required">
						<input className="input100" type="number" step="0.01" name="age" id="age" value={age} onChange={handleAgeChange}/>
						<span className="focus-input100"></span>
					</div>

					<div className="p-t-10 p-b-9">
						<span className="txt1">
							Weight (kg)
						</span>
					</div>
					<div className="wrap-input100 validate-input" data-validate = "Weight is required">
						<input className="input100" type="number" step="0.01" name="weight" id="weight" value={weight} onChange={handleWeightChange}/>
						<span className="focus-input100"></span>
					</div>

					<div className="p-t-10 p-b-9">
						<span className="txt1">
							Height (cm)
						</span>
					</div>
					<div className="wrap-input100 validate-input" data-validate = "Height is required">
						<input className="input100" type="number" step="0.01" name="height" id="height" value={height} onChange={handleHeightChange}/>
						<span className="focus-input100"></span>
					</div>

					<div className="p-t-10 p-b-9">
						<span className="txt1">
							BMI
						</span>
					</div>
					<div className="wrap-input100 validate-input" data-validate = "BMI is required">
						<input className="input100" type="number" step="0.01" name="bmi" id="bmi" value={bmi} onChange={handleBMIChange}/>
						<span className="focus-input100"></span>
					</div>

					<div className="container-login100-form-btn p-b-32 p-t-25 w-100 d-flex justify-content-center">
						<button className="login100-form-btn" type="submit">
							Submit
						</button>
					</div>
					<div className="w-full text-center p-t-55">
					</div>
				</form>
			</div>
		</div>
		</div>
	);
}

export default CreateUser;