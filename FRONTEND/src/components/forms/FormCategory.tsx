import React from "react";
import { CategoryInterface } from "../../interfaces/CategoryInterface";
import { ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCategory } from "@/hooks/useCategory";

const FormCategory = ({ data, onChange }: any) => {
  ////USECATEGORY
  const { updateCategories, createCategories, deleteCategories, fetchData } =
    useCategory();

  const handleClick = async () => {
    onChange(false);
  };

  const formik = useFormik({
    initialValues: initialValues(data), ///data
    validationSchema: Yup.object(validationSchema()), //validacion
    onSubmit: async (formData) => {
      data
        ? await updateCategories(data.id, formData)
        : await createCategories(formData);
      handleClick();
    },
  });

  return (
    <>
      <ToastContainer />
      <dialog id="my_modal_2" className={"modal modal-open"}>
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2 bg-zinc-100"
              onClick={() => handleClick()}
            >
              X
            </button>
          </form>
          <center>
            <h1 className="text-2xl font-bold">
              {data ? "Actualizar" : "Crear"} Categoria
            </h1>
            <form
              method="POST"
              onSubmit={formik.handleSubmit}
              className="items-center"
            >
              <input
                type="text"
                name="nombre"
                id="nombre"
                placeholder="nombre"
                /*error={formik.errors.title} */
                defaultValue={data?.nombre}
                onChange={formik.handleChange}
                className="input input-bordered input-primary w-full max-w-xs m-2"
              />
              <br></br>
              <input
                type="text"
                name="descripcion"
                id="descripcion"
                defaultValue={data?.descripcion}
                placeholder="descripcion"
                /* error={formik.errors.title} */
                onChange={formik.handleChange}
                className="input input-bordered input-primary w-full max-w-xs m-2"
              />
              <br></br>
              <input
                type="text"
                name="imagen"
                id="imagen"
                defaultValue={data?.imagen}
                /* error={formik.errors.title} */
                onChange={formik.handleChange}
                placeholder="imagen"
                className="input input-bordered input-primary w-full max-w-xs m-2"
              />
              <br></br>

              <input
                type="text"
                name="estado"
                id="estado"
                /* error={formik.errors.title} */
                defaultValue={data?.estado}
                onChange={formik.handleChange}
                placeholder="estado"
                className="input input-bordered input-primary w-full max-w-xs m-2"
              />
              <br></br>
              <br></br>
              <button type="submit" className="btn btn-active btn-primary">
                {data ? "Actualizar" : "Crear"}
              </button>
            </form>
          </center>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button onClick={() => handleClick()}>close</button>
        </form>
      </dialog>
    </>
  );
};

export default FormCategory;

////initialValues
const initialValues = (data: any) => {
  return {
    nombre: data?.nombre ?? "",
    descripcion: data?.descripcion ?? "",
    imagen: data?.imagen ?? "",
    estado: data?.estado ?? "",
  };
};
const validationSchema = () => {
  return {
    nombre: Yup.string(),
    descripcion: Yup.string(),
    imagen: Yup.string(),
    estado: Yup.string(),
  };
};
