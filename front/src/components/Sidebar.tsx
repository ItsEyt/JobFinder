import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../apps/hooks";
import { user_id } from "../features/UserManagementSlice";

const Sidebar = () => {
	const navigate = useNavigate();
	const userid = useAppSelector(user_id);

	return (
		<div className="sidebar">
			<div
				className="profile-info-side"
				onClick={() => navigate(`/profile/${userid}`)}
			>
				<span>your name</span>
				<img
					className="profile-img-side"
					src="https://picsum.photos/250/250"
					alt="..."
				/>
			</div>
		</div>
	);
};

export default Sidebar;
