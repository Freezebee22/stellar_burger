import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TOrder } from "@utils-types";


export const fetchOrders = createAsyncThunk(
    'fetch/orders',
    async () => getOrdersApi() 
);

type TNewOrder = {
    order: TOrder;
    name: string;
};

export const createOrder = createAsyncThunk<TNewOrder, string[]>(
    'create/order',
    async (data, { rejectWithValue }) => {
        const response = await orderBurgerApi(data);
        if (!response?.success) {
            return rejectWithValue(response);
        }
        return {
            order: response.order,
            name: response.name
        }
    }
);

export const fetchOrder = createAsyncThunk(
    'fetch/order',
    async (number: number) => getOrderByNumberApi(number)
);