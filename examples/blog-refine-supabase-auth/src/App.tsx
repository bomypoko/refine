import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6/legacy";
import { dataProvider } from "@pankod/refine-supabase";
import { supabaseClient } from "utility";
import authProvider from "./authProvider";
import { Countries } from "pages/Countries";
import { Layout } from "pages/Layout";
import "./App.css";
import { LoginPage } from "pages/Login";

function App() {
    return (
        <Refine
            legacyRouterProvider={{
                ...routerProvider,
            }}
            dataProvider={dataProvider(supabaseClient)}
            legacyAuthProvider={authProvider}
            resources={[{ name: "countries", list: Countries }]}
            LoginPage={LoginPage}
            Layout={Layout}
        />
    );
}
export default App;
