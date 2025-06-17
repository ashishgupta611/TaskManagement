import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer, PersistConfig} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import taskReducer from '../reducers/tasksSlice';
import loadingReducer from '../reducers/loadingSlice';
import messageReducer from '../reducers/messageSlice';

const rootReducer = combineReducers({
    tasks: taskReducer,
    loading: loadingReducer,
    message: messageReducer
});

export type ReducerState = ReturnType<typeof rootReducer>;

const isClient = typeof window !== 'undefined';

const persistConfig: PersistConfig<ReducerState> = {
    key: 'root',
    storage: isClient ? storage : require('redux-persist/lib/storage/session').default,
    whitelist: ['tasks', 'loading', 'message'] 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export default persistedReducer;