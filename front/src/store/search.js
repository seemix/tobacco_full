import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { searchService } from '../services/search.service';

export const search = createAsyncThunk(
    'searchSlice/SearchAdmin',
    async (searchQuery, thunkAPI) => {
        try {
            return searchService.search(searchQuery);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const searchSlice = createSlice({
    name: 'searchSlice',
    initialState: {
        status: null,
        error: null,
        results: []
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(search.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.results = action.payload;
            })
    }
});

const searchStore = searchSlice.reducer;
export default searchStore;