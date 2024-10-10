import {GeoPoint, Model} from "../../api/references/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
export interface ReferencesState {
    //model//
    modelContent: {
        content: Model[];
        isLoading: boolean;
        error: string;
    };

    //geopoint//
    geoPointContent: {
        content: GeoPoint[];
        isLoading: boolean;
        error: string;
    };
}

const initialState: ReferencesState ={
    //model//
    modelContent:{
        content: [],
        isLoading: false,
        error: ""
    },

    //geoPoint//
    geoPointContent: {
        content: [],
        isLoading: false,
        error: ""
    }
}
export const referencesReducer = createSlice({
    name: "references",
    initialState,
    reducers: {
        //--model--//
        fetchModelStart: (state: ReferencesState) => {
            state.modelContent.isLoading = true;
            state.modelContent.error ="";
        },
        fetchModelSuccess: (state: ReferencesState, action: PayloadAction<Model[]>) => {
            state.modelContent.content=action.payload;
            state.modelContent.isLoading=false;
            state.modelContent.error="";
        },
        fetchModelError:(state: ReferencesState, action: PayloadAction<string>) => {
            state.modelContent.isLoading=false;
            state.modelContent.error=action.payload
        },
        //--geoPoint--//
        fetchGeoPointStart: (state: ReferencesState)=>{
            state.geoPointContent.isLoading = true;
            state.geoPointContent.error = "";
        },
        fetchGeoPointSuccess: (state: ReferencesState, action: PayloadAction<GeoPoint[]>)=> {
            state.geoPointContent.content = action.payload;
            state.geoPointContent.isLoading = false;
            state.geoPointContent.error = "";
        },
        fetchGeoPointError: (state: ReferencesState, action: PayloadAction<string>)=>{
            state.geoPointContent.isLoading=false;
            state.geoPointContent.error = action.payload;
        }
    }
})

export const {
    fetchModelStart, fetchModelSuccess, fetchModelError,
    fetchGeoPointStart, fetchGeoPointSuccess, fetchGeoPointError
} = referencesReducer.actions;

export const getModelData = ()=> (state: RootState) => state.references.modelContent;
export const getGeoPointData = ()=> (state: RootState) => state.references.geoPointContent;

export default referencesReducer.reducer;