// components/AuthFormContainer.tsx
import { Box, Paper, Typography } from '@mui/material';
import React from 'react';

interface AuthFormContainerProps {
  title: string;
  children: React.ReactNode;
}

export const AuthFormContainer = ({ title, children }: AuthFormContainerProps) => {
  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        {title}
      </Typography>
      <Paper elevation={3} sx={{ p: 4 }}>
        {children}
      </Paper>
    </Box>
  );
};