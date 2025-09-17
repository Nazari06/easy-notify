# easy-notify

Lightweight React / Next.js notification library with:
- Toasts (icons, close button, progress bar)
- Alert dialog
- Confirm dialog
- Bounce animations

Install
```bash
npm install easy-notify lucide-react
# or
yarn add easy-notify lucide-react
#install tailwindcss
npm install tailwindcss
```

Quick usage (Next.js App Router)
```tsx
// app/layout.tsx
import { NotifyProvider } from "easy-notify";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <NotifyProvider>{children}</NotifyProvider>
      </body>
    </html>
  );
}
```

Consume in a client component
```tsx
"use client";
import { useNotify } from "easy-notify";

export default function Page() {
  const { showToast, showAlert, showConfirm } = useNotify();

  return (
    <>
      <button onClick={() => showToast("Saved!", { type: "success", duration: 4000 })}>Toast</button>
      <button onClick={() => showAlert("Hello world")}>Alert</button>
      <button onClick={() => showConfirm({ message: "Delete item?", onConfirm: () => console.log("ok") })}>Confirm</button>
    </>
  );
}
```

Notes for Next.js / SSR
- Wrap your app at the top layout with `NotifyProvider`.
- Only call `useNotify()` inside client components (`"use client"`).
- `lucide-react` is a peer dependency; ensure it's installed in consumer app.

API
- showToast(payload: string | { message, type?, duration? })
- closeToast()
- showAlert(payload: string | { message, onClose? })
- showConfirm(payload: string | { message, onConfirm?, onCancel? })

Building & Publishing
- Build with: `npm run build` (ensure tsup/typescript are dev deps)
- Pack: `npm pack`
- Test install in a project via `npm install /path/to/easy-notify-1.0.0.tgz`

License: MIT
