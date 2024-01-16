import { deleteCategory } from "./categories";

const API = process.env.NEXT_PUBLIC_API_URL;
const VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const endPoints = {
  auth: {
    login: `${API}/${VERSION}/auth/login`,
    profile: `${API}/${VERSION}/auth/profile`,
  },
  products: {
    getProduct: (id: number) => `${API}/${VERSION}/products/${id}`,
    allProducts: `${API}/${VERSION}/productos/`,
    getProducts: `${API}/${VERSION}/productos/`,
    addProduct: `${API}/${VERSION}/productos`,
    updateProducts: (id: number) => `${API}/${VERSION}/productos/${id}`,
    deleteProducts: (id: number) => `${API}/${VERSION}/productos/${id}`,
  },
  categories: {
    getCategoriesList: `${API}/${VERSION}/categorias/`,
    addCategory: `${API}/${VERSION}/categorias/`,
    getCategoryItems: (id: number) =>
      `${API}/${VERSION}/categorias/${id}/products/`,
    updateCategory: (id: number) => `${API}/${VERSION}/categorias/${id}/`,
    deleteCategory: (id: number) => `${API}/${VERSION}/categorias/${id}`,
  },
  order: {
    addOrder: `${API}/${VERSION}/files/upload/`,
    getProducts: (limit: number, offset: number) =>
      `${API}/${VERSION}/productos?limit=${limit}&offset=${offset}`,
  },
  files: {
    addImage: `${API}/${VERSION}/files/upload/`,
  },
};
export default endPoints;
