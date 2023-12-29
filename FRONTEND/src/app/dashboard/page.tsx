import React from "react";
import Image from "next/image";
import { FaRegEdit } from "react-icons/fa";

const page = () => {
  return (
    <>
      <div className="bg-base-300 p-8 rounded shadow-md w-full justify-end">
        <div className="flex items-center justify-center">
          <button className="btn btn-circle bg-current justify-center">
            <FaRegEdit
              style={{
                color: "red",
                width: 20,
                height: 20,
              }}
            />
          </button>
          <Image
            src="/autu.png"
            alt="avatar"
            width={150}
            height={150}
            className="rounded-full"
          />
        </div>
        <div className="mt-4 text-center">
          <h1 className="text-2xl font-bold">Nombre de Usuario</h1>
          <p>nombre</p>
          <p>apellido</p>
          <p>Correo electrónico: usuario@example.com</p>
          <p>Celular:155</p>
          <p>Cambiar password</p>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-bold">Biografía</h2>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel
            metus ut orci semper tristique.
          </p>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-bold">Redes Sociales</h2>
          <div className="flex items-center mt-2">
            <span className="mr-2 text-gray-600">Twitter:</span>
            <a
              href="https://twitter.com/usuario"
              target="_blank"
              className="text-blue-500"
            >
              twitter.com/usuario
            </a>
          </div>
          <div className="flex items-center mt-2">
            <span className="mr-2 text-gray-600">GitHub:</span>
            <a
              href="https://github.com/usuario"
              target="_blank"
              className="text-gray-700"
            >
              github.com/usuario
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
