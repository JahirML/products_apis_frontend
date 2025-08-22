import {
  Form,
  redirect,
  useFetcher,
  useNavigate,
  type ActionFunctionArgs,
} from "react-router-dom";
import type { Product } from "../types";
import { formatCurrency } from "../utils";
import { deleteProduct } from "../services/productService";

type ProductDetailsProp = {
  product: Product;
};

function ProductItem({ product }: ProductDetailsProp) {
  const { id, name, price, availability } = product;
  const navigate = useNavigate();
  const isAvailable = availability;
  const fetcher = useFetcher();

  return (
    <tr className="border-b">
      <td className="p-3 text-lg text-gray-800">{name}</td>
      <td className="p-3 text-lg text-gray-800">{formatCurrency(price)}</td>
      <td className="p-3 text-lg text-gray-800">
        <fetcher.Form method="post">
          <button
            type="submit"
            name="id"
            value={product.id}
            className={`${isAvailable ? "text-black" : "text-red-600"} border-black-100 hover: s w-full cursor-pointer rounded-lg border p-2 text-sm font-bold`}
          >
            {isAvailable ? "Disponible" : "No disponible"}
          </button>
          {/* <input type="hidden" name="id" value={product.id} /> */}
        </fetcher.Form>
      </td>
      <td className="p-3 text-lg text-gray-800">
        <div className="flex items-center gap-2">
          <button
            className="w-full rounded-lg bg-indigo-600 p-2 text-xs font-bold text-white uppercase"
            // to={`productos/${id}/editar`}
            onClick={() => navigate(`productos/${id}/editar`)}
          >
            Editar
          </button>
          <Form
            className="w-full"
            method="POST"
            action={`productos/${id}/eliminar`}
            onSubmit={(e) => {
              if (!confirm("¿Eliminar?")) {
                e.preventDefault();
              }
            }}
          >
            <input
              type="submit"
              className="w-full rounded-lg bg-red-600 p-2 text-xs font-bold text-white uppercase"
              value="eliminar"
            />
          </Form>
        </div>
      </td>
    </tr>
  );
}

export async function action({ params }: ActionFunctionArgs) {
  // console.log("desde delete action");
  if (params.id !== undefined) {
    await deleteProduct(+params.id!);
    return redirect("/");
  }
}

export default ProductItem;
