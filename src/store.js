import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'
import {apiSlice} from './slices/apiSlice';
import instaReducer from './slices/instaSlice';
const store = configureStore({
    reducer: {
       auth: authReducer,
       insta:instaReducer,
       [apiSlice.reducerPath]:apiSlice.reducer,
    }, 
    middleware: (getDefaultMiddleware)=> 
     getDefaultMiddleware().concat(apiSlice.middleware), devTools:true
    
})

export default store;