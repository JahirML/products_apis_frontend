import {
  Form,
  Link,
  redirect,
  useActionData,
  type ActionFunctionArgs,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/productService";
import ProductForm from "../components/ProductForm";

function NewProduct() {
  const error = useActionData() as string;

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">
          Registrar Producto
        </h2>

        <Link
          to="/"
          className="rounded-md bg-indigo-600 p-3 font-bold text-white shadow-sm transition-all hover:bg-indigo-500"
        >
          Volver a productos
        </Link>
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form method="POST" className="mt-10">
        <ProductForm />
        <input
          type="submit"
          className="mt-5 w-full cursor-pointer rounded bg-indigo-600 p-2 text-lg font-bold text-white"
          value="Registrar Producto"
        />
      </Form>
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  let error = "";

  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
  }

  if (error.length) {
    return error;
  }
  await addProduct(data);

  return redirect("/");
}
export default NewProduct;
