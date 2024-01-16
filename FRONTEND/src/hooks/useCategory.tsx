import { useMemo, useRef, useState } from "react";
import {
  addCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "@/services/api/categories";

import { toast } from "react-toastify";

export const useCategory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);

  // Utilizamos useMemo para memoizar la función que realiza la solicitud Axios
  const fetchData = useMemo(
    () => async () => {
      try {
        const response = await getAllCategory();
        setData(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const updateCategories = async (id: number, body: any) => {
    try {
      const response = await updateCategory(id, body);
      if (!response) {
        toast.warning("ERROR AL ACTUALIZAR CATEGORIA");
      } else {
        console.log("correcto");
        toast.success("SE ACTUALIZO EL CATEGORIA CORRECTAMENTE");
      }
      await fetchData();
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  /////createProduct
  const createCategories = async (body: any) => {
    try {
      const res = await addCategory(body);
      await fetchData();
      if (!res) {
        toast.warning("ERROR AL GUARDAR CATEGORIA");
      } else {
        console.log("correcto");
        toast.success("SE AGREGO EL CATEGORIA CORRECTAMENTE");
      }
      await fetchData();
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  ////delete
  const deleteCategories = async (id: number) => {
    try {
      const res = await deleteCategory(id);
      await fetchData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    setModal,
    modal,
    data,
    loading,
    fetchData,
    deleteCategories,
    updateCategories,
    createCategories,
  };
};
