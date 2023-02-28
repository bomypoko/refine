import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6/legacy";
import dataProvider from "@pankod/refine-simple-rest";
import { Layout } from "components/Layout";
import "index.css";
import { CategoryCreate } from "pages/category/create";
import { CategoryList } from "pages/category/list";

function App() {
    return (
        <Refine
            legacyRouterProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
                {
                    name: "categories",
                    create: CategoryCreate,
                    list: CategoryList,
                },
            ]}
            Layout={({ children }) => <Layout> {children}</Layout>}
        />
    );
}

export default App;
