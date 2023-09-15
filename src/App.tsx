import {
  BrowserRouter,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./layouts/Home";
import BrewerySingle from "./layouts/BrewerySingle";
import Layout from "./layouts/Layout";
import "./index.css";
import Error from "./layouts/Error";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "brewery/:id", element: <BrewerySingle /> },
      ],
      errorElement: <Error />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
