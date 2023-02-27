---
id: create-authprovider
title: 2. Create Auth Provider From Scratch
tutorial:
    prev: tutorial/understanding-authprovider/index
    next: tutorial/understanding-authprovider/{preferredUI}/auth-pages
---

This section will show you how to create an auth provider from scratch. We'll use mock data to be able to focus on the auth provider methods. When you understand the logic of auth provider, you can easly integrate third-party authentication services or your own custom auth provider which includes many possible strategies like JWT, OAuth, etc.

## Create Mock Auth Provider

1. Create a new file named `authProvider.ts` in `src` folder and add the following code:

    ```tsx title="src/authProvider.ts"
    import { AuthBindings } from "@pankod/refine-core";

    const authProvider: AuthBindings = {
        login: () => Promise.resolve(),
        check: () => Promise.resolve(),
        logout: () => Promise.resolve(),
        onError: () => Promise.resolve(),
    };

    export default authProvider;
    ```

    We created a mock auth provider. It has all the required methods. But, they don't do anything. We'll add the logic to these methods in the next.

2. Now, we need to pass the `authProvider` to the `<Refine/>` component. Open `App.tsx` file and add the related code:

    ```tsx title="src/App.tsx"
    // ---
    import authProvider from "./authProvider";

    <Refine
        // ---
        authProvider={authProvider}
    />;
    ```

    The `authProvider` is not required for the `<Refine/>` component. If you don't pass it, your app will work without authentication. But, you won't be able to use the auth hooks.

<br />

We created a mock auth provider and passed it to the `<Refine/>` component. Now, we'll add the logic to the auth provider methods.

## Required Methods

### login

`login` method is used to authenticate users. It expects to return a resolved Promise with the following type:

```ts
type AuthActionResponse = {
    success: boolean;
    redirectTo?: string;
    error?: Error;
    [key: string]: unknown;
};
```

-   `success`: Determines whether the operation is successful or not.
-   `redirectTo`: The path of the page that the user will be redirected to after the operation is completed.
-   `error`: An object containing details about any errors encountered during the operation.
-   `[key: string]`: Any additional data you wish to include in the response, keyed by a string identifier.

We'll use mock data to authenticate users. So, we'll create a mock user list and check if the user exists in the list. If the user exists, we'll save the user data to the local storage and resolve the Promise with `success: true`. Otherwise, we'll resolve the Promise with `success: false`.

```tsx title="src/authProvider.ts"
import { AuthBindings } from "@pankod/refine-core";

const mockUsers = [{ email: "john@mail.com" }, { email: "jane@mail.com" }];

const authProvider: AuthBindings = {
    login: ({ email, password }) => {
        // Suppose we actually send a request to the back end here.
        const user = mockUsers.find((item) => item.email === email);

        if (user) {
            localStorage.setItem("auth", JSON.stringify(user));
            return Promise.resolve({
                success: true,
                redirectTo: "/",
            });
        }

        return Promise.resolve({
            success: false,
            error: new Error("Invalid email or password"),
        });
    },
    // ---
};
```

<br />

Invoking the `useLogin` hook's mutation will call the `login` method, passing in the mutation's parameters as arguments. This means the parameters for the `useLogin` hook's mutation must match the parameters of the login method.

[Refer to the `useLogin` documentation for more information &#8594](/docs/api-reference/core/hooks/auth/useLogin/)

For example, if we call the `useLogin` hook's mutation like this:

```tsx
import { useLogin } from "@pankod/refine-core";

const { mutate } = useLogin();

mutate({ email: "john@mail.com", password: "123456"}}

```

The `login` method will get the mutation's parameters as arguments.

At this point, we can authenticate users. But, we can't check if the user is authenticated or not when the user refreshes the page or navigates to another page. We'll add the logic to the `check` method to solve this problem.

<br />

<details>
  <summary><strong>Can I pass any parameters to the <code>login</code> method?</strong></summary>

Yes, you can pass any parameters to the `login` method. `useLogin` hook's mutation will pass the mutation's parameters to the `login` method without any type constraints.

```ts
const { mutate } = useLogin<{
    username: string;
    password: string;
    foo: string;
    remember: boolean;
}>();
```

</details>

<details>
  <summary><strong>How can I redirect the user to a specific page after login?</strong></summary>

If you want to redirect the user to a specific page, you can resolve the Promise with an object that has `redirectTo` property.

```ts
const authProvider: AuthBindings = {
    // ---
    login: () => {
        // ---
        if (user) {
            return Promise.resolve({
                success: true,
                redirectTo: "/custom-page",
            });
        } else {
            return Promise.resolve({
                success: false,
                redirectTo: "/register",
            });
        }
    },
};
```

Also, you can use the `useLogin` hook's for this purpose.

```tsx
const { mutate } = useLogin();

mutate({ redirectPath: "/custom-page" });
```

Then, you can use the `redirectPath` parameter in the `login` method to redirect the user to the specific page.

```ts
const authProvider: AuthBindings = {
    // ---
    login: ({ redirectPath }) => {
        //---
        return Promise.resolve({
            success: false,
            redirectTo: redirectPath,
        });
    },
};
```

If you don't want to redirect the user anywhere, you can resolve the `login` method's Promise with `redirectTo: false`.

```ts
const authProvider: AuthBindings = {
    // ---
    login: () => {
        // ---
        return Promise.resolve({
            success: false,
            redirectTo: false,
        });
    },
};
```

</details>

<details>
  <summary><strong>How can I customize the error message?</strong></summary>

**refine** automatically displays an error notification when the `login` method resolves the Promise with `success: false`. If you want to customize the error message, you can resolve the Promise with an `error` object that has `name` and `message` properties.

```tsx title="src/authProvider.ts"
import { AuthBindings } from "@pankod/refine-core";

const authProvider: AuthBindings = {
    login: ({ email, password }) => {
        // ---
        return Promise.resolve({
            success: false,
            error: {
                name: "Login Failed!",
                message:
                    "The email or password that you've entered doesn't match any account.",
            },
        });
    },
    // ---
};
```

</details>

### check

`check` method is used to check if the user is authenticated. Internally, it is called when the user navigates to a page that requires authentication.

`check` method expects to return a resolved Promise with the following type:

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

In the `login` method, we've saved the user data to the local storage when the user logs in. So, we'll check if the user data exists in the local storage to determine if the user is authenticated.

```tsx title="src/authProvider.ts"
import { AuthBindings } from "@pankod/refine-core";

const authProvider: AuthBindings = {
    // ---
    check: () => {
        const user = localStorage.getItem("auth");

        if (user) {
            return Promise.resolve({
                authenticated: true,
            });
        }

        return Promise.resolve({
            authenticated: false,
            logout: true,
            redirectTo: "/login",
            error: new Error("User is not authenticated"),
        });
    },
    // ---
};
```

<br />

Invoking the `useIsAuthenticated` hook will call the `check` method. If `check` method resolves a data, it will be available in the `useIsAuthenticated` hook's `data` property.

[Refer to the `useIsAuthenticated` documentation for more information &#8594](/docs/api-reference/core/hooks/auth/useIsAuthenticated/)

```tsx
import { useIsAuthenticated } from "@pankod/refine-core";

const { data, isSuccess, isLoading, isError, refetch } = useIsAuthenticated();
```

:::tip

The `<Authenticated>` component makes use of the `useIsAuthenticated` hook. It allows you to render components only if the user is authenticated.

[Refer to the `<Authenticated>` documentation for more information &#8594](/docs/api-reference/core/components/auth/authenticated/)

:::

<br />

<details>
  <summary><strong>How can I redirect the user if the user is not authenticated?</strong></summary>

If you want to redirect the user to a specific page, you can resolve the Promise with an object that has `redirectTo` property.

```ts
const authProvider: AuthBindings = {
    // ---
    check: () => {
        // ---
        return Promise.resolve({
            authenticated: false,
            redirectTo: "/custom-page",
        });
    },
};
```

</details>

### logout

`logout` method is used to log out users. It expects to return a resolved Promise with the following type:

```ts
type AuthActionResponse = {
    success: boolean;
    redirectTo?: string;
    error?: Error;
    [key: string]: unknown;
};
```

-   `success`: Determines whether the operation is successful or not.
-   `redirectTo`: The path of the page that the user will be redirected to after the operation is completed.
-   `error`: An object containing details about any errors encountered during the operation.
-   `[key: string]`: Any additional data you wish to include in the response, keyed by a string identifier.

In the `login` method, we've saved the user data to the local storage when the user logs in. So, we'll remove the user data from the local storage when the user logs out.

```tsx title="src/authProvider.ts"
import { AuthBindings } from "@pankod/refine-core";

const authProvider: AuthBindings = {
    // ---
    logout: () => {
        localStorage.removeItem("auth");
        return Promise.resolve({
            success: true,
            redirectTo: "/login",
        });
    },
    // ---
};
```

<br />

Invoking the `useLogout` hook's mutation will call the `logout` method. If you need to pass any parameters to the `logout` method, you can use the `useLogout` hook's mutation.

[Refer to the `useLogout` documentation for more information &#8594](/docs/api-reference/core/hooks/auth/useLogout/)

For example, if we call the `useLogout` hook's mutation like this:

```tsx
import { useLogout } from "@pankod/refine-core";

const { mutate } = useLogout();

mutate({ id: "1" });
```

The `logout` method will get the mutation's parameters as an argument.

<br />

<details>
  <summary><strong>Can I pass any parameters to the <code>logout</code> method?</strong></summary>

Yes, you can pass any parameters to the `logout` method. `useLogout` hook's mutation will pass the mutation's parameters to the `login` method without any type constraints.

```ts
const { mutate } = useLogin<{
    id: string;
    name: string;
}>();
```

</details>

<details>
  <summary><strong>How can I redirect the user to a specific page after logout?</strong></summary>

If you want to redirect the user to a specific page, you can resolve the Promise with an object that has `redirectTo` property.

```ts
const authProvider: AuthBindings = {
    // ---
    logout: () => {
        // ---
        return Promise.resolve({
            success: true,
            redirectTo: "/login",
        });
    },
};
```

Also, you can use the `useLogout` hook for this purpose.

```tsx
const { mutate } = useLogout();

mutate({ redirectPath: "/custom-page" });
```

Then, you can use the `redirectPath` parameter in the `logout` method to redirect the user to the specific page.

```ts
const authProvider: AuthBindings = {
    // ---
    logout: ({ redirectPath }) => {
        // ---
        return Promise.resolve({
            success: true,
            redirectTo: redirectPath,
        });
    },
};
```

If you don't want to redirect the user to anywhere, you can resolve the `logout` method's Promise with `redirectTo: false`.

```ts
const authProvider: AuthBindings = {
    // ---
    logout: () => {
        // ---
        return Promise.resolve({
            success: true,
            redirectTo: "/false",
        });
    },
};
```

</details>

<details>
  <summary><strong>How can I customize the error message?</strong></summary>

**refine** automatically displays an error notification when the `logout` method resolves the Promise with `success: false`. If you want to customize the error message, you can resolve the Promise with an `error` object that has `name` and `message` properties.

```tsx title="src/authProvider.ts"
import { AuthBindings } from "@pankod/refine-core";

const authProvider: AuthBindings = {
    logout: () => {
        // ---
        return Promise.resolve({
            success: false,
            error: {
                name: "Logout Failed!",
                message: "Something went wrong.",
            },
        });
    },
    // ---
};
```

</details>

### onError

`onError` method is called when you get an error response from the API. You can create your own business logic to handle the error such as refreshing the token, logging out the user, etc.

`onError` method expects to return a Promise with the following type:

```ts
type OnErrorResponse = {
    redirectTo?: string;
    logout?: boolean;
    error?: Error;
};
```

-   `redirectTo`: If has a value, the app will be redirected to the given URL.
-   `logout`: If is `true`, useOnError calls the `logout` method.
-   `error`: An Error object representing any errors that may have occurred during the operation.

We'll use the `onError` method to log out the user if the API returns a `401` or `403` error. If `redirectTo` is set, `logout` method will be called with the `redirectTo` value.

```tsx title="src/authProvider.ts"
import { AuthBindings } from "@pankod/refine-core";

const authProvider: AuthBindings = {
    // ---
    onError: (error) => {
        if (error.status === 401 || error.status === 403) {
            return Promise.resolve({
                logout: true,
                redirectTo: "/login",
                error,
            });
        }

        return Promise.resolve();
    },
    // ---
};
```

<br />

Invoking the `useOnError` hook's mutation will call the `onError` method, passing in the mutation's parameters as arguments.

[Refer to the `useOnError` documentation for more information &#8594](/docs/api-reference/core/hooks/auth/useOnError/)

For example, if you want to check the error of a fetch request, you can use the `useOnError` hook's mutation like this:

```tsx
import { useOnError } from "@pankod/refine-core";

const { mutate } = useOnError();

fetch("http://example.com/payment")
    .then(() => console.log("Success"))
    .catch((error) => mutate(error));
```

<br />

<details>
  <summary><strong>How can I redirect the user to a specific page after logout?</strong></summary>

If you want to redirect the user to a specific page, you can resolve the Promise with an object that has `redirectTo` property.

```ts
const authProvider: AuthBindings = {
    // ---
    onError: (error) => {
        if (error.status === 401 || error.status === 403) {
            return Promise.resolve({
                redirectTo: "/custom-page",
            });
        }

        return Promise.resolve();
    },
    // ---
};
```

</details>

## Optional Methods

### getPermissions

`getPermissions` method is used to get the user's permissions. It expects to return a resolved Promise.

-   If the Promise resolves with data, the user's permissions will be available in the `usePermissions` hook's `data` property.

We'll use the `getPermissions` method to get the user's permissions from the `localStorage`.

```tsx title="src/authProvider.ts"
import { AuthBindings } from "@pankod/refine-core";

const mockUsers = [
    { email: "john@mail.com", roles: ["admin"] },
    { email: "jane@mail.com", roles: ["editor"] },
];

const authProvider: AuthBindings = {
    // ---
    getPermissions: () => {
        const user = localStorage.getItem("auth");

        if (user) {
            const { roles } = JSON.parse(user);

            return Promise.resolve(roles);
        }

        return Promise.resolve(null);
    },
    // ---
};
```

<br />

Invoking the `usePermissions` hook will call the `getPermissions` method. If `getPermissions` method resolves a data, it will be available in the `usePermissions` hook's `data` property.

[Refer to the `usePermissions` documentation for more information &#8594](/docs/api-reference/core/hooks/auth/usePermissions/)

For example, if you want to check if the user has a specific permission, you can use the `usePermissions` hook like this:

```tsx
import { usePermissions } from "@pankod/refine-core";

const { data } = usePermissions();

if (data?.includes("admin")) {
    console.log("User has admin permissions");
}
```

<br />

:::info
`usePermissions` hook can be used for simply authorization purposes. If you need more complex authorization logic, we recommend using the access control provider to handle the authorization logic.

[Refer to the `accessControlProvider` documentation for more information &#8594](docs/api-reference/core/providers/accessControl-provider/)
:::

### getIdentity

`getIdentity` method is used to get the user's identity. It expects to return a resolved Promise.

-   If the Promise resolves with data, the user's identity will be available in the `useGetIdentity` hook's `data` property.

We'll get the user's identity from the local storage and resolve the Promise.

```tsx title="src/authProvider.ts"
import { AuthBindings } from "@pankod/refine-core";

const mockUsers = [
    { email: "john@mail.com", roles: ["admin"] },
    { email: "jane@mail.com", roles: ["editor"] },
];

const authProvider: AuthBindings = {
    // ---
    getIdentity: () => {
        const user = localStorage.getItem("auth");

        if (user) {
            const { email, roles } = JSON.parse(user);

            return Promise.resolve({ email, roles });
        }

        return Promise.resolve(null);
    },
    // ---
};
```

<br />

Invoking the `useGetIdentity` hook will call the `getIdentity` method. If `getIdentity` method resolves a data, it will be available in the `useGetIdentity` hook's `data` property.

[Refer to the `useGetIdentity` documentation for more information &#8594](/docs/api-reference/core/hooks/auth/useGetIdentity/)

For example, if you want to get the user's email, you can use the `useGetIdentity` hook like this:

```tsx
import { useGetIdentity } from "@pankod/refine-core";

const { data } = useGetIdentity();

if (data) {
    console.log(data.email);
}
```

:::info

Depending on the UI framework you use, if you resolve `name` and `avatar` properties in the `getIdentity` method, the user's name and avatar will be shown in the header in the default layout.

```ts
const authProvider: AuthBindings = {
    // ---
    getIdentity: () => {
        const user = localStorage.getItem("auth");

        if (user) {
            const { email, roles } = JSON.parse(user);

            return Promise.resolve({
                email,
                roles,
                // highlight-start
                name: "John Doe",
                avatar: "https://i.pravatar.cc/300",
                // highlight-end
            });
        }

        return Promise.resolve(null);
    },
    // ---
};
```

:::

### register

`register` method is used to register a new user. It is similar to the `login` method. It expects to return a resolved Promise with the following type:

```ts
type RegisterResponse = {
    success: boolean;
    redirectTo?: string;
    error?: Error;
    [key: string]: unknown;
};
```

-   `success`: Determines whether the operation is successful or not.
-   `redirectTo`: The path of the page that the user will be redirected to after the operation is completed.
-   `error`: An object containing details about any errors encountered during the operation.
-   `[key: string]`: Any additional data you wish to include in the response, keyed by a string identifier.

We'll register a new user and resolve the Promise.

```tsx title="src/authProvider.ts"
import { AuthBindings } from "@pankod/refine-core";

const mockUsers = [{ email: "john@mail.com" }, { email: "jane@mail.com" }];

const authProvider: AuthBindings = {
    // ---
    register: ({ email }) => {
        const user = mockUsers.find((user) => user.email === email);

        if (user) {
            return Promise.resolve({
                success: false,
                error: {
                    name: "Register Error",
                    message: "User already exists",
                },
            });
        }

        mockUsers.push({ email });

        return Promise.resolve({
            success: true,
            redirectTo: "/login",
        });
    },
    // ---
};
```

<br />

Invoking the `useRegister` hook's mutation will call the `register` method, passing in the mutation's parameters as arguments.

[Refer to the `useRegister` documentation for more information &#8594](/docs/api-reference/core/hooks/auth/useRegister/)

For example, if you want to register a new user, you can use the `useRegister` hook like this:

```tsx
import { useRegister } from "@pankod/refine-core";

const { mutate } = useRegister();

const handleRegister = (values) => {
    mutate(values);
};
```

The `register` method will get the mutation's parameters as arguments.

<br />

<details>
  <summary><strong>Can I pass any parameters to the <code>register</code> method?</strong></summary>

Yes, you can pass any parameters to the `register` method. `useRegister` hook's mutation will pass the mutation's parameters to the `register` method without any type constraints.

```ts
const { mutate } = useRegister<{
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    remember: boolean;
}>();
```

</details>

<details>
  <summary><strong>How can I redirect the user to a specific page after registration?</strong></summary>

If you want to redirect the user to a specific page, you can resolve the Promise with an object that has `redirectTo` property.

```ts
const authProvider: AuthBindings = {
    // ---
    register: () => {
        // ---
        return Promise.resolve({
            success: true, // or false
            redirectTo: "/custom-page",
        });
    },
};
```

Also, you can use the `useRegister` hook's for this purpose.

```tsx
const { mutate } = useRegister();

mutate({ redirectPath: "/custom-page" });
```

Then, you can use the `redirectPath` parameter in the `register` method to redirect the user to the specific page.

```ts
const authProvider: AuthBindings = {
    // ---
    register: ({ redirectPath }) => {
        // ---
        return Promise.resolve({
            success: true, // or false
            redirectTo: redirectPath,
        });
    },
};
```

If you don't want to redirect the user to anywhere, you can resolve the `register` method's Promise with `redirectTo: false`.

```ts
const authProvider: AuthBindings = {
    // ---
    register: () => {
        // ---
        return Promise.resolve({
            success: true, // or false
            redirectTo: false,
        });
    },
};
```

</details>

<details>
  <summary><strong>How can I customize the error message?</strong></summary>

**refine** automatically displays an error notification when the `register` method resolves the Promise with `success: false`. If you want to customize the error message, you can resolve the Promise with an `error` object that has `name` and `message` properties.

```tsx title="src/authProvider.ts"
const authProvider: AuthBindings = {
    // ---
    register: () => {
        // ---
        return Promise.resolve({
            success: false,
            error: {
                name: "Error",
                message: "Something went wrong!",
            },
        });
    },
};
```

</details>

### forgotPassword

`forgotPassword` method is used to send a password reset link to the user's email address. It expects to return a resolved Promise with the following type:

```ts
type AuthActionResponse = {
    success: boolean;
    redirectTo?: string;
    error?: Error;
    [key: string]: unknown;
};
```

-   `success`: Determines whether the operation is successful or not.
-   `redirectTo`: The path of the page that the user will be redirected to after the operation is completed.
-   `error`: An object containing details about any errors encountered during the operation.
-   `[key: string]`: Any additional data you wish to include in the response, keyed by a string identifier.

We'll show how to send a password reset link to the user's email address and resolve the Promise.

```tsx title="src/authProvider.ts"
import { AuthBindings } from "@pankod/refine-core";

const authProvider: AuthBindings = {
    // ---
    forgotPassword: ({ email }) => {
        // send password reset link to the user's email address here

        // if request is successful
        return Promise.resolve({
            success: true,
            redirectTo: "/login",
        });

        // if request is not successful
        return Promise.resolve({
            success: false,
            error: {
                name: "Forgot Password Error",
                message: "Email address does not exist",
            },
        });
    },
    // ---
};
```

<br />

Invoking the `useForgotPassword` hook's mutation will call the `forgotPassword` method, passing in the mutation's parameters as arguments.

[Refer to the `useForgotPassword` documentation for more information &#8594](/docs/api-reference/core/hooks/auth/useForgotPassword/)

For example, if you want to send a password reset link to the user's email address, you can use the `useForgotPassword` hook like this:

```tsx
import { useForgotPassword } from "@pankod/refine-core";

const { mutate } = useForgotPassword();

const handleForgotPassword = (values) => {
    mutate(values);
};
```

The `forgotPassword` method will get the mutation's parameters as arguments.

<br />

<details>
  <summary><strong>Can I pass any parameters to the <code>forgotPassword</code> method?</strong></summary>

Yes, you can pass any parameters to the `forgotPassword` method. `useForgotPassword` hook's mutation will pass the mutation's parameters to the `forgotPassword` method without any type constraints.

```ts
const { mutate } = useForgotPassword<{
    email: string;
}>();
```

</details>

<details>
  <summary><strong>How can I redirect the user to a specific page after sending the password reset link?</strong></summary>

If you want to redirect the user to a specific page, you can resolve the `forgotPassword` method's Promise with the path of the page.

```ts
const authProvider: AuthBindings = {
    // ---
    forgotPassword: () => {
        // ---
        return Promise.resolve({
            success: true,
            redirectTo: "/login",
        });
    },
};
```

Also, you can use the `useForgotPassword` hook's for this purpose.

```ts
const { mutate } = useForgotPassword();

useForgotPassword({ redirectPath: "/custom-page" });
```

Then, you can use the `redirectPath` parameter in the `forgotPassword` method to redirect the user to the specific page.

```ts
const authProvider: AuthBindings = {
    // ---
    forgotPassword: ({ redirectPath }) => {
        // ---
        return Promise.resolve({
            success: true,
            redirectTo: redirectPath,
        });
    },
};
```

</details>

<details>
  <summary><strong>How can I customize the error message?</strong></summary>

**refine** automatically displays an error notification when the `forgotPassword` method resolves the Promise with `success: false`. If you want to customize the error message, you can resolve the Promise with an object that has `name` and `message` properties.

```tsx title="src/authProvider.ts"
const authProvider: AuthBindings = {
    // ---
    forgotPassword: () => {
        // ---
        return Promise.resolve({
            success: false,
            error: {
                name: "Error",
                message: "Something went wrong!",
            },
        });
    },
};
```

</details>

### updatePassword

`updatePassword` method is used to update the user's password. It expects to return a resolved Promise with the following type:

```ts
type AuthActionResponse = {
    success: boolean;
    redirectTo?: string;
    error?: Error;
    [key: string]: unknown;
};
```

-   `success`: Determines whether the operation is successful or not.
-   `redirectTo`: The path of the page that the user will be redirected to after the operation is completed.
-   `error`: An object containing details about any errors encountered during the operation.
-   `[key: string]`: Any additional data you wish to include in the response, keyed by a string identifier.

We'll show how to update the user's password and resolve the Promise.

```tsx title="src/authProvider.ts"
import { AuthBindings } from "@pankod/refine-core";

const authProvider: AuthBindings = {
    // ---
    updatePassword: ({ password }) => {
        // update the user's password here

        // if request is successful
        return Promise.resolve({
            success: true,
            redirectTo: "/login",
        });

        // if request is not successful
        return Promise.resolve({
            success: false,
            error: {
                name: "Forgot Password Error",
                message: "Email address does not exist",
            },
        });
    },
    // ---
};
```

<br />

Invoking the `useUpdatePassword` hook's mutation will call the `updatePassword` method, passing in the mutation's parameters as arguments. Additionally, the `updatePassword` method will take query parameters as arguments from the URL as well.

[Refer to the `useUpdatePassword` documentation for more information &#8594](/docs/api-reference/core/hooks/auth/useUpdatePassword/)

For example, if you want to update the user's password, you can use the `useUpdatePassword` hook like this:

```tsx
import { useUpdatePassword } from "@pankod/refine-core";

const { mutate } = useUpdatePassword();

const handleUpdatePassword = ({ password, confirmPassword }) => {
    mutate({ password, confirmPassword }});
};
```

If we assume that the URL is `http://localhost:3000/reset-password?token=123`, the `updatePassword` method will get the mutation's parameters as arguments and `token` query parameter as well.

```ts
const authProvider: AuthBindings = {
    // ---
    updatePassword: ({ password, confirmPassword, token }) => {
        console.log(token); // 123

        // if request is successful
        return Promise.resolve({
            success: true,
            redirectTo: "/login",
        });
    },
};
```

<br />

<details>
  <summary><strong>Can I pass any parameters to the <code>updatePassword</code> method?</strong></summary>

Yes, you can pass any parameters to the `updatePassword` method. `useUpdatePassword` hook's mutation will pass the mutation's parameters to the `updatePassword` method without any type constraints.

```ts
const { mutate } = useUpdatePassword<{
    password: string;
    newPassword: string;
}>();
```

</details>

<details>
  <summary><strong>How can I redirect the user to a specific page after updating the password?</strong></summary>

If you want to redirect the user to a specific page, you can resolve the Promise with an object that has `redirectTo` property.

```ts
const authProvider: AuthBindings = {
    // ---
    updatePassword: () => {
        // ---
        return Promise.resolve({
            success: true,
            redirectTo: "/login",
        });
    },
};
```

Also, you can use the `useUpdatePassword` hook's for this purpose.

```ts
const { mutate } = useUpdatePassword();

useUpdatePassword({ redirectPath: "/custom-page" });
```

Then, you can use the `redirectPath` parameter in the `updatePassword` method to redirect the user to the specific page.

```ts
const authProvider: AuthBindings = {
    // ---
    updatePassword: ({ redirectPath }) => {
        // ---
        return Promise.resolve({
            success: true,
            redirectTo: redirectPath,
        });
    },
};
```

</details>

<details>
  <summary><strong>How can I customize the error message?</strong></summary>

**refine** automatically displays an error notification when the `updatePassword` method resolves the Promise with `success: false`. If you want to customize the error message, you can resolve the Promise with an `error` object that has `name` and `message` properties.

```tsx title="src/authProvider.ts"
const authProvider: AuthBindings = {
    // ---
    updatePassword: () => {
        // ---
        return Promise.resolve({
            success: false,
            error: {
                name: "Error",
                message: "Something went wrong!",
            },
        });
    },
};
```

</details>

## Setting Authorization Credentials

After a user logs in, you can save the user's authorization credentials (such as a token) to the browser's `localStorage` or `sessionStorage`. This allows you to include the credentials in API calls by configuring the `dataProvider`.

Here's an example using `axios` and the `localStorage` to add a token acquired from the `login` method to the `Authorization` header of API calls.

```tsx title="App.tsx"
// ---
import { AuthBindings } from "@pankod/refine-core";
// highlight-next-line
import axios from "axios";

// highlight-next-line
const axiosInstance = axios.create();

const mockUsers = [
    { username: "admin", token: "123" },
    { username: "editor", token: "321" },
];

const App = () => {
    const authProvider: AuthBindings = {
        login: ({ username, password }) => {
            // Suppose we actually send a request to the back end here.
            const user = mockUsers.find((item) => item.username === username);

            if (user) {
                localStorage.setItem("auth", JSON.stringify(user));
                // This sets the authorization headers on Axios instance
                // highlight-start
                axiosInstance.defaults.headers.common = {
                    Authorization: `Bearer ${user.token}`,
                };
                // highlight-end

                return Promise.resolve({
                    redirectTo: "/",
                    success: true,
                });
            }
            return Promise.resolve({
                success: false,
                error: {
                    name: "Login Error",
                    message: "Username or password is incorrect",
                },
            });
        },
        // ---
    };

    return (
        <Refine
            authProvider={authProvider}
            routerProvider={routerProvider}
            // In order to use the axios instance, we need to pass it to the dataProvider
            // highlight-next-line
            dataProvider={dataProvider(API_URL, axiosInstance)}
        />
    );
};
```

:::note
We recommend using **axios** as the **HTTP** client with the **@pankod/refine-simple-rest** [`dataProvider`](/api-reference/core/providers/data-provider.md). Other **HTTP** clients can also be preferred.
:::

<br />

You can also use `axios.interceptors.request.use` to add the token acquired from the `login` method to the `Authorization` header of API calls. It is similar to the above example, but it is more flexible for more complex use cases such as refreshing tokens when they expire.

[Refer to the axios documentation for more information about interceptors &#8594](https://axios-http.com/docs/interceptors)

```tsx title="App.tsx"
// ---
import { AuthBindings } from "@pankod/refine-core";
// highlight-next-line
import axios, { AxiosRequestConfig } from "axios";

// highlight-next-line
const axiosInstance = axios.create();

// highlight-start
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
    // Retrieve the token from local storage
    const token = JSON.parse(localStorage.getItem("auth"));
    // Check if the header property exists
    if (request.headers) {
        // Set the Authorization header if it exists
        request.headers["Authorization"] = `Bearer ${token}`;
    } else {
        // Create the headers property if it does not exist
        request.headers = {
            Authorization: `Bearer ${token}`,
        };
    }

    return request;
});
// highlight-end

const mockUsers = [
    { username: "admin", token: "123" },
    { username: "editor", token: "321" },
];

const App = () => {
    const authProvider: AuthBindings = {
        //highlight-start
        login: ({ username, password }) => {
            // Suppose we actually send a request to the back end here.
            const user = mockUsers.find((item) => item.username === username);

            if (user) {
                localStorage.setItem("auth", JSON.stringify(user));
                return Promise.resolve({
                    redirectTo: "/",
                    success: true,
                });
            }
            return Promise.resolve({
                success: false,
                error: {
                    name: "Login Error",
                    message: "Username or password is incorrect",
                },
            });
        },
        //highlight-end
        // ---
    };

    return (
        <Refine
            authProvider={authProvider}
            routerProvider={routerProvider}
            //highlight-next-line
            dataProvider={dataProvider(API_URL, axiosInstance)}
        />
    );
};
```

<br />
<br />

<Checklist>

<ChecklistItem id="auth-provider-create-auth-provider">
I understood how to create a auth provider.
</ChecklistItem>

</Checklist>
