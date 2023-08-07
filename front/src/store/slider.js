import { sliderService } from '../services/slider.service';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getAllSlides = createAsyncThunk(
    'sliderStore/GetAllSlides',
    async (_, thunkAPI) => {
        try {
            return await sliderService.getAllSlides();
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const createSlide = createAsyncThunk(
    'sliderStore/CreateSlide',
    async (data, thunkAPI) => {
        try {
            return await sliderService.createSlide(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const saveSlidesOrder = createAsyncThunk(
    'sliderStore/SaveSlidesOrder',
    async (data, thunkAPI) => {
        try {
            return await sliderService.saveOrder(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const deleteSlide = createAsyncThunk(
    'sliderStore/DeleteSlide',
    async (_id, thunkAPI) => {
        try {
            return await sliderService.deleteSlide(_id);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const updateSlide = createAsyncThunk(
    'sliderStore/UpdateSlide',
    async (data, thunkAPI) => {
        try {
            return await sliderService.updateSlide(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const sliderSlice = createSlice({
    name: 'sliderSlice',
    initialState: {
        status: null,
        error: null,
        saveOrderButton: false,
        slideEditModal: false,
        slideDeleteModal: false,
        slideForUpdate: null,
        slideForDelete: null,
        slides: []
    },
    reducers: {
        sliderReorder(state, action) {
            state.slides = action.payload;
            state.saveOrderButton = true;
            return state;
        },
        openSlideEdit(state) {
            state.slideEditModal = true;
        },
        openSlideDelete(state) {
            state.slideDeleteModal = true;
        },
        closeSlideDelete(state) {
            state.slideDeleteModal = false;
        },
        closeSlideEdit(state) {
            state.error = null;
            state.slideForUpdate = null;
            state.slideEditModal = false;
        },
        setSlideForUpdate(state, action) {
            state.slideForUpdate = action.payload;
        },
        setSlideForDelete(state, action) {
            state.slideForDelete = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getAllSlides.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                state.slides = action.payload;
            })
            .addCase(saveSlidesOrder.fulfilled, state => {
                state.saveOrderButton = false;
            })
            .addCase(deleteSlide.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                state.slides = state.slides.filter(obj => obj._id !== action.payload);
                state.slideForDelete = null;
            })
            .addCase(createSlide.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                state.slides.push(action.payload);
                state.slideEditModal = false;
            })
            .addCase(createSlide.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload.response.data.message;
            })
            .addCase(updateSlide.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                state.slides.forEach(obj => {
                    if (obj._id === action.payload._id) {
                        obj.text = action.payload.text;
                        obj.slide = action.payload.slide;
                    }
                });
                state.slideForUpdate = null;
                state.slideEditModal = false;
            })
            .addCase(updateSlide.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload.response.data.message;
            })
    }
});
export const {
    sliderReorder,
    setSlideForDelete,
    openSlideEdit,
    setSlideForUpdate,
    closeSlideEdit,
    closeSlideDelete,
    openSlideDelete
} = sliderSlice.actions;
const sliderStore = sliderSlice.reducer;
export default sliderStore;
