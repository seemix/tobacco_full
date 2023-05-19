import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { productService } from '../services/pruduct.service';

export const getProductsByCategory = createAsyncThunk(
    'productSlice/GetByCategory',
    async (params, thunkAPI) => {
        try {
            return productService.getByCategory(params);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const getProductById = createAsyncThunk(
    'productSlice/GetById',
    async (id, thunkAPI) => {
        try {
            return productService.getById(id);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);
export const getNewProducts = createAsyncThunk(
    'productSlice/GetNewProducts',
    async (_, thunkAPI) => {
        try {
            return productService.getNewProducts();
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);
export const createProduct = createAsyncThunk(
    'productSlice/CreateProduct',
    async (data, thunkAPI) => {
        try {
            return productService.createProduct(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const deleteImage = createAsyncThunk(
    'productSlice/DeleteProductImage',
    async (fileName, thunkAPI) => {
        try {
            return await productService.deleteImage(fileName);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const updateProduct = createAsyncThunk(
    'productSlice/UpdateProduct',
    async (data, thunkAPI) => {
        try {
            return await productService.updateProduct(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'productSlice/DeleteProduct',
    async (data, thunkAPI) => {
        try {
            return await productService.deleteProduct(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);
export const productSlice = createSlice({
    name: 'productSlice',
    initialState: {
        status: null,
        error: null,
        products: [],
        newProducts: [],
        singleProduct: null,
        productForUpdate: null,
        productForDelete: null,
        selectedPage: null,
        brand: null
    },
    reducers: {
        setProductForUpdate(state, action) {
            state.productForUpdate = action.payload;
        },
        setProductForDelete(state, action) {
            state.productForDelete = action.payload;
        },
        setPage(state, action) {
            state.selectedPage = action.payload;
        },
        setBrand(state, action) {
            state.brand = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getProductsByCategory.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getProductsByCategory.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                state.products = action.payload;
            })
            .addCase(getProductsByCategory.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload;
            })
            .addCase(createProduct.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                console.log(state.products.products);
                state.products.products = [action.payload, ...state.products.products];
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload.response.data.message;
            })
            .addCase(deleteImage.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                state.products.forEach(obj => {
                    if (obj.picture === action.payload) {
                        obj.picture = null
                    }
                });
                state.productForUpdate.picture = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                const index = state.products.products.findIndex(obj => obj._id === action.payload._id);
                if (index !== -1) {
                    state.products.products[index] = { ...action.payload };
                }
            })
            .addCase(deleteProduct.fulfilled, state => {
                state.products.products = state.products.products.filter(item => item._id !== state.productForDelete._id);
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.singleProduct = action.payload;
            })
            .addCase(getNewProducts.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                state.newProducts = action.payload;
            })
    }
});
export const { setProductForUpdate, setPage, setBrand, setProductForDelete } = productSlice.actions;
const productStore = productSlice.reducer;
export default productStore;