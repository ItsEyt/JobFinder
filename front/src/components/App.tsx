import "../styles/App.css";
import Main from "./Main";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Navbar from "./Navbar";
import { useState } from "react";
import jwt_decode, { JwtPayload } from "jwt-decode";
import Register from "./Register";
import Profile from "./Profile";
function App() {
    
    const [hiddenMenu, setHiddenMenu] = useState(true)
    
	const [isLogged, setIsLogged] = useState<boolean>(
		localStorage.getItem("accessToken") &&
			jwt_decode<JwtPayload>(localStorage.getItem("accessToken")!)?.exp! *
				1000 -
				Date.now() >
				0
			? true
			: false
	);

	return (
		<>
			<Navbar hiddenMenu={hiddenMenu} setHiddenMenu={setHiddenMenu}/>
			<Routes>
				<Route path="/" element={<Main />} />
				<Route
					path="/login"
					element={
						<Login isLogged={isLogged} setIsLogged={setIsLogged} />
					}
				/>
                <Route path="/register" element={<Register/>} />
                <Route path="/profile/:id" element={<Profile/>} />
			</Routes>
		</>
	);
}

export default App;
