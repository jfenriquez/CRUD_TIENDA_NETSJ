//import '../../public/sw.js';
import Header from "@/components/Header";
import Search from "@/components/Search";
import Image from "next/image";

const data = [
  {
    nombre: "string",
    descripcion: "string",
    imagen: "string",
    precio: 10.0,
    stock: 100,
    categoriaId: 1,
  },
  {
    nombre: "string",
    descripcion: "string",
    imagen: "string",
    precio: 10.0,
    stock: 100,
    categoriaId: 1,
  },
  {
    nombre: "string",
    descripcion: "string",
    imagen: "string",
    precio: 10.0,
    stock: 100,
    categoriaId: 1,
  },

  {
    nombre: "string",
    descripcion: "string",
    imagen: "string",
    precio: 10.0,
    stock: 100,
    categoriaId: 1,
  },
  {
    nombre: "string",
    descripcion: "string",
    imagen: "string",
    precio: 10.0,
    stock: 100,
    categoriaId: 1,
  },
  {
    nombre: "string",
    descripcion: "string",
    imagen: "string",
    precio: 10.0,
    stock: 100,
    categoriaId: 1,
  },
  {
    nombre: "string",
    descripcion: "string",
    imagen: "string",
    precio: 10.0,
    stock: 100,
    categoriaId: 1,
  },
  {
    nombre: "string",
    descripcion: "string",
    imagen: "string",
    precio: 10.0,
    stock: 100,
    categoriaId: 1,
  },
  {
    nombre: "string",
    descripcion: "string",
    imagen: "string",
    precio: 10.0,
    stock: 100,
    categoriaId: 1,
  },
];

export default function Home() {
  return (
    <>
      {/* search */}
      <Search />

      {/* menu horizontal  */}
      <div className="flex flex-wrap justify-center">
        {data.map((item, index) => (
          <>
            <div className="card w-96 bg-base-100 shadow-xl m-4" key={index}>
              <figure>
                <img
                  src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {item.nombre}
                  <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>{item.descripcion}</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">{item.precio}</div>
                  <div className="badge badge-outline">
                    catgory:{item.categoriaId}
                  </div>
                  <button className="btn btn-outline btn-accent">iconcar</button>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
