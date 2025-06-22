// components/PhoneInputField.tsx
import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { FormControl, FormHelperText } from '@mui/material';

interface PhoneInputFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  helperText?: string;
}

export const PhoneInputField = ({ value, onChange, error, helperText }: PhoneInputFieldProps) => {
  return (
    <FormControl fullWidth error={error}>
      <PhoneInput
        country={'us'} // Default country
        value={value}
        onChange={onChange}
        inputStyle={{
          width: '100%',
          padding: '16.5px 14px 16.5px 58px',
          fontSize: '1rem',
          fontFamily: '"Roboto","Helvetica","Arial",sans-serif'
        }}
        buttonStyle={{
          borderColor: error ? '#f44336' : 'rgba(0, 0, 0, 0.23)',
          background: error ? '#ffebee' : undefined
        }}
        inputProps={{
          name: 'phone',
          required: true
        }}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};