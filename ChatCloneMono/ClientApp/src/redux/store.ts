import { configureStore } from '@reduxjs/toolkit';
import serverReducer from './slices/serverSlice'

const store = configureStore({
    reducer: {
        servers: serverReducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch