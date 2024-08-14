"use client";

import Currency from "../ui/currency";
import { AddCart } from "./add-cart";

const Info = ({ data }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>

      <div className="flex flex-col gap-y-6">
        <div className="mt-3 flex items-end justify-between">
          <span className="text-2xl text-gray-900">
            <Currency value={data?.price} />
          </span>
        </div>
      </div>
      <div className="mt-3">
        <AddCart product={{ ...data}} />
      </div>
    </div>
  );
};

export default Info;
