// app/login/page.tsx
"use client";

import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Typography, 
  FormControl,
  FormHelperText,
  CircularProgress,
  Link,
  Box
} from '@mui/material';
import validate from 'validate.js';
import { AuthFormContainer } from '@/src/components/auth/AuthFormContainer';
import { AuthMethodTabs } from '@/src/components/auth/AuthMethodTabs';
import { PhoneInputField } from '@/src/components/core/PhoneInputField';

// Updated validation constraints
const constraints = {
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: true
  },
  phone: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      minimum: 5,
      message: "must be at least 5 digits"
    }
  },
  password: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      minimum: 8,
      message: "must be at least 8 characters"
    }
  },
  otp: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      is: 6,
      message: "must be exactly 6 digits"
    },
    numericality: {
      onlyInteger: true,
      message: "must contain only numbers"
    }
  }
};

const LoginPage = () => {
  const [authMethod, setAuthMethod] = useState<'email' | 'mobile-password' | 'mobile-otp'>('email');
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    otp: ''
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleMethodChange = (method: string) => {
    setAuthMethod(method as 'email' | 'mobile-password' | 'mobile-otp');
    setErrors({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      phone: value
    }));
  };

  const validateForm = () => {
    let validationConstraints = {};
    
    if (authMethod === 'email') {
      validationConstraints = {
        email: constraints.email,
        password: constraints.password
      };
    } else if (authMethod === 'mobile-password') {
      validationConstraints = {
        phone: constraints.phone,
        password: constraints.password
      };
    } else if (authMethod === 'mobile-otp') {
      validationConstraints = otpSent 
        ? { phone: constraints.phone, otp: constraints.otp }
        : { phone: constraints.phone };
    }

    return validate(formData, validationConstraints);
  };

  const handleSendOtp = () => {
    const validationErrors = validate({ phone: formData.phone }, { phone: constraints.phone });
    if (validationErrors) {
      setErrors(validationErrors);
    } else {
      setIsSubmitting(true);
      // Simulate OTP sending
      setTimeout(() => {
        setIsSubmitting(false);
        setOtpSent(true);
      }, 1000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors || {});

    if (!validationErrors) {
      setIsSubmitting(true);
      // Here you would typically send the data to your backend
      console.log('Login data submitted:', { 
        authMethod, 
        ...formData,
        // For phone numbers, you might want to send just the digits
        phoneDigits: formData.phone.replace(/\D/g, '')
      });
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        alert('Login successful!');
      }, 1000);
    }
  };

  const hasError = (field: string) => !!errors[field];
  const getErrorText = (field: string) => hasError(field) ? errors[field][0] : '';

  return (
    <AuthFormContainer title="Login">
      <AuthMethodTabs onMethodChange={handleMethodChange} />

      <form onSubmit={handleSubmit}>
        {authMethod === 'email' && (
          <>
            <FormControl fullWidth margin="normal" error={hasError('email')}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={hasError('email')}
                variant="outlined"
                fullWidth
              />
              <FormHelperText>{getErrorText('email')}</FormHelperText>
            </FormControl>

            <FormControl fullWidth margin="normal" error={hasError('password')}>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={hasError('password')}
                variant="outlined"
                fullWidth
              />
              <FormHelperText>{getErrorText('password')}</FormHelperText>
            </FormControl>
          </>
        )}

        {(authMethod === 'mobile-password' || authMethod === 'mobile-otp') && (
          <PhoneInputField
            value={formData.phone}
            onChange={handlePhoneChange}
            error={hasError('phone')}
            helperText={getErrorText('phone')}
          />
        )}

        {authMethod === 'mobile-password' && (
          <FormControl fullWidth margin="normal" error={hasError('password')}>
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={hasError('password')}
              variant="outlined"
              fullWidth
            />
            <FormHelperText>{getErrorText('password')}</FormHelperText>
          </FormControl>
        )}

        {authMethod === 'mobile-otp' && otpSent && (
          <FormControl fullWidth margin="normal" error={hasError('otp')}>
            <TextField
              label="OTP"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              error={hasError('otp')}
              variant="outlined"
              fullWidth
              inputProps={{ maxLength: 6 }}
            />
            <FormHelperText>{getErrorText('otp')}</FormHelperText>
          </FormControl>
        )}

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {authMethod === 'mobile-otp' && !otpSent ? (
            <Button
              variant="contained"
              onClick={handleSendOtp}
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size={24} /> : 'Send OTP'}
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size={24} /> : 'Login'}
            </Button>
          )}

          <Link href="/forgot-password" variant="body2">
            Forgot password?
          </Link>
        </Box>
      </form>

      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="body2">
          Don't have an account? <Link href="/register">Sign up</Link>
        </Typography>
      </Box>
    </AuthFormContainer>
  );
};

export default LoginPage;