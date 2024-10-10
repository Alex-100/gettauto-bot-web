import { axiosInstance } from "../instance";
import {GeoPoint, Model} from "./types";
import Endpoints from "../endpoints";
import { AxiosPromise } from "axios";

export const getModelData = (): AxiosPromise<Model[]> =>
    axiosInstance.get(Endpoints.REFERENCES.MODEL);

export const getGeoPointData = (): AxiosPromise<GeoPoint[]> =>
    axiosInstance.get(Endpoints.REFERENCES.GEOPOINT);