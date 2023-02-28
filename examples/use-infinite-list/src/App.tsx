import { LayoutProps, Refine, useRouterContext } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6/legacy";
import dataProvider from "@pankod/refine-simple-rest";

import { githubDataProvider } from "github-data-provider";
import { PostList } from "pages/posts/list";
import { CommitList } from "pages/commits/list";
import "./App.css";

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
    const { Link } = useRouterContext();
    return (
        <div>
            <ul>
                <li>
                    <Link to="/posts">
                        Post example with Simple Rest (offset pagination)
                    </Link>
                </li>
                <li>
                    <Link to="/commits">
                        Commits example with Github API Data Provider (cursor
                        pagination)
                    </Link>
                </li>
            </ul>

            {children}
        </div>
    );
};

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={{
                default: dataProvider("https://api.fake-rest.refine.dev"),
                github: githubDataProvider(),
            }}
            legacyRouterProvider={routerProvider}
            Layout={Layout}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                },
                {
                    name: "commits",
                    list: CommitList,
                },
            ]}
        />
    );
};

export default App;
