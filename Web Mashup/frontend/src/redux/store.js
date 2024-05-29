// import { createContext } from "react";
import { configureStore } from "@reduxjs/toolkit"
import area from "./features/area"
import { apiSlice } from "./Apis/apiSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        area: area
    },
    middleware: (GetDefaultMiddleware) => {
        return (
            GetDefaultMiddleware().concat(apiSlice.middleware));
    },
    devTools: true,
})
// setupListeners(store.dispatch);
