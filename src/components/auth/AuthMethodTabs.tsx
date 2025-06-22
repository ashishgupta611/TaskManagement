// components/AuthMethodTabs.tsx
import { Box, Button, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';

interface AuthMethodTabsProps {
  onMethodChange: (method: string) => void;
}

export const AuthMethodTabs = ({ onMethodChange }: AuthMethodTabsProps) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    const methods = ['email', 'mobile-password', 'mobile-otp'];
    onMethodChange(methods[newValue]);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
      <Tabs value={value} onChange={handleChange} variant="fullWidth">
        <Tab label="Email" />
        <Tab label="Mobile + Password" />
        <Tab label="Mobile + OTP" />
      </Tabs>
    </Box>
  );
};