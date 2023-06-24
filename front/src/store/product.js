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

export const addImage = createAsyncThunk(
    'productSlice/AddImage',
    async (data, thunkAPI) => {
        try {
            return productService.addImage(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const updateImage = createAsyncThunk(
    'productSlice/UpdateImage',
    async (data, thunkAPI) => {
        try {
            return productService.updateImage(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const deleteProductImage = createAsyncThunk(
    'productSlice/DeleteProductImage',
    async (data, thunkAPI) => {
        try {
            return productService.deleteImage(data);
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
        brand: null,
        updatePictures: [],
        newPictures: [],
        newFile: null,
        delPictures: [],
        confirmDialog: false,
        confirmDelete: false
    },
    reducers: {
        setNewFile(state, action) {
            state.newFile = action.payload;
        },
        resetNewFile(state) {
            state.newFile = null;
        },
        setProductForUpdate(state, action) {
            state.productForUpdate = action.payload;
        },
        setProductForDelete(state, action) {
            state.productForDelete = action.payload;
        },
        setPictureForUpdate(state, action) {
            const existingPictureForUpdate = state.updatePictures.findIndex(item => item.index === action.payload.index);
            if (existingPictureForUpdate === -1) {
                state.updatePictures = [...state.updatePictures, action.payload]

            } else {
                state.updatePictures[action.payload.index] = action.payload;
            }
        },
        addPicture(state, action) {
            state.newPictures = [...state.newPictures, action.payload];
        },
        deletePicture(state, action) {
            state.productForUpdate.pictures = state.productForUpdate.pictures.filter(item => item.filename !== action.payload);
            state.updatePictures = state.updatePictures.filter(item => item.filename !== action.payload);
            state.delPictures = [...state.delPictures, action.payload];
        },
        changePicture(state, action) {
            state.newPictures[action.payload.index] = action.payload.picture;
        },
        removeNewPicture(state, action) {
            state.newPictures.splice(action.payload, 1);
        },
        resetPictures(state, action) {
            state.newPictures = [];
            state.updatePictures = [];
            state.delPictures = [];
        },
        setPage(state, action) {
            state.selectedPage = action.payload;
        },
        setBrand(state, action) {
            state.brand = action.payload;
        },
        setConfirmDialog(state) {
            state.confirmDialog = true;
        },
        resetConfirmDialog(state) {
            state.confirmDialog = false;
        },
        setConfirmDelete(state) {
            state.confirmDelete = true;
        },
        resetConfirmDelete(state) {
            state.confirmDelete = false;
        },
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
                state.products.products = [action.payload, ...state.products.products];
                state.productForUpdate = action.payload;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload.response.data.message;
            })

            .addCase(updateProduct.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                const index = state.products.products.findIndex(obj => obj._id === action.payload._id);
                if (index !== -1) {
                    state.products.products[index] = { ...action.payload };
                }
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                console.log(action.payload);
                state.products.products = state.products.products.filter(item => item._id !== action.payload);
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.singleProduct = action.payload;
            })
            .addCase(getNewProducts.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.error = null;
                state.newProducts = action.payload;
            })
            .addCase(addImage.fulfilled, (state, action) => {
                state.productForUpdate.pictures = action.payload.pictures;
                state.newFile = null;
            })
            .addCase(updateImage.fulfilled, (state, action) => {
                state.productForUpdate.pictures = action.payload.pictures;
            })
            .addCase(deleteProductImage.fulfilled, (state, action) => {
                state.productForUpdate.pictures = action.payload;
            })
    }
});
export const {
    setProductForUpdate,
    setPage,
    setBrand,
    setProductForDelete,
    setPictureForUpdate,
    addPicture,
    removeNewPicture,
    changePicture,
    deletePicture,
    resetPictures,
    setConfirmDialog,
    resetConfirmDialog,
    setNewFile,
    resetNewFile,
    setConfirmDelete,
    resetConfirmDelete
} = productSlice.actions;
const productStore = productSlice.reducer;
export default productStore;