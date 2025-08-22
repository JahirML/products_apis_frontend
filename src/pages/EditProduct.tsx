import {
  Form,
  Link,
  redirect,
  useActionData,
  useLoaderData,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import {
  addProduct,
  getProductById,
  updateProduct,
} from "../services/productService";
import type { Product } from "../types";
import ProductForm from "../components/ProductForm";

function EditProduct() {
  const error = useActionData() as string;
  const product = useLoaderData() as Product;

  const availabilityOptions = [
    { name: "Disponible", value: true },
    { name: "No Disponible", value: false },
  ];
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Editar Producto</h2>

        <Link
          to="/"
          className="rounded-md bg-indigo-600 p-3 font-bold text-white shadow-sm transition-all hover:bg-indigo-500"
        >
          Volver a productos
        </Link>
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form method="POST" className="mt-10">
        <ProductForm product={product} />
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="availability">
            Disponibilidad:
          </label>
          <select
            id="availability"
            name="availability"
            className="mt-2 block w-full bg-gray-50 p-3"
            defaultValue={product.availability.toString()}
          >
            {availabilityOptions.map((op) => (
              <option key={op.name} value={op.value.toString()}>
                {op.name}
              </option>
            ))}
          </select>
        </div>
        <input
          type="submit"
          className="mt-5 w-full cursor-pointer rounded bg-indigo-600 p-2 text-lg font-bold text-white"
          value="Editar Producto"
        />
      </Form>
    </>
  );
}

export async function loader({ params }: LoaderFunctionArgs) {
  if (params.id !== undefined) {
    const product = await getProductById(+params.id);
    if (!product) {
      //   throw new Response("", { status: 404, statusText: "No encontrado" });
      return redirect("/");
    } else return product;
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  let error = "";

  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
  }

  if (error.length) {
    return error;
  }
  if (params.id !== undefined) {
    await updateProduct(data, +params.id!);
    return redirect("/");
  }

  return null;
}
export default EditProduct;
