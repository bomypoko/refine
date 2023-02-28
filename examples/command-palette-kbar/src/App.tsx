import { Refine } from "@pankod/refine-core";
import { RefineKbarProvider } from "@pankod/refine-kbar";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
} from "@pankod/refine-antd";
import { StarOutlined } from "@ant-design/icons";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6/legacy";
import "@pankod/refine-antd/dist/reset.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import {
    CategoriesList,
    CategoriesCreate,
    CategoriesEdit,
} from "pages/categories";

import { OffLayoutArea } from "./components";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <RefineKbarProvider>
            <Refine
                legacyRouterProvider={routerProvider}
                dataProvider={dataProvider(API_URL)}
                resources={[
                    {
                        name: "posts",
                        list: PostList,
                        create: PostCreate,
                        edit: PostEdit,
                        show: PostShow,
                        icon: <StarOutlined />,
                        canDelete: true,
                    },
                    {
                        name: "categories",
                        list: CategoriesList,
                        create: CategoriesCreate,
                        edit: CategoriesEdit,
                        canDelete: true,
                    },
                ]}
                notificationProvider={notificationProvider}
                Layout={Layout}
                OffLayoutArea={OffLayoutArea}
                catchAll={<ErrorComponent />}
            />
        </RefineKbarProvider>
    );
};

export default App;
