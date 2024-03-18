import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "user",
    initialState: {
        first_name: "",
        token: "",
        email: "",
        error: false,
        errorMessage: "",
        loading: false,
        trigger: false
    },
    reducers: {
        setUserStates: (state, action) => {
            return { ...state, ...action.payload };
        },
    }
})


// Action creators are generated for each case reducer function
export const { setUserStates } = userSlice.actions

export default userSlice.reducer
