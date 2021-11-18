import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import App from "./App";
import {
    createTheme,
    ThemeProvider as ThemeUiProvider,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import store from "./Store";
import GlobalStyle from "./Styles/GlobalStyle";

const theme = createTheme({
    palette: {
        background: {
            default: "#FAFAFA",
            light: "rgba(209, 173, 173, 0.09)",
            main: "rgba(181, 44, 23, 0.15)",
        },
    },
});

ReactDOM.render(
    < Router >
        <Provider store={store}>
            <ThemeUiProvider theme={theme}>
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    <CssBaseline>

                        <App />
                    </CssBaseline>
                </ThemeProvider>
            </ThemeUiProvider>
        </Provider>
    </Router >,
    document.getElementById("root")
);
