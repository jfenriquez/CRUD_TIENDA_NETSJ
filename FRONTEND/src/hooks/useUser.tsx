import { useEffect, useMemo, useRef, useState } from "react";
import {
  addUser,
  addImagenUser,
  //deleteUser,
  updateUs,
  getUser,
  loginService,
} from "@/services/api/users";

import { toast } from "react-toastify";

import { useRouter } from "next/navigation";

export const useUser = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const router = useRouter();

  const fetchData = async (id: number) => {
    try {
      const response = await getUser(id);
      setData(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  ///update
  const updateUser = async (id: number, body: any) => {
    try {
      const response = await updateUs(id, body);
      if (!response) {
        toast.warning("ERROR AL ACTUALIZAR USER");
      } else {
        console.log("correcto");
        toast.success("SE ACTUALIZO EL USER CORRECTAMENTE");
      }
      fetchData(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (body: any) => {
    try {
      const response = await loginService(body);
      if (!response) {
        toast.warning("ERROR AL INICIAR SESSION ");
        console.log("error");
      } else {
        console.log("correcto");
        toast.success("SE LOGEO CORRECTAMENTE");
      }
      console.log("response", response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  /////createProduct
  const CreateUser = async (body: any) => {
    try {
      const res = await addUser(body);
      if (!res) {
        toast.warning(
          "ERROR AL GUARDAR USER , EMAIL O TELEFONO YA ESTA REGISTRADO"
        );
      } else {
        console.log("correcto");
        toast.success("SE REGISTRO EL USER CORRECTAMENTE");
        router.push("/login");
      }

      return res;
    } catch (error) {
      console.log(error);
    }
  };

  ////delete
  /* const deleteUs = async (id: number) => {
    try {
      const response = await deleteUser(id);

      if (!response) {
        toast.warning("ERROR AL ELIMINAR USER");
      } else {
        console.log("correcto", response);
        setData(response);
        await toast.success("SE ELIMINO CORRECTAMENTE " + id);
      }
    } catch (error) {
      console.log(error);
    }
}//*/

  return {
    setModal,
    modal,
    data,
    loading,
    setLoading,
    fetchData,
    updateUser,
    CreateUser,
    login,
  };
};
