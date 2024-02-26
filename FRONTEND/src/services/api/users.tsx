import axios from "axios";
import endPoints from "@/services/api";
import { LoginUserInterface, UserInterface } from "@/interfaces/UserInterface";

/////funcion agregar producto
const addUser = async (body: UserInterface) => {
  const config = {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios.post(endPoints.auth.register, body, config);
    return response.data;
  } catch (err) {
    return console.error(err);
  }
};

/////add imagen
const addImagenUser = async (formData: any) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    const response = await axios.post(
      endPoints.files.addImage,
      formData,
      config
    );
    return response.data;
  } catch (err) {
    return console.error(err);
  }
};

/////funcion editar producto
const updateUs = async (id: number, body: UserInterface) => {
  const config = {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios.patch(
      endPoints.auth.updateUser(id),
      body,
      config
    );

    return response.data;
  } catch (err) {
    return console.error(err);
  }
};

/////funcion eliminar producto
/* const deleteUser = async (id: number) => {
  try {
    const response = await axios.delete(endPoints.products.deleteProducts(id));
    return response.data;
  } catch (err) {
    return console.error(err);
  }
}; */

const getUser = async (id: number) => {
  try {
    const response = await axios.get(endPoints.auth.GetUser(id));
    return response.data;
  } catch (err) {
    return console.error(err);
  }
};

const loginService = async (body: LoginUserInterface) => {
  const config = {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios.post(endPoints.auth.login, body, config);
    return response.data;
  } catch (err) {
    return console.error(err);
  }
};

export { addUser, addImagenUser, updateUs, getUser, loginService };
