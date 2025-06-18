import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer, PersistConfig} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import taskReducer from '../reducers/tasksSlice';
import loadingReducer from '../reducers/loadingSlice';
import messageReducer from '../reducers/messageSlice';
import confirmationreducer from '../reducers/confirmationSlice';

const rootReducer = combineReducers({
    tasks: taskReducer,
    loading: loadingReducer,
    message: messageReducer,
    confirmation: confirmationreducer
});

export type ReducerState = ReturnType<typeof rootReducer>;

const isClient = typeof window !== 'undefined';

const persistConfig: PersistConfig<ReducerState> = {
    key: 'root',
    storage: isClient ? storage : require('redux-persist/lib/storage/session').default,
    whitelist: ['tasks', 'loading', 'message', 'confirmation'] 
    //whitelist: ['tasks'] 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export default persistedReducer;