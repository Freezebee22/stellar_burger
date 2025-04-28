import { getIngredientsApi } from "@api";
import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit";
import { TIngredient } from "@utils-types";

type TIngredientsState = {
    isLoading: boolean;
    error: null | SerializedError;
    data: TIngredient[];
};

export const initialState: TIngredientsState = {
    isLoading: true,
    error: null,
    data: []
  };

export const fetchIngredients = createAsyncThunk(
    'fetch/ingredients',
    async () => await getIngredientsApi() 
);

const slice = createSlice({
    name: 'ingridients',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchIngredients.pending, (state) => {
            state.isLoading = true;
            state.error = null;
            console.log('pending');
        })
        .addCase(fetchIngredients.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.data = action.payload;
            console.log('fulfilled');
        })
        .addCase(fetchIngredients.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
            console.log('rejected');
        });
    }
});

export const reducer = slice.reducer;