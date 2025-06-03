import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";

import { RouterProvider } from "react-router-dom";

import "./index.css";
import { router } from "./router/router";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./services/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* <FaviconManager /> */}
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </HelmetProvider>
  </StrictMode>
);
