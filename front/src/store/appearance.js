import { createSlice } from '@reduxjs/toolkit';
export const appearanceSlice = createSlice({
    name: 'appearanceSlice',
    initialState: {
        openedMenu: false,
        showElement: false,
        language: 'EN',
        filteredLang: ['DK', 'RU'],
        languages: ['EN', 'DK', 'RU'],
        searchBar: false,
        cart: false,
        categoryEditModal: false,
        productFormModal: false,
        productDeleteModal: false,
        categoryDeleteModal: false,
        orderDeleteModal: false
    },
    reducers: {
        hideItem(state) {
            state.showElement = false;
        },
        showSearchBar(state) {
            state.searchBar = true;
        },
        hideSearchBar(state) {
            state.searchBar = false;
        },
        setLanguage(state, action) {
            state.language = action.payload;
            state.filteredLang = state.languages.filter(item => item !== action.payload);
        },
        openMenu(state) {
            state.openedMenu = true;
        },
        closeMenu(state) {
            state.openedMenu = false;
        },
        showCart(state) {
            state.cart = (!state.cart);
        },
        hideCart(state) {
            state.cart = false;
        },
        showCategoryEdit(state) {
            state.categoryEditModal = true;
        },
        hideCategoryEdit(state) {
            state.categoryEditModal = false;
        },
        showProductForm(state) {
            state.productFormModal = true;
        },
        hideProductForm(state) {
            state.productFormModal = false;
        },
        showProductDeleteModal(state) {
            state.productDeleteModal = true;
        },
        hideProductDeleteModal(state) {
            state.productDeleteModal = false;
        },
        showCategoryDeleteModal(state) {
            state.categoryDeleteModal = true;
        },
        hideCategoryDeleteModal(state) {
            state.categoryDeleteModal = false;
        },
        showOrderDeleteModal(state) {
            state.orderDeleteModal = true;
        },
        hideOrderDeleteModal(state) {
            state.orderDeleteModal = false
        }
    }
});
export const {
    openMenu,
    closeMenu,
    setLanguage,
    showCart,
    hideCart,
    showCategoryEdit,
    hideCategoryEdit,
    showProductForm,
    hideProductForm,
    showProductDeleteModal,
    hideProductDeleteModal,
    showCategoryDeleteModal,
    hideCategoryDeleteModal,
    showSearchBar,
    hideSearchBar,
    showOrderDeleteModal,
    hideOrderDeleteModal
} = appearanceSlice.actions;
export const appearanceStore = appearanceSlice.reducer;
export default appearanceStore;