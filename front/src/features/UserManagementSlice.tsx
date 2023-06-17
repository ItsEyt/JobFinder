import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

interface JwtPayload {
	username: string | null;
	user_id: number | null;
}

interface state {
	userManagement: {
		username: string;
		user_id: number;
	};
}

const initialState = {
	username: localStorage.getItem("accessToken")
		? jwt_decode<JwtPayload>(localStorage.getItem("accessToken")!).username
		: "",
	user_id: localStorage.getItem("accessToken")
		? jwt_decode<JwtPayload>(localStorage.getItem("accessToken")!).user_id
		: 0,
	isLogged: false,
};

export const UserManagementSlice = createSlice({
	name: "userManagement",
	initialState,
	reducers: {},
	extraReducers: {},
});

export {};
export const username = (state: state) => state.userManagement.username;
export const user_id = (state: state) => state.userManagement.user_id;
export default UserManagementSlice.reducer