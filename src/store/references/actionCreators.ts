import {RootState} from "../index";
import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import {fetchGeoPointStart, fetchGeoPointSuccess, fetchModelStart, fetchModelSuccess} from "./referencesReducer";
import api from "../../api";

export const fetchModels =(): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
    async (dispatch) => {
    try {
        dispatch(fetchModelStart());
        const response = await api.references.getModelData();
        dispatch(fetchModelSuccess(response.data))
    }catch (e: any){
        console.log(e)
    }
    }

export const fetchGeoPoints =(): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
    async (dispatch) => {
        try {
            dispatch(fetchGeoPointStart());
            const response = await api.references.getGeoPointData();
            dispatch(fetchGeoPointSuccess(response.data))
        }catch (e: any){
            console.log(e)
        }
    }