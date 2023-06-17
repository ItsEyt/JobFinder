import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
	const navigate = useNavigate();

	return (
		<div>
			<img
				onClick={() => navigate("/profile")}
				src="https://picsum.photos/200/301"
				alt="..."
			/>
		</div>
	);
};

export default Sidebar;
