'use client';

import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from '../store';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from '../components/toast';
import LoadingOverlay from '../components/loadingOverlay';
import ConfirmationDialog from '../components/confirmationDialog';

const ReduxProvider = ({ children }: Readonly<{ children: ReactNode }>) => {

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
                <Toast />
                <LoadingOverlay />
                <ConfirmationDialog />
            </PersistGate>
        </Provider>
    );
};

export default ReduxProvider;