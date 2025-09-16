# easy-notify

React / Next.js notification provider: toasts (with progress + icon + close), alert and confirm dialogs with bounce animation.

## Install

npm:
```bash
npm install easy-notify lucide-react
```

yarn:
```bash
yarn add easy-notify lucide-react
```

## Usage

Wrap your app (e.g. in Next.js app/layout.js or _app.js):

```jsx
import { NotifyProvider } from "easy-notify";

export default function RootLayout({ children }) {
  return <NotifyProvider>{children}</NotifyProvider>;
}
```

Consume in components:

```jsx
import { useNotify } from "easy-notify";

export default function Example() {
  const { showToast, showAlert, showConfirm } = useNotify();

  return (
    <>
      <button onClick={() => showToast("Saved", "success", 4000)}>Toast</button>
      <button onClick={() => showAlert("Hello")}>Alert</button>
      <button onClick={() => showConfirm("Delete?", () => console.log("yes"), () => console.log("no"))}>Confirm</button>
    </>
  );
}
```

## Notes

- `react` is a peer dependency — ensure your app provides it.
- If you need TypeScript types, the package ships `.d.ts` if built with `--dts`.
