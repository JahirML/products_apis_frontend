import { Link, useLoaderData, type ActionFunctionArgs } from "react-router-dom";
import { getProducts, updateAvailability } from "../services/productService";

import ProductItem from "../components/ProductItem";
import type { Product } from "../types";

export function Product() {
  const products = useLoaderData() as Product[];

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Productos</h2>
        <Link
          to="/new/product"
          className="rounded-md bg-indigo-600 p-3 font-bold text-white shadow-sm transition-all hover:bg-indigo-500"
        >
          Agregar producto
        </Link>
      </div>

      <div className="p-2">
        <table className="mt-5 w-full table-auto">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2">Producto</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Disponibilidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductItem product={product} key={product.id} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export async function loader() {
  const products = await getProducts();

  return products;
}

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  console.log(data);
  await updateAvailability(+data.id);

  return {};
}
// export default Product;
