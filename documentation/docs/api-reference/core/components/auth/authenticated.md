---
id: authenticated
title: <Authenticated>
---

`<Authenticated>` is the component form of [`useAuthenticated`][useauthenticated].

It internally uses [`useAuthenticated`][useauthenticated]'s return values (`isSuccess`, `isLoading`, and, `isError`) to provide its functionality.

When:

-   `isSuccess` is `true`, it renders to children.
-   `isLoading` is `true`, it renders [`loading`](#loading) prop.
-   `isError` is `true`, it renders [`fallback`](#fallback) prop if provided. Otherwise, it redirects to `/login` page.

## Basic Usage

```tsx
import { Authenticated } from "@pankod/refine-core";

const MyPage = () => (
    <Authenticated>
        <YourComponent />
    </Authenticated>
);
```

> Refer to [Custom Pages Example][custom pages example] and [it's explanation][custom pages explanation] to learn how to use it with custom pages. &#8594

## Properties

### `redirectOnFail`

The path to redirect to if the user is not logged in. If left empty, the user will be redirected to the `redirectTo` property of the `check` function of the `AuthProvider`.

:::info

This property only works if the `fallback` prop is not provided.

:::

### `appendCurrentPathToQuery`

If `true`, the current path will be appended to the `to` query parameter. This is useful when you want to redirect the user to the page they were trying to access after they log in.

### `fallback`

Component to render if the user is not logged in. If `undefined`, the page will be redirected to `/login`.

```tsx
<Authenticated fallback={<div>You cannot access this section</div>}>
    <YourComponent />
</Authenticated>
```

### `loading`

Component to render while checking whether the user is logged in.

```tsx
<Authenticated loading={<div>loading...</div>}>
    <YourComponent />
</Authenticated>
```

## API Reference

### Properties

<PropsTable module="@pankod/refine-core/Authenticated"/>

| Property                 | Description                                                                                                                                                                           | Type                 | Default |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------- |
| redirectOnFail           | The path to redirect to if the user is not logged in. If left empty, the user will be redirected to the `redirectTo` property of the `check` function of the `AuthProvider`.          | `string     \| true` | `true`  |
| appendCurrentPathToQuery | If `true`, the current path will be appended to the `to` query parameter. This is useful when you want to redirect the user to the page they were trying to access after they log in. | `boolean`            | `true`  |
| fallback                 | Component to render if the user is not logged in. If `undefined`, the page will be redirected to `/login`                                                                             | `ReactNode`          |         |
| loading                  | Component to render while checking whether user is logged in                                                                                                                          | `ReactNode`          |         |

[useauthenticated]: /api-reference/core/hooks/auth/useAuthenticated.md
[custom pages explanation]: /advanced-tutorials/custom-pages.md#authenticated-custom-pages
[custom pages example]: /examples/custom-pages.md
