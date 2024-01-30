"use client";
//import '../../public/sw.js';
import Header from "@/components/Header";
import Search from "@/components/Search";
import { useProduct } from "@/hooks/useProduct";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const { fetchData, data } = useProduct();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
                <Image src={item.imagen} alt="Shoes" width={500} height={500} />
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
                  <button className="btn btn-outline btn-accent">
                    iconcar
                  </button>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
