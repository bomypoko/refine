import { Refine } from "@pankod/refine-core";
import {
    ErrorComponent,
    Layout,
    refineTheme,
    ReadyPage,
    notificationProvider,
} from "@pankod/refine-chakra-ui";
import { ChakraProvider } from "@chakra-ui/react";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6/legacy";

import { PostList } from "./pages";

const App: React.FC = () => {
    return (
        <ChakraProvider theme={refineTheme}>
            <Refine
                notificationProvider={notificationProvider()}
                legacyRouterProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                Layout={Layout}
                ReadyPage={ReadyPage}
                catchAll={<ErrorComponent />}
                resources={[
                    {
                        name: "posts",
                        list: PostList,
                    },
                ]}
            />
        </ChakraProvider>
    );
};

export default App;
