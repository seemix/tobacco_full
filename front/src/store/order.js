import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderService } from '../services/order.service';
import { config } from '../config/config';

export const createOrder = createAsyncThunk(
    'orderSlice/CreateOrder',
    async (data, thunkAPI) => {
        try {
            return orderService.createOrder(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const getAllOrders = createAsyncThunk(
    'orderSlice/GetAll',
    async (page, thunkAPI) => {
        try {
            return orderService.getAllOrders(page);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const setCompleted = createAsyncThunk(
    'orderSlice/SetCompleted',
    async (data, thunkAPI) => {
        try {
            return orderService.setCompleted(data);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const deleteOrderById = createAsyncThunk(
    'orderSlice/DeleteOrderById',
    async (_id, thunkAPI) => {
        try {
            return await orderService.deleteOrderById(_id);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);
export const orderSlice = createSlice({
    name: 'orderSlice',
    initialState: {
        createdOrder: null,
        status: null,
        error: null,
        total: 0,
        freeShipping: false,
        products: [],
        customerName: null,
        customerSurname: null,
        customerPhone: null,
        address: null,
        orderForDelete: null,
        response: null
    },
    reducers: {
        addProductToCart(state, action) {
            state.products.push(action.payload);
            state.total = state.total + action.payload.price * action.payload.count;
            state.freeShipping = state.total >= config.FREE_SHIPPING_COST;
        },
        removeItem(state, action) {
            state.total -= action.payload.price * action.payload.count;
            state.products = state.products.filter(item => item._id !== action.payload._id);
            state.freeShipping = state.total >= config.FREE_SHIPPING_COST;
        },
        removeAllItems(state) {
            state.products = [];
            state.total = 0;
            state.freeShipping = false;
        },
        reduceCount(state, action) {
            const index = state.products.findIndex(obj => obj._id === action.payload._id);
            if (state.products[index].count > 1) {
                state.products[index].count -= 1;
                state.total -= state.products[index].price;
            }
            state.freeShipping = state.total >= config.FREE_SHIPPING_COST;

        },
        incrementCount(state, action) {
            const index = state.products.findIndex(obj => obj._id === action.payload._id);
            state.products[index].count += 1;
            state.total += state.products[index].price;
            state.freeShipping = state.total >= config.FREE_SHIPPING_COST;
        },
        setOrderForDelete(state, action) {
            state.orderForDelete = action.payload;
        },
        putNewOrder(state, action) {
            state.response.orders = [action.payload, ...state.response.orders];
        },
        setCompeteOrder(state) {
            state.status = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(createOrder.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.createdOrder = action.payload;
                state.createdOrder.products = state.products;
                state.products = [];
            })
            .addCase(createOrder.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getAllOrders.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.response = action.payload;
            })
            .addCase(setCompleted.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(setCompleted.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                const index = state.response.orders.findIndex(obj => obj._id === action.payload._id);
                state.response.orders[index] = { ...state.response.orders[index], completed: action.payload.completed }
            })
            .addCase(deleteOrderById.fulfilled, state => {
                state.status = 'fulfilled';
                state.response.orders = state.response.orders.filter(item => item._id !== state.orderForDelete._id);
            })
    }
});
export const {
    addProductToCart,
    setOrderForDelete,
    removeItem,
    removeAllItems,
    incrementCount,
    reduceCount,
    putNewOrder,
    setCompeteOrder
} = orderSlice.actions;
const orderStore = orderSlice.reducer;
export default orderStore;