import './App.css';
import { ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import Main from './components/Main/Main';
import theme from './themes/theme';
import About from './components/About/About';
import Contacts from './components/Contacts/Contacts';
import Category from './components/Category/Category';
import React from 'react';
import Loader from './components/Loader/Loader';
import MainAdmin from './components/Admin/MainAdmin';
import Login from './components/Admin/Login/Login';
import Orders from './components/Admin/Orders/Orders';
import CategoriesAdmin from './components/Admin/CategoriesAdmin/CategoriesAdmin';
import ProductsAdmin from './components/Admin/ProductsAdmin/ProductsAdmin';
import ItemDetails from './components/ItemDetails/ItemDetails';
import OrderForm from './components/OrderForm/OrderForm';
import CompleteOrder from './components/OrderForm/CompleteOrder';
import Search from './components/Search/Search';
import SliderAdmin from './components/Admin/Slider/Slider';
import Brands from './components/Admin/Brands/Brands';
import SearchAdmin from './components/Admin/SearchAdmin/SearchAdmin';
import ProductEditForm from './components/Admin/ProductsAdmin/ProductEditForm/ProductEditForm';
import NoMatch from './components/NoMatch/NoMatch';

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