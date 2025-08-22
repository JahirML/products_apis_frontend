import axios from "axios";
import {
  DraftProductSchema,
  ProductSchema,
  ProductsSchema,
  type Product,
} from "./../types/index";
import { safeParse } from "valibot";

type ProductType = {
  [k: string]: FormDataEntryValue;
};

export async function addProduct(data: ProductType) {
  try {
    const result = safeParse(DraftProductSchema, {
      ...data,
      price: +data.price,
    });
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products`;
      await axios.post(url, result.output);
    } else {
      throw new Error("Datos no validos");
    }
  } catch (err) {
    console.log(err);
  }
}

export async function getProducts() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products`;
    const { data } = await axios.get(url);
    const res = safeParse(ProductsSchema, data.data);

    if (res.success) return res.output;
    else throw new Error("Hubo un error");
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err;
  }
}

export async function getProductById(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    const { data } = await axios.get(url);

    const res = safeParse(ProductSchema, data.data);

    if (res.success) return res.output;
    else throw new Error("Hubo un error");
  } catch (err) {
    console.log(err);
  }
}

export async function updateProduct(data: ProductType, id: Product["id"]) {
  try {
    // const NumberSchema = coerce;

    console.log(data, id);
    const result = safeParse(ProductSchema, {
      id,
      name: data.name,
      price: +data.price,
      availability: data.availability === "true" ? true : false,
    });
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
      await axios.put(url, result.output);
    }
  } catch (err) {
    console.log(err);
  }
}

export async function deleteProduct(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    console.log(id);
    await axios.delete(url);
  } catch (err) {
    console.log(err);
  }
}

export async function updateAvailability(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.patch(url);
  } catch (err) {
    console.log(err);
  }
}
