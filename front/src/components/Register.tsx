import axios from "axios";
import React, { useState } from "react";
import "../styles/register.css";

const Register = () => {
	const [username, setUsername] = useState("");
	const [pass, setPass] = useState("");
	const [email, setEmail] = useState("");
	const [isCompany, setIsCompany] = useState(false);
    const [isValid, setIsValid] = useState(false);

	const isEmail = (email: string) =>
		/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

    const handleValidEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        isEmail(e.target.value) ? setIsValid(true) : setIsValid(false)
    }

	const handleRegister = async (e: React.MouseEvent) => {
		e.preventDefault();
		await axios
			.post("http://127.0.0.1:8000/register/", {
				username,
				pass,
				email,
				isCompany,
			})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	return (
		<div className="register-container">
			<form className="register-form">
				<h1>REGISTER</h1>
				<input
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="Username"
				/>
				<input
					value={pass}
					onChange={(e) => setPass(e.target.value)}
					type={"password"}
					placeholder="Password"
				/>
				<input
					value={email}
					onChange={(e) => handleValidEmail(e)}
					type={"email"}
					placeholder="email"
				/>
				<input type={""} placeholder="confirm email" />
				<label className="checkbox-container">
					Are you recruiting?
					<input
						checked={isCompany}
						onChange={() => setIsCompany((prev) => !prev)}
						className="checkbox"
						type={"checkbox"}
						placeholder="confirm email"
					/>
					<span className="custom-checkbox"></span>
				</label>
				<button disabled={isValid ? false : true} className="btn" onClick={(e) => handleRegister(e)}>
					Submit
				</button>
			</form>
		</div>
	);
};

export default Register;
