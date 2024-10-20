import type { DataFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { remotes } from "app/utils/remotes";
import Widget  from 'remoteApp/widget1';
import { useEffect } from "react";
import { fetchManifest, proxy, updateRoutes } from "../utils";

export function loader({ request }: DataFunctionArgs) {
  // Proxy loader requests to the remote app
  const response = proxy(remotes.remote1, request);
  if (response) return response;

  // Fetch the remote app's route manifest as this routes loader data
  // return fetchManifest(remotes.remote1);
  return {}
}

export function action({ request }: DataFunctionArgs) {
  // Proxy action requests to the remote app
  return proxy(remotes.remote1, request);
}

export default function Component() {
  const manifest = useLoaderData<typeof loader>();

  // Loads the remote app's route manifest and then revalidates
  // the router to rerender the current url with the new routes.
  // useEffect(() => {
  //   updateRoutes(manifest);
  // }, [manifest]);

  // return <div>Loading...</div>;
  return <Widget />;
}

export { ErrorBoundary } from "../components/ErrorBoundary";
