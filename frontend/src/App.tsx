import './App.css'
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import AppRoutes from "./AppRoutes.tsx";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';

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
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <CssBaseline/>
                        <AppRoutes/>
                    </LocalizationProvider>

                </ThemeProvider>
            </div>

        </>
    )
}

export default App
