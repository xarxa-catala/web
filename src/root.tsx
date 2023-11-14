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
  return (
    <Html lang="en" class="w-full h-full">
      <Head>
        <Title>{siteName}</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body class="bg-slate-900 w-full h-full text-white" classList={{ "overflow-hidden": isFullScreen() }}>
        <Suspense>
          <ErrorBoundary>
            <div class="flex flex-col h-full">
              <TopBar />
              <div class="flex-1">
                <Routes>
                  <FileRoutes />
                </Routes>
              </div>
              <Footer />
            </div>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
