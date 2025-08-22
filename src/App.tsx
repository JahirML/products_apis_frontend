import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layouts/Layout";
import {
  action as updateAvailabilityAction,
  Product,
  loader as productLoader,
} from "./pages/Product";
import NewProduct, { action as newProductAction } from "./pages/NewProduct";
import EditProduct, {
  action as editAction,
  loader as editLoader,
} from "./pages/EditProduct";
import { action as deleteAction } from "./components/ProductItem";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Product />,
        loader: productLoader,
        action: updateAvailabilityAction,
      },
      {
        path: "new/product",
        element: <NewProduct />,
        action: newProductAction,
      },
      {
        path: "productos/:id/editar",
        element: <EditProduct />,
        loader: editLoader,
        action: editAction,
      },
      {
        path: "productos/:id/eliminar",
        // element :
        action: deleteAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
