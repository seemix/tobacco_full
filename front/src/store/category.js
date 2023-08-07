import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { categoryService } from '../services/category.service';

export const getAllCategories = createAsyncThunk(
    'categorySlice/GetAll',
    async (_, thunkAPI) => {
        try {
            return await categoryService.getAll;
        } catch (e) {
            thunkAPI.rejectWithValue(e);
        }
    }
);

export const getCategoryById = createAsyncThunk(
    'categorySlice/GetById',
    async (id, thunkAPI) => {
        try {
            return await categoryService.getById(id);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);
export const createCategory = createAsyncThunk(
    'categorySlice/Create',
    async (data, thunkAPI) => {
        try {
            return await categoryService.createCategory(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const updateCategory = createAsyncThunk(
    'categorySlice/Update',
    async (data, thunkAPI) => {
        try {
            return await categoryService.updateCategory(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const saveCategoriesOrder = createAsyncThunk(
    'categorySlice/SaveOrder',
    async (data, thunkAPI) => {
        try {
            return categoryService.saveOrder(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const deleteImage = createAsyncThunk(
    'categorySlice/DeleteImage',
    async (fileName, thunkAPI) => {
        try {
            return categoryService.deleteImage(fileName);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);
export const deleteCategory = createAsyncThunk(
    'categorySlice/DeleteCategory',
    async (id, thunkAPI) => {
        try {
            return categoryService.deleteCategory(id);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const categorySlice = createSlice({
    name: 'categorySlice',
    initialState: {
        status: null,
        error: null,
        categoryForUpdate: null,
        categories: [],
        showReorderButton: false,
        currentCategory: null,
        categoryForDelete: null,
        categoryEditModal: false
    },
    reducers: {
        categoriesReorder(state, action) {
            state.categories = action.payload;
            state.showReorderButton = true;
            return state;
        },
        setCategoryForUpdate(state, action) {
            state.categoryForUpdate = action.payload;
        },
        setCategoryForDelete(state, action) {
            state.categoryForDelete = action.payload;
        },
        showCategoryEdit(state) {
            state.error = null;
            state.status = '';
            state.categoryEditModal = true;
        },
        hideCategoryEdit(state) {
            state.categoryEditModal = false;

        }
    },
    extraReducers: builder => {
        builder
            .addCase(getAllCategories.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                state.categories = action.payload;
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload;
            })
            .addCase(createCategory.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                state.categories.push(action.payload);
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload.response.data.message;
            })
            .addCase(saveCategoriesOrder.fulfilled, state => {
                state.showReorderButton = false;
            })
            .addCase(deleteImage.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteImage.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                state.categories.forEach(obj => {
                    if (obj.picture === action.payload) {
                        obj.picture = null
                    }
                });
                state.categoryForUpdate = null;
            })
            .addCase(deleteImage.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload.response.data.message;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                state.categories.forEach(obj => {
                    if (obj._id === action.payload._id) {
                        obj.name = action.payload.name;
                        obj.picture = action.payload.picture;
                    }
                });
                state.categoryForUpdate = null;
                state.categoryEditModal = false;
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload.response.data.message;
            })
            .addCase(getCategoryById.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                state.currentCategory = action.payload;
            })
            .addCase(deleteCategory.fulfilled, state => {
                state.categories = state.categories.filter(obj => obj._id !== state.categoryForDelete._id);
            })
    }
});

export const { setCategoryForUpdate, showCategoryEdit, hideCategoryEdit, categoriesReorder, setCategoryForDelete } = categorySlice.actions;
const categoryStore = categorySlice.reducer;
export default categoryStore;