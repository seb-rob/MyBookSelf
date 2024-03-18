import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name: "theme",
    initialState: {
        isLight: false
    },
    reducers: {
        changeTheme: (state) => {
            state.isLight = !state.isLight
        }
    }
})

// Action creators are generated for each case reducer function
export const { changeTheme } = themeSlice.actions

export default themeSlice.reducer