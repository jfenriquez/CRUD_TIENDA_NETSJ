"use client";
//import '../../public/sw.js';
import Header from "@/components/Header";
import Search from "@/components/Search";
import { useProduct } from "@/hooks/useProduct";
import Image from "next/image";
import { useEffect } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi";

export default function Home() {
  const { fetchData, data, loading } = useProduct();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {/* search */}
      <Search />

      {/* menu horizontal  */}
      <div className="flex flex-wrap justify-center">
        {loading && (
          <div className="container flex justify-center">
            <span className="loading loading-bars loading-xs text-primary"></span>
            <span className="loading loading-bars loading-sm text-primary"></span>
            <span className="loading loading-bars loading-md text-primary"></span>
            <span className="loading loading-bars loading-lg text-primary"></span>
          </div>
        )}
        {data.map((item, index) => (
          <div className="card w-96 bg-base-100 shadow-xl m-4" key={index}>
            <figure>
              <Image
                src={
                  item.imagen.length > 0
                    ? item.imagen
                    : "https://res.cloudinary.com/ds1n3ewwk/image/upload/v1706720188/play_store-1706720186222-537153358.jpg.jpg"
                }
                alt="Shoes"
                layout="responsive"
                width={600}
                height={600}
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
                <button className="btn btn-outline btn-accent">
                  <HiOutlineShoppingCart />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
