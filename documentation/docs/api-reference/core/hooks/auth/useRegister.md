---
id: useRegister
title: useRegister
siderbar_label: useRegister
description: useRegister data hook from refine is a modified version of react-query's useMutation for registration.
---

`useRegister` calls `register` method from [`authProvider`](/api-reference/core/providers/auth-provider.md) under the hood.

It returns the result of `react-query`'s [useMutation](https://react-query.tanstack.com/reference/useMutation) which includes many properties, some of which being isSuccess and isError.

Data that is resolved from `register` will be returned as the `data` in the query result with the following type:

```ts
type AuthActionResponse = {
    success: boolean;
    redirectTo?: string;
    error?: Error;
    [key: string]: unknown;
};
```

-   `success`: A boolean indicating whether the operation was successful. If `success` is false, a notification will be shown.
    -   When an `error` is provided, the notification will contain the error message and name. Otherwise, a generic error message will be shown with the following values `{ name: "Register Error", message: "Error while registering" }`.
-   `redirectTo`: If has a value, the app will be redirected to the given URL.
-   `error`: If has a value, a notification will be shown with the error message and name.
-   `[key: string]`: Any additional data you wish to include in the response, keyed by a string identifier.

## Usage

Normally refine provides a default register page. If you prefer to use this default register page, there is no need to handle register flow manually.  
If we want to build a custom register page instead of the default one that comes with **refine**, `useRegister` can be used like this:

```tsx title="pages/customRegisterPage"
import { useRegister } from "@pankod/refine-core";

type RegisterVariables = {
    email: string;
    password: string;
};

export const RegisterPage = () => {
    const { mutate: register } = useRegister<RegisterVariables>();

    const onSubmit = (values: RegisterVariables) => {
        register(values);
    };

    return (
        <form onSubmit={onSubmit}>
            <label>Email</label>
            <input name="email" value="test@refine.com" />
            <label>Password</label>
            <input name="password" value="refine" />
            <button type="submit">Submit</button>
        </form>
    );
};
```

:::tip
`mutate` acquired from `useRegister` can accept any kind of object for values since `register` method from `authProvider` doesn't have a restriction on its parameters.  
A type parameter for the values can be provided to `useRegister`.

```tsx
const { mutate: register } = useRegister<{ email: string; password: string }>();
```

:::

:::caution
This hook can only be used if `authProvider` is provided.
:::
