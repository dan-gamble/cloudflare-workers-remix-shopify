import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { servePublicPathFromStorage } from "~/utils/storage.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const { pathname } = new URL(request.url);

  return servePublicPathFromStorage(pathname);
}
