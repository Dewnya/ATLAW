// React ships its web-stream renderer as "react-dom/server.browser" but
// @types/react-dom only types it under "react-dom/server". Used by
// src/entry-server.tsx (build-time prerender).
declare module "react-dom/server.browser" {
  export { renderToReadableStream } from "react-dom/server";
}
