import React from 'react';
import { ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import theme from './themes/theme';
import './App.css';

import {
    About, Brands, CategoriesAdmin,
    Category,
    CompleteOrder,
    Contacts,
    ItemDetails,
    Loader, Login, Main, MainAdmin,
    NoMatch,
    OrderForm, Orders, ProductEditForm, ProductsAdmin,
    Search, SearchAdmin, SliderAdmin
} from './components';

const Layout = React.lazy(() => import('./components/Layout/Layout'));
const AdminLayout = React.lazy(() => import('./components/Admin/AdminLayout'));

function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route element={<React.Suspense fallback={<Loader/>}>
                        <Layout/>
                    </React.Suspense>}>
                        <Route path={'/'} index element={<Main/>}/>
                        <Route path={'about'} element={<About/>}/>
                        <Route path={'contacts'} element={<Contacts/>}/>
                        <Route path={'category/:id'} element={<Category/>}/>
                        <Route path={'product/:id'} element={<ItemDetails/>}/>
                        <Route path={'checkout'} element={<OrderForm/>}/>
                        <Route path={'completed'} element={<CompleteOrder/>}/>
                        <Route path={'search'} element={<Search/>}/>
                        <Route path={'*'} element={<NoMatch/>}/>
                    </Route>
                    <Route element={<React.Suspense fallback={<Loader/>}>
                        <AdminLayout/>
                    </React.Suspense>}>
                        <Route path={'admin'} element={<MainAdmin/>}>
                            <Route path={''} element={<Orders/>}/>
                            <Route path={'orders'} element={<Orders/>}/>
                            <Route path={'categories'} element={<CategoriesAdmin/>}/>
                            <Route path={'category/:id'} element={<ProductsAdmin/>}/>
                            <Route path={'category/:id/new'} element={<ProductEditForm/>}/>
                            <Route path={'product/:id/'} element={<ProductEditForm/>}/>
                            <Route path={'slider'} element={<SliderAdmin/>}/>
                            <Route path={'brands'} element={<Brands/>}/>
                            <Route path={'search'} element={<SearchAdmin/>}/>
                            <Route path={'*'} element={<NoMatch/>}/>
                        </Route>
                    </Route>
                    <Route path={'/login'} element={<Login/>}/>
                </Routes>
            </ThemeProvider>

        </>
    );
}

export default App;