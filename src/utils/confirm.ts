import { AppDispatch } from '../store';
import { openConfirmation } from '../reducers/confirmationSlice';
import { ConfirmationProps } from '../interfaces';

export const confirm = (dispatch: AppDispatch, options: ConfirmationProps) => {
  dispatch(openConfirmation({
    title: options.title || 'Are you sure?',
    message: options.message,
    onConfirm: options.onConfirm,
    onCancel: options.onCancel,
    confirmText: options.confirmText || 'Confirm',
    cancelText: options.cancelText || 'Cancel',
  }));
};