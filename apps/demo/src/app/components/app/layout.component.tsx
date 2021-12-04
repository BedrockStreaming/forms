import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Container from '@mui/material/Container';
import { NavBar } from './navbar.component';

const mdTheme = createTheme();

export function Layout({ children }: { children: any }) {
  return (
    <ThemeProvider theme={mdTheme}>
      <NavBar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {children}
      </Container>
    </ThemeProvider>
  );
}
