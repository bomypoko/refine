import { Refine } from "@pankod/refine-core";
import {
    Layout,
    ErrorComponent,
    ReadyPage,
    LightTheme,
    notificationProvider,
    SnackbarProvider,
} from "@pankod/refine-mui";
import { ThemeProvider } from "@mui/material/styles";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6/legacy";

import { PostsList, PostCreate, PostEdit } from "pages/posts";

const App: React.FC = () => {
    return (
        <ThemeProvider theme={LightTheme}>
            <SnackbarProvider>
                <Refine
                    legacyRouterProvider={routerProvider}
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    notificationProvider={notificationProvider}
                    ReadyPage={ReadyPage}
                    Layout={Layout}
                    catchAll={<ErrorComponent />}
                    resources={[
                        {
                            name: "posts",
                            list: PostsList,
                            create: PostCreate,
                            edit: PostEdit,
                        },
                    ]}
                />
            </SnackbarProvider>
        </ThemeProvider>
    );
};

export default App;
