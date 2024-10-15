import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { Login, Register } from "./components/index.js";
import { Provider } from "react-redux";
import store from "./app/store.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: (
          // <AuthLayout authentication={false}>/
            <Login />
          // </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          // <AuthLayout authentication={false}>
            <Register />
          // </AuthLayout>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
