import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
	const navigate = useNavigate();

	return (
		<div className="sidebar">
			<div className="profile-info-side">
                <span>your name</span>
				<img
					className="profile-img-side"
					onClick={() => navigate("/profile")}
					src="https://picsum.photos/250/250"
					alt="..."
				/>
			</div>
		</div>
	);
};

export default Sidebar;
