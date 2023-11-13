// @refresh reload
import { Suspense, createSignal } from "solid-js";
import {
  useLocation,
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import { Footer } from "./components/Footer";
import { TopBar } from "./components/TopBar";
import { siteName } from "./config";
import "./root.css";

export const [isFullScreen, setFullScreen] = createSignal(false)

export default function Root() {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname
      ? "border-sky-600"
      : "border-transparent hover:border-sky-600";
  return (
    <Html lang="en">
      <Head>
        <Title>{siteName}</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body class="bg-slate-900" classList={{ "overflow-hidden": isFullScreen() }}>
        <Suspense>
          <ErrorBoundary>
            <TopBar />
            <Routes>
              <FileRoutes />
            </Routes>
            {/* <Footer /> */}
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
