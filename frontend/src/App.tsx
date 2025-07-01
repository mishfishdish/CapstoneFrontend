import { useState } from 'react'
import './App.css'
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import LoginPage from "./onboarding/pages/LoginInPage";

const theme = createTheme({
    palette: {
        mode: 'light', // or 'dark'
    },
});

function App() {
  return (
    <>
      <div>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <LoginPage/>
        </ThemeProvider>
      </div>

    </>
  )
}

export default App
