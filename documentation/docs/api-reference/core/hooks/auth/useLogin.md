---
id: useLogin
title: useLogin
siderbar_label: useLogin
description: useLogin data hook from refine is a modified version of react-query's useMutation for authentication.
source: /packages/core/src/hooks/auth/useLogin/index.ts
---

`useLogin` calls `login` method from [`authProvider`](/api-reference/core/providers/auth-provider.md) under the hood.

It returns the result of `react-query`'s [useMutation](https://react-query.tanstack.com/reference/useMutation) which includes many properties, some of which being isSuccess and isError.

Data that is resolved from `login` will be returned as the `data` in the query result with the following type:

```ts
type AuthActionResponse = {
    success: boolean;
    redirectTo?: string;
    error?: Error;
    [key: string]: unknown;
};
```

-   `success`: A boolean indicating whether the operation was successful. If `success` is false, a notification will be shown.
    -   When `error` is provided, the notification will contain the error message and name. Otherwise, a generic error message will be shown with the following values `{ name: "Login Error", message: "Invalid credentials" }`.
-   `redirectTo`: If has a value, the app will be redirected to the given URL.
-   `error`: If has a value, a notification will be shown with the error message and name.
-   `[key: string]`: Any additional data you wish to include in the response, keyed by a string identifier.

## Usage

Normally refine provides a default login page. If you prefer to use this default login page, there is no need to handle login flow manually.  
If we want to build a custom login page instead of default one that comes with refine, `useLogin` can be used like this:

```tsx title="pages/customLoginPage"
import { useLogin } from "@pankod/refine-core";
import { Form } from "antd";

type LoginVariables = {
    username: string;
    password: string;
};

export const LoginPage = () => {
    const { mutate: login } = useLogin<LoginVariables>();

    const onSubmit = (values: LoginVariables) => {
        login(values);
    };

    return <Form onFinish={onSubmit}>// rest of the login form</Form>;
};
```

:::tip
`mutate` acquired from `useLogin` can accept any kind of object for values since `login` method from `authProvider` doesn't have a restriction on its parameters.  
A type parameter for the values can be provided to `useLogin`.

```tsx
const { mutate: login } = useLogin<{ username: string; password: string }>();
```

:::

:::caution
This hook can only be used if `authProvider` is provided.
:::
