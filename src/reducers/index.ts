import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer, PersistConfig} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import taskReducer from '../reducers/tasksSlice';

const rootReducer = combineReducers({
    tasks: taskReducer
});

export type ReducerState = ReturnType<typeof rootReducer>;

const isClient = typeof window !== 'undefined';

const persistConfig: PersistConfig<ReducerState> = {
    key: 'root',
    storage: isClient ? storage : require('redux-persist/lib/storage/session').default,
    whitelist: ['task'] 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export default persistedReducer;