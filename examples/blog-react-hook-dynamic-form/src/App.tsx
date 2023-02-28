import React from "react";

import { Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    RefineSnackbarProvider,
    Layout,
    LightTheme,
    ReadyPage,
    ErrorComponent,
} from "@pankod/refine-mui";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, GlobalStyles } from "@mui/material";

import UserCreate from "pages/userCreate";
import UserEdit from "pages/userEdit";
import UserList from "pages/userList";

import routerProvider from "@pankod/refine-react-router-v6/legacy";
import dataProvider from "@pankod/refine-simple-rest";

function App() {
    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <RefineSnackbarProvider>
                <Refine
                    notificationProvider={notificationProvider}
                    Layout={Layout}
                    ReadyPage={ReadyPage}
                    catchAll={<ErrorComponent />}
                    legacyRouterProvider={routerProvider}
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    resources={[
                        {
                            name: "users",
                            list: UserList,
                            create: UserCreate,
                            edit: UserEdit,
                        },
                    ]}
                />
            </RefineSnackbarProvider>
        </ThemeProvider>
    );
}

export default App;
