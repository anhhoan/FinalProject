import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: null,
	token: null,
	loading: false,
	error: null
};

const getUserSlice = createSlice({
	name: 'getUser',
	initialState,
	reducers: {
		getUserStart(state) {
			state.loading = true;
			state.error = null;
		},
		getUserSuccess(state, action) {
			state.loading = false;
			state.user = action.payload.user;
		},
		getUserFailure(state, action) {
			state.loading = false;
			state.error = action.payload;
		},
	
	}
});

export const { getUserStart, getUserSuccess, getUserFailure } = getUserSlice.actions;
export default getUser.reducer;
