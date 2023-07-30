import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface decisionState {
    isAccept: boolean
    isReject: boolean
}

const initialState: decisionState = {
	isAccept: false,
	isReject: false,
};

export const decisionSlice = createSlice({
	name: "decisionSlice",
	initialState,
	reducers: {
		gotAccept: (state) => {
			state.isAccept = true;
		},
        gotReject: (state) => {
			state.isReject = true;
		},
        resetDecision: (state) => {
            state.isAccept = false
            state.isReject = false
        },
	},
	extraReducers: {},
});

export const didAccept = (state: RootState) => state.decisions.isAccept
export const didReject = (state: RootState) => state.decisions.isReject
export const {gotAccept, gotReject, resetDecision} = decisionSlice.actions
export default decisionSlice.reducer