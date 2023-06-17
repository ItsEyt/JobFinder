import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";

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
	const [profileInfo, setProfileInfo] = useState<Human>();
	const jwt_id: number | null = localStorage.getItem("accessToken") !== null ? jwt_decode<JwtPayload>(
		localStorage.getItem("accessToken")!
	)?.user_id : 0;

    useEffect(()=>{
		const fetchProfile = async () => {
			let result = await axios(
				`http://127.0.0.1:8000/getHuman/${id}`
			).then((res) => setProfileInfo(res.data));
		};
		fetchProfile();
	}, []);

	return (
		<div className="card-container">
			{profileInfo && (
				<div className="profile">
					<img src={`http://127.0.0.1:8000${profileInfo.image}`} />
					<h2>
						{profileInfo.first_name} {profileInfo.last_name}
					</h2>
					{jwt_id === 1 && (
						<button className="btn">Edit Profile</button>
					)}
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
