"use client";

import { useState } from "react";
import Currency from "../ui/currency";
import { AddCart } from "./add-cart";

const Info = ({ data }) => {
  const [size, setSize] = useState(data?.size[0]);

  const handleSizeClick = (selectedSize) => {
    setSize(selectedSize);
  };
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">
        {data.name}
        <span className="text-3xl font-bold text-gray-900 capitalize">
          &nbsp;({size})
        </span>
      </h1>

      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Sizes:</h3>

          <div className="flex items-center justify-evenly space-x-3 ">
            {data.size.map((item, index) => (
              <div
                key={index}
                className={`font-bold capitalize border border-slate-400 p-2 py-1 cursor-pointer ${
                  size === item ? "bg-gray-300" : ""
                }`}
                onClick={() => handleSizeClick(item)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Color:</h3>
          <div
            className="h-6 w-6 rounded-full border border-gray-600"
            style={{ backgroundColor: data.color }}
          />
        </div>
        <div className="mt-3 flex items-end justify-between">
          <span className="text-2xl text-gray-900">
            <Currency value={data?.price} />
          </span>
        </div>
      </div>
      <div className="mt-3">
        <AddCart product={{ ...data, size: size }} />
      </div>
    </div>
  );
};

export default Info;
