---
id: auth-provider
title: Auth Provider
sidebar_label: Auth Provider
---

import AuthProviderExamplesLinks from "@site/src/partials/auth-provider-examples-links.md";

Auth provider is an object which contains methods to handle authentication and authorization in your app. It provides a way to authenticate users and authorize them to access resources. **refine** consumes these methods via auth hooks.

By default, **refine** doesn't handle authentication in the app. When you need, you can pass `authProvider` to the `<Refine>` component as a prop.

Auth provider's methods expect to return a resolved Promise. So, you can use async methods to create auth provider. Therefore, to create auth provider from scratch, you can use any third-party authentication service like [Auth0, Okta, etc.](#examples), or your own custom methods.

[Refer to the "Create Auth Provider From Scratch" tutorial for more information &#8594][create-auth-provider-tutorial]

## Usage

To use `authProvider` in **refine**, we have to pass the `authProvider` to the `<Refine />` component.

```tsx title="App.tsx"
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

// highlight-next-line
import authProvider from "./auth-provider";

const API_URL = "https://api.fake-rest.refine.dev";

const App = () => {
    return (
        <Refine
            // highlight-next-line
            authProvider={authProvider}
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
        />
    );
};
```

## Examples

<AuthProviderExamplesLinks/>

## Methods

Auth provider's methods are expected to return a resolved Promise. So, you can use these async methods to [create auth provider][create-auth-provider-tutorial].

An `authProvider` includes the following methods:

```tsx
import { AuthBindings } from "@pankod/refine-core";

export const authProvider: AuthBindings = {
    // required methods
    login: (params: any) => Promise.resolve(),
    check: (params: any) => Promise.resolve(),
    logout: (params: any) => Promise.resolve(),
    onError: (params: any) => Promise.resolve(),
    // optional methods
    register: (params: any) => Promise.resolve(),
    forgotPassword: (params: any) => Promise.resolve(),
    updatePassword: (params: any) => Promise.resolve(),
    getPermissions: (params=: any) => Promise.resolve(),
    getIdentity: (params?: any) => Promise.resolve(),
};
```

`login`, `logout`, `register`, `forgotPassword`, `updatePassword` expect to return a resolved Promise with the following type:

```ts
type AuthActionResponse = {
    success: boolean;
    redirectTo?: string;
    error?: Error;
    [key: string]: unknown;
};
```

-   `success`: A boolean indicating whether the operation was successful.
-   `redirectTo`: A string indicating the URL to redirect to after the operation completes.
-   `error`: An object containing details about any errors encountered during the operation.
-   `[key: string]`: Any additional data you wish to include in the response, keyed by a string identifier.

`check` expects to return a Promise with the following type:

```ts
type CheckResponse = {
    authenticated: boolean;
    redirectTo?: string;
    logout?: boolean;
    error?: Error;
};
```

-   `authenticated`: A boolean indicating whether the user is authenticated or not.
-   `redirectTo`: A string indicating the URL to redirect to after the operation completes.
-   `error`: An object containing details about any errors encountered during the operation.
-   `[key: string]`: Any additional data you wish to include in the response, keyed by a string identifier.

`getPermission` expects to return a Promise with the following type:

```ts
type PermissionResponse = unknown;
```

You can return any type of data from `getPermission` method.

`getIdentity` expects to return a Promise with the following type:

```ts
type IdentityResponse = unknown;
```

You can return any type of data from `getIdentity` method.

<br/>

:::info-tip

**refine** consumes these methods using [authorization hooks](#hooks-and-components).
Authorization hooks are used to manage authentication and authorization operations like login, logout, catching **HTTP** errors, etc.

:::

[Refer to the Auth Provider tutorial for more information and usage examples. &#8594][create-auth-provider-tutorial]

## Required Methods

### login <PropTag required />

`login` method is used to authenticate users.

You can use [`useLogin`][use-login] hook to call `login` method.

### check <PropTag required />

`check` method is used to check if the user is authenticated.

You can use [`useIsAuthenticated`][use-is-authenticated] hook to call `check` method.

### logout <PropTag required />

`logout` method is used to log out users.

You can use [`useLogout`][use-logout] hook to call `logout` method.

### onError <PropTag required />

`onError` method is called when you get an error response from the API. You can create your own business logic to handle the error such as refreshing the token, logging out the user, etc.

You can use [`useOnError`][use-on-error] hook to call `onError` method.

## Optional Methods

### getPermissions

`getPermissions` method is used to get the user's permissions.

You can use [`usePermissions`][use-permissions] hook to call `getPermissions` method.

### getIdentity

`getIdentity` method is used to get the user's identity.

You can use [`useGetIdentity`][use-get-identity] hook to call `getIdentity` method.

### register

`register` method is used to register a new user.

You can use [`useRegister`][use-register] hook to call `register` method.

### forgotPassword

`forgotPassword` method is used to send a password reset link to the user's email address.

You can use [`useForgotPassword`][use-forgot-password] hook to call `forgotPassword` method.

### updatePassword

`updatePassword` method is used to update the user's password.

You can use [`useUpdatePassword`][use-update-password] hook to call `updatePassword` method.

## Hooks and Components

These hooks can be used with the `authProvider` authentication and authorization operations.

-   [useIsAuthenticated][use-is-authenticated]
-   [useOnError][use-on-error]
-   [useGetIdentity][use-get-identity]
-   [useLogin][use-login]
-   [useLogout][use-logout]
-   [usePermissions][use-permissions]
-   [`<Authenticated />`][authenticated]
-   [useRegister][use-register]
-   [useForgotPassword][use-forgot-password]
-   [useUpdatePassword][use-update-password]

## FAQ

### How can I create authProvider?

[Refer to the "Create Auth Provider From Scratch" section in the tutorial for more information &#8594](/docs/tutorial/understanding-authprovider/create-authprovider/)

### How can I set authorization credentials?

[Refer to the "Setting Authorization Credentials" section in the tutorial for more information &#8594](/docs/tutorial/understanding-authprovider/create-authprovider/#setting-authorization-credentials)

## API Reference

### Properties

| Property                                          | Description                               | Resolve condition                     |
| ------------------------------------------------- | ----------------------------------------- | ------------------------------------- |
| login <div className=" required">Required</div>   | Logs user in                              | Auth confirms login                   |
| logout <div className=" required">Required</div>  | Logs user out                             | Auth confirms logout                  |
| check <div className=" required">Required</div>   | Checks credentials on each route changes  | Authentication still persist          |
| onError <div className=" required">Required</div> | Checks if a dataProvider returns an error | Data provider doesn't return an error |
| getPermissions                                    | Can be use to get user credentials        | Authorization roles accepted          |
| getIdentity                                       | Can be use to get user identity           | User identity available to return     |
| register                                          | Register user                             | Auth confirms register                |
| forgotPassword                                    | Can be use to get password reset          | Auth confirms forgot password         |
| updatePassword                                    | Can be use to get update password         | Auth confirms update password         |

<br />

## Example

<CodeSandboxExample path="auth-antd" />

[use-login]: /docs/api-reference/core/hooks/auth/useLogin/
[use-logout]: /docs/api-reference/core/hooks/auth/useLogout/
[use-is-authenticated]: /docs/api-reference/core/hooks/auth/useIsAuthenticated/
[use-on-error]: /docs/api-reference/core/hooks/auth/useOnError/
[use-get-identity]: /docs/api-reference/core/hooks/auth/useGetIdentity/
[use-permissions]: /docs/api-reference/core/hooks/auth/usePermissions/
[authenticated]: /docs/api-reference/core/components/auth/authenticated/
[use-register]: /docs/api-reference/core/hooks/auth/useRegister/
[use-forgot-password]: /docs/api-reference/core/hooks/auth/useForgotPassword/
[use-update-password]: /docs/api-reference/core/hooks/auth/useUpdatePassword/
[create-auth-provider-tutorial]: /docs/tutorial/understanding-authprovider/create-authprovider
