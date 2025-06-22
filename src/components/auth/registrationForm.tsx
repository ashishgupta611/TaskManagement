// app/register/page.tsx
"use client"; // This is required since we're using client-side interactivity

import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Container, 
  Typography, 
  Box, 
  Paper,
  FormControl,
  FormHelperText
} from '@mui/material';
import validate from 'validate.js';

// Define validation constraints
const constraints = {
  firstName: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 30,
      message: "must be less than 30 characters"
    }
  },
  lastName: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 30,
      message: "must be less than 30 characters"
    }
  },
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: true
  },
  phone: {
    presence: { allowEmpty: false, message: "is required" },
    format: {
      pattern: /^[\d\s+-]+$/,
      message: "must contain only numbers, +, - or spaces"
    },
    length: {
      minimum: 8,
      message: "must be at least 8 digits"
    }
  },
  password: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      minimum: 8,
      message: "must be at least 8 characters"
    }
  },
  confirmPassword: {
    equality: {
      attribute: "password",
      message: "does not match password"
    }
  }
};

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(formData, constraints);
    setErrors(validationErrors || {});

    if (!validationErrors) {
      setIsSubmitting(true);
      // Here you would typically send the data to your backend
      console.log('Form data submitted:', formData);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        alert('Registration successful!');
      }, 1000);
    }
  };

  const hasError = (field: string) => !!errors[field];

  const getErrorText = (field: string) => {
    return hasError(field) ? errors[field][0] : '';
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Register
        </Typography>
        <Paper elevation={3} sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal" error={hasError('firstName')}>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={hasError('firstName')}
                variant="outlined"
                fullWidth
              />
              <FormHelperText>{getErrorText('firstName')}</FormHelperText>
            </FormControl>

            <FormControl fullWidth margin="normal" error={hasError('lastName')}>
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={hasError('lastName')}
                variant="outlined"
                fullWidth
              />
              <FormHelperText>{getErrorText('lastName')}</FormHelperText>
            </FormControl>

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

            <FormControl fullWidth margin="normal" error={hasError('phone')}>
              <TextField
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={hasError('phone')}
                variant="outlined"
                fullWidth
              />
              <FormHelperText>{getErrorText('phone')}</FormHelperText>
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

            <FormControl fullWidth margin="normal" error={hasError('confirmPassword')}>
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={hasError('confirmPassword')}
                variant="outlined"
                fullWidth
              />
              <FormHelperText>{getErrorText('confirmPassword')}</FormHelperText>
            </FormControl>

            <Box sx={{ mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Registering...' : 'Register'}
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default RegistrationForm;