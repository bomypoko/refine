---
id: useIsAuthenticated
title: useIsAuthenticated
siderbar_label: useIsAuthenticated
description: useIsAuthenticated data hook from refine is a modified version of react-query's useMutation for create mutations
source: /packages/core/src/hooks/auth/useIsAuthenticated/index.ts
---

`useIsAuthenticated` calls the `check` method from the[`authProvider`](/api-reference/core/providers/auth-provider.md) under the hood.

It returns the result of `react-query`'s `useQuery` which includes many properties, some of which being `isSuccess` and `isError`.  
Data that is resolved from the `useIsAuthenticated` will be returned as the `data` in the query result with the following type:

```ts
type CheckResponse = {
    authenticated: boolean;
    redirectTo?: string;
    logout?: boolean;
    error?: Error;
};
```

-   `authenticated`: A boolean value indicating whether the user is authenticated or not.
-   `redirectTo`: A string value indicating the URL to redirect to if authentication is required.
-   `logout`: A boolean value indicating whether the user should be logged out.
-   `error`: An Error object representing any errors that may have occurred during the check.

## Usage

`useIsAuthenticated` can be useful when you want to ask for authentication to grant access to [custom pages](/advanced-tutorials/custom-pages.md) manually.

We have used this hook in refine's [`<Authenticated>`](/api-reference/core/components/auth/authenticated.md) component which allows only authenticated users to access the page or any part of the code.

We will demonstrate a similar basic implementation below. Imagine that you have public page but you want to make some specific fields private.

We have a logic in [`authProvider`](/api-reference/core/providers/auth-provider.md)'s `check` method like below.

```tsx
const authProvider: AuthProvider = {
    // ---
    // highlight-start
    check: () =>
        localStorage.getItem("email")
            ? Promise.resolve({
                  authenticated: true,
              })
            : Promise.resolve({
                  authenticated: false,
                  error: new Error("Not authenticated"),
                  logout: true,
                  redirectTo: "/login",
              }),
    // highlight-end
    // ---
};
```

<br/>

Let's create a wrapper component that renders children if `check` method returns the Promise resolved.

```tsx title="components/authenticated.tsx"
// highlight-next-line
import { useIsAuthenticated, useNavigation } from "@pankod/refine";

export const Authenticated: React.FC<AuthenticatedProps> = ({
    children,
    fallback,
    loading,
}) => {
    // highlight-next-line
    const { isLoading, data } = useIsAuthenticated();

    const { replace } = useNavigation();

    if (isLoading) {
        return <>{loading}</> || null;
    }

    if (data.error) {
        if (!fallback) {
            replace(redirectTo);
            return null;
        }

        return <>{fallback}</>;
    }

    if (data.authenticated) {
        return <>{children}</>;
    }

    return null;
};

type AuthenticatedProps = {
    fallback?: React.ReactNode;
    loading?: React.ReactNode;
};
```

<br />

Now, only authenticated users can see the price field.

```tsx title="components/postShow"
// highlight-next-line
import { Authenticated } from "components/authenticated";

const { Title, Text } = Typography;

export const PostShow: React.FC = () => (
    <div>
        // highlight-start
        <Authenticated>
            <span>Only authenticated users can see</span>
        </Authenticated>
        // highlight-end
    </div>
);
```

:::caution
This hook can only be used if the `authProvider` is provided.
:::
