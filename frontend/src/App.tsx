import './App.css'
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import AppRoutes from "./AppRoutes.tsx";

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
                    <CssBaseline/>
                    <AppRoutes/>
                </ThemeProvider>
            </div>

        </>
    )
}

export default App
