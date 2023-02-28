---
id: useBack
title: useBack 🆕
---

`useBack` is a hook that leverages the `back` method of the [`routerProvider`][routerprovider] to perform go back operation in the history stack.

## Basic Usage

```tsx
import { useBack } from "@pankod/refine-core";

const MyComponent = () => {
    const back = useBack();

    return (
        <Button onClick={() => back()}>
            Go Back
        </Button>
    );
};
```

[routerprovider]: /docs/api-reference/core/providers/router-provider.md

