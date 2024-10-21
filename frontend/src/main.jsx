import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { Login, Register } from "./components/index.js";
import { Provider } from "react-redux";
import store from "./app/store.js";
import DashboardMain from "./components/Dashboard/DashboardMain.jsx";

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
      {
        path: "/dashboard",
        element: (
          // <AuthLayout authentication={false}>
            <DashboardMain />
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
