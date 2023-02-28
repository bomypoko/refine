import React from "react";

import { Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    LightTheme,
    ReadyPage,
    ErrorComponent,
} from "@pankod/refine-mantine";

import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider, Global } from "@mantine/core";

import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6/legacy";

function App() {
    return (
        <MantineProvider theme={LightTheme} withNormalizeCSS withGlobalStyles>
            <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
            <NotificationsProvider position="top-right">
                <Refine
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    notificationProvider={notificationProvider}
                    Layout={Layout}
                    ReadyPage={ReadyPage}
                    catchAll={<ErrorComponent />}
                    legacyRouterProvider={routerProvider}
                />
            </NotificationsProvider>
        </MantineProvider>
    );
}

export default App;
