import { createSlice} from "@reduxjs/toolkit";


const initialState = {
    isAddProductModalOpen: false,
    isAddAuthorModalOpen: false,
    isAddGenreModalOpen: false,
    isViewOrderModalOpen: false,

}


const modalSlice = createSlice({
    name:"modal",
    initialState,
    reducers:{
        setProductModal:(state)=>{
            state.isAddProductModalOpen=!state.isAddProductModalOpen;
        },
        setAuthorModal:(state)=>{
            state.isAddAuthorModalOpen=!state.isAddAuthorModalOpen;
        },
        setGenreModal:(state)=>{
            state.isAddGenreModalOpen=!state.isAddGenreModalOpen;
        },
        setViewOrderModal:(state)=>{
            state.isViewOrderModalOpen=!state.isViewOrderModalOpen;
        }
    },

});
export const {setProductModal, setAuthorModal, setGenreModal, setViewOrderModal} = modalSlice.actions;

export default modalSlice.reducer;