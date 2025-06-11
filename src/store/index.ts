import { configureStore } from '@reduxjs/toolkit';
import persistedReducer from '../reducers';
import { persistStore } from "redux-persist";

export const store = configureStore({
    reducer: {
        rootReducer: persistedReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;







