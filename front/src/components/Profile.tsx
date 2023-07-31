import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SERVER_URL } from "../../apps/helper";
import { useAppSelector } from "../../apps/hooks";
import { user_id } from "../features/UserManagementSlice";

type Human = {
	_id: number;
	first_name: string;
	last_name: string;
	image: string;
	skills: { skills: string[] };
	is_active: boolean;
	user: number;
	connections: [];
};

const Profile = () => {
	interface JwtPayload {
		user_id: number | null;
	}

	const { id } = useParams();
	const userid = useAppSelector(user_id);
	const [profileInfo, setProfileInfo] = useState<Human>();

	useEffect(() => {
		const fetchProfile = async () => {
			let result = await axios(`${SERVER_URL}/getHuman/${id}`).then(
				(res) => setProfileInfo(res.data)
			);
		};
		fetchProfile();
	}, []);

	return (
		<div className="card-container">
			{profileInfo && (
				<div className="profile">
					<img src={`${SERVER_URL}${profileInfo.image}`} />
					<div className="profile-name-container">
						<h2>
							{profileInfo.first_name} {profileInfo.last_name}
						</h2>
						{userid && id == userid.toString() && (
							<button className="btn">Edit Profile</button>
						)}
					</div>
					<p className="skills">
						{profileInfo.skills.skills.map((skill, idx) => (
							<span key={skill}>
								<span>{skill}</span>
								<span>
									{idx <
										profileInfo.skills.skills.length - 1 &&
										" • "}
								</span>
							</span>
						))}
					</p>
				</div>
			)}
		</div>
	);
};

export default Profile;
