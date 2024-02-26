"use client";
import { useAppContext } from "@/context/Index";

import React from "react";
import { FaTrashAlt } from "react-icons/fa";

//import { Separator } from "@/components/ui/separator"

const ShoppingCart = () => {
  const { car, removeCar } = useAppContext();
  
  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <div className="border rounded-lg overflow-hidden">
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th className="w-[32px]" />
            </tr>
          </thead>
          <tbody>
            {car.map((item: any) => (
              <tr key={item.id}>
                <td className="font-medium">{item.nombre}</td>
                <td>{item.precio}</td>
                <td>
                  <input
                    id="quantity"
                    className="w-20"
                    defaultValue="1"
                    type="number"
                  />
                </td>
                <td>{item.precio}</td>
                <td>
                  <button onClick={() => removeCar(item.id)}>
                    <FaTrashAlt className="h-5 w-5" />
                    <span className="sr-only">Remove</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6">
        <div className="card w-96 bg-white ">
          <div className="card-body">
            <h2 className="card-title">Card title!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <div>Subtotal</div>
              <div className="ml-auto">$149.97</div>
              <div className="flex items-center">
                <div>Shipping</div>
                <div className="ml-auto">$5.00</div>
              </div>
              ______________________________
              <div className="flex items-center font-medium">
                <div>Total</div>
                <div className="ml-auto">$154.97</div>
              </div>
              <button className="btn">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
