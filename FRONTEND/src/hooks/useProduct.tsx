import axios from "axios";
import { useMemo, useRef, useState } from "react";
import {
  updateProduct,
  deleteP,
  addProduct,
  getAllProduct,
} from "@/services/api/products";
import { toast } from "react-toastify";
import { create } from "domain";

export const useProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);

  // Utilizamos useMemo para memoizar la función que realiza la solicitud Axios
  const fetchData = useMemo(
    () => async () => {
      try {
        const response = await getAllProduct();
        setData(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  ///update
  const updateProducts = async (id: number, body: any) => {
    try {
      const response = await updateProduct(id, body);
      if (!response) {
        toast.warning("ERROR AL ACTUALIZAR PRODUCTO");
      } else {
        console.log("correcto");
        toast.success("SE ACTUALIZO EL PRODUCTO CORRECTAMENTE");
      }
      await fetchData();
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  /////createProduct
  const createProduct = async (body: any) => {
    try {
      const res = await addProduct(body);
      await fetchData();
      if (!res) {
        toast.warning("ERROR AL GUARDAR PRODUCTO");
      } else {
        console.log("correcto");
        toast.success("SE AGREGO EL PRODUCTO CORRECTAMENTE");
      }
      await fetchData();
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  ////delete
  const deleteProduct = async (id: number) => {
    try {
      const res = await deleteP(id);
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
    deleteProduct,
    updateProducts,
    createProduct,
  };
};
