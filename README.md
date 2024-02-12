# Title: My-dictionary

## Types

I have set route-handler's return type on `src/types/routeReturnTypes.ts`.

```ts
import { NextResponse } from "next/server";

interface ReturnType {
  error: boolean | null;
  message: "ok" | string;
}

export type RouteReturnType = NextResponse<ReturnType>;
```

---

This is usable like this.

```ts
const POST = async (req: NextRequest): Promise<RouteReturnType> => {};
```

## What I did that I learned new

1. By setting the body height to 100dvh, the header and the footer will be always shown even on Safari or Android dynamic browsers.

### What to edit before promoting to the production

1. Supabase Auth setup -> SMTP Provider settings -> Minimum interval between emails being sent to 60 seconds.
