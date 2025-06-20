'use client';

import React, { useRef, useState } from 'react';
import {
    Container,
    Box,
    Paper,
    Button,
    TextField,
    Typography,
    Alert,
    Stack,
} from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import validate from 'validate.js';
import 'react-phone-input-2/lib/material.css';

const constraints = {
    firstName: { presence: { allowEmpty: false } },
    lastName: { presence: { allowEmpty: false } },
    email: { presence: { allowEmpty: false }, email: true },
    password: {
        presence: { allowEmpty: false },
        length: { minimum: 6 },
    },
    confirmPassword: {
        presence: { allowEmpty: false },
        equality: 'password',
    },
    phone: {
        presence: { allowEmpty: false },
        format: {
            pattern: /^\+?[1-9]\d{7,14}$/,
            message: 'is not a valid international phone number',
        },
    },
};

const FIFTEEN_MIN = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

const RegistrationForm2 = () => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState<any>({});
    const [submitBlocked, setSubmitBlocked] = useState(false);
    const [warning, setWarning] = useState('');

    const submitRef = useRef<{ timestamps: number[] }>({ timestamps: [] });

    const now = () => new Date().getTime();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handlePhoneChange = (value: string) => {
        setForm((prev) => ({ ...prev, phone: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const current = now();
        const timestamps = submitRef.current.timestamps.filter(
            (t) => current - t < FIFTEEN_MIN
        );

        if (timestamps.length >= MAX_ATTEMPTS) {
            setSubmitBlocked(true);
            setWarning(
                'Too many attempts. Please wait 15 minutes before trying again.'
            );
            return;
        }

        const validationErrors = validate(form, constraints);

        if (validationErrors) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            timestamps.push(current);
            submitRef.current.timestamps = timestamps;
            console.log('✅ Submitted Form:', form);
            setWarning('');
            // You can clear form here if needed
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, mb: 4 }}>
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    Register
                </Typography>
                <Paper elevation={3} sx={{ p: 4 }}>

                    {warning && <Alert severity="warning">{warning}</Alert>}

                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                label="First Name"
                                name="firstName"
                                value={form.firstName}
                                onChange={handleChange}
                                error={!!errors.firstName}
                                helperText={errors.firstName?.[0]}
                                fullWidth
                            />
                            <TextField
                                label="Last Name"
                                name="lastName"
                                value={form.lastName}
                                onChange={handleChange}
                                error={!!errors.lastName}
                                helperText={errors.lastName?.[0]}
                                fullWidth
                            />
                            <TextField
                                label="Email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                error={!!errors.email}
                                helperText={errors.email?.[0]}
                                fullWidth
                            />
                            <Box>
                                <Typography variant="subtitle2" mb={0.5}>
                                    Phone Number
                                </Typography>
                                <PhoneInput
                                    country={'in'}
                                    value={form.phone}
                                    onChange={handlePhoneChange}
                                    inputStyle={{
                                        width: '100%',
                                    }}
                                    inputProps={{
                                        name: 'phone',
                                        required: true,
                                    }}
                                />
                                {errors.phone && (
                                    <Typography variant="caption" color="error">
                                        {errors.phone[0]}
                                    </Typography>
                                )}
                            </Box>
                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                error={!!errors.password}
                                helperText={errors.password?.[0]}
                                fullWidth
                            />
                            <TextField
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword?.[0]}
                                fullWidth
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={submitBlocked}
                            >
                                Register
                            </Button>
                        </Stack>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
};

export default RegistrationForm2;
