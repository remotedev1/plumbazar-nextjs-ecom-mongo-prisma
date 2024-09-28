"use client";

import Currency from "../ui/currency";
import { AddCart } from "./add-cart";

const Info = ({ data }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>

      <div className="flex flex-col gap-y-6">
        <div className=" flex items-start flex-wrap leading-none text-red-600  font-bold ">
          <span className="flex w-full text-sm md:text-base">
            <Currency value={data.msp} />
          </span>
        </div>
        {/* <div className="md:mt-1.5  text-[10px] md:text-base uppercase text-gray-500 flex flex-col">
          {!data.noOffer && (
            <span className="font-normal">
              <span className="">msp</span>&nbsp;
              <Currency value={data.msp} />
            </span>
          )}
          <span className="text-[10px] md:text-sm md:mt-1 mb-1  text-gray-500 font-normal lowercase">
            <Currency value={data.msp + data.gstAmount} /> incl. GST
          </span>
        </div> */}
        <div className="  text-[10px] md:text-base uppercase text-gray-500 ">
          <span className="">mrp</span>
          <span className="ml-1 font-normal">
            <Currency value={data?.mrp} lineThrough={true} />
          </span>
          {data.discountPercentage > 0 && (
            <span className="text-red-600 text-xs font-medium px-1 italic uppercase ">
              ({data.discountPercentage} % OFF)
            </span>
          )}
        </div>
      </div>
      <div className="mt-3">
        <AddCart product={{ ...data }} />
      </div>
    </div>
  );
};

export default Info;
