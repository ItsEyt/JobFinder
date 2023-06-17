import "../styles/login.css"
import { useState } from "react";
import axios from "axios";
const Login = (props: {isLogged: boolean, setIsLogged: React.Dispatch<React.SetStateAction<boolean>>}) => {
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
    

	const tryLogin = async () => {
		await axios
			.post("http://127.0.0.1:8000/login/", {
				username,
				password,
			})
			.then((response) => {
				localStorage.setItem("accessToken", response.data.access);
				props.setIsLogged(true);
			})
			.catch((err) => console.log(err));
	};

	let LoginForm = (
		<div className="log-wrap">
			<div className="login">
				<h1>SIGN IN</h1>
				<input
                    className="login-input"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
                    className="login-input"
					placeholder="Password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button className="btn" onClick={() => tryLogin()}>
					Login
				</button>
				<a href="https://www.google.com">
					don't have an account? sign in!
				</a>
			</div>
		</div>
	);

	return <>{props.isLogged ? <h1>logged</h1> : LoginForm};</>
};

export default Login;


