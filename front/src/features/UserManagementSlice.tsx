import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { RootState } from "../../store";
import { SERVER_URL } from "../../apps/helper";
import axios from "axios";

interface JwtPayload {
	username: string | null;
	user_id: number | null;
	exp: number | null;
}

interface loginData {
	username: string;
	password: string;
}

const loginUser = createAsyncThunk(
	"userManagement/loginUser",
	async (loginInfo: loginData) => {
		const { username, password } = loginInfo;
		const response = await axios.post(`${SERVER_URL}/login/`, {
			username,
			password,
		});
		localStorage.setItem("accessToken", response.data.access);
		return response.data.access;
	}
);

const initialState = {
	username: localStorage.getItem("accessToken")
		? jwt_decode<JwtPayload>(localStorage.getItem("accessToken")!).username
		: "",
	user_id: localStorage.getItem("accessToken")
		? jwt_decode<JwtPayload>(localStorage.getItem("accessToken")!).user_id
		: 0,
	isLogged:
		localStorage.getItem("accessToken") &&
		jwt_decode<JwtPayload>(localStorage.getItem("accessToken")!)?.exp! * 1000 - Date.now() > 0 ? true : false,
};

export const UserManagementSlice = createSlice({
	name: "userManagement",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(loginUser.fulfilled, (state, action) => {
			state.username = jwt_decode<JwtPayload>(action.payload).username;
			state.user_id = jwt_decode<JwtPayload>(action.payload).user_id;
			state.isLogged = true;
		}),
			builder.addCase(loginUser.rejected, (state, action) => {
				state.username = "";
				state.user_id = 0;
				state.isLogged = false;
			});
	},
});

export { loginUser };
export const username = (state: RootState) => state.userManagement.username;
export const user_id = (state: RootState) => state.userManagement.user_id;
export const isLogged = (state: RootState) => state.userManagement.isLogged;
export default UserManagementSlice.reducer;
