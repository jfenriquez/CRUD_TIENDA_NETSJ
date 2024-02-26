"use client";
import { useEffect, useMemo, useRef, useState } from "react";

import { toast } from "react-toastify";

export const useCart = () => {
  const [car, setCar] = useState([]);
  const [total, setTotal] = useState(0);
  const [contadorProduct, setContadorProduct] = useState(0);


  /* agregar carrito al local storage */
  ////storage local
  useEffect(() => {
    /////calcular total
    const total = car.reduce((acc, car) => acc + parseInt(car.precio), 0);
    setTotal(total);
    console.log(total);
    ////guardar el carrito en localstorage
    localStorage.setItem("car", JSON.stringify(car));
    countItemsInLocalStorage();
  }, [car]);

  ////remover producto del carrito
  const removeCar = (productId: any) => {
    const updatedCart = car.filter((item) => item.id !== productId);
    setCar(updatedCart);
    countItemsInLocalStorage();
  };

  //////contar productos en el carrito
  const countItemsInLocalStorage = async () => {
    try {
      const items = await localStorage.getItem("car");
      if (items) {
        setContadorProduct(JSON.parse(items).length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    car,
    setCar,
    removeCar,
    contadorProduct,
    total,
  };
};

