import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import referencesReducer from "./references/referencesReducer";
export const store = configureStore({
    reducer: {
        references: referencesReducer
    },devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;