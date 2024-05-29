import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    placeId: "512088e244aae662405903907f0b57ef40c0f00101f901f5bc570000000000c00208"
};

const areaSlice = createSlice({
    initialState,
    name: "area",
    reducers: {
        setArea: (state, action) => {
            return action.payload;
        }
    }

})

export const { setArea } = areaSlice.actions;
export default areaSlice.reducer;


