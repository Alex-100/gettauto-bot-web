import axios from "axios";
import Endpoints from "../endpoints";
import {CarEntryDTO} from "./types";



export const addRequest = async (carEntryDTO: CarEntryDTO, userId: number): Promise<any> => {

    try {
        const response = await axios.post(`${Endpoints.BOT.CONTROLLER.ADD}?userID=${userId}`, carEntryDTO);
        console.log('Request added successfully:', response.data);
        return response.data; // Возвращаем данные ответа
    } catch (error) {
        console.error('Error adding request:', error);
        throw error; // Пробрасываем ошибку для обработки вызывающим кодом
    }
};

export const countRequest = async (carEntryDTO: CarEntryDTO, userId: number): Promise<any> => {

    try {
        const response = await axios.post(`${Endpoints.BOT.CONTROLLER.COUNT}?userID=${userId}`, carEntryDTO);
        console.log('Request added successfully:', response.data);
        return response.data; // Возвращаем данные ответа
    } catch (error) {
        console.error('Error adding request:', error);
        throw error; // Пробрасываем ошибку для обработки вызывающим кодом
    }
};


export const getRequest = async (code: string, userId: number): Promise<any> => {
    try {
        const response = await axios.get(`${Endpoints.BOT.CONTROLLER.GET}?userID=${userId}&code=${code}`);
        console.log('Request added successfully:', response.data);
        return response.data; // Возвращаем данные ответа
    } catch (error) {
        console.error('Error adding request:', error);
        throw error; // Пробрасываем ошибку для обработки вызывающим кодом
    }
};