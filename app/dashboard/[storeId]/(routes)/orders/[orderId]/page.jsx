import { getOrder } from "@/actions/get-order";
import Currency from "@/components/ui/currency";
import { convertTimestampToFormattedDate } from "@/lib/utils";
import Image from "next/image";
import { ChangePaymentStatus } from "../components/change-payment-status";
import { ChangeDeliveryStatus } from "../components/change-delivery-status";
import { db } from "@/lib/db";
import OrderActions from "../components/order-actions";

const OrderDetails = async ({ params }) => {
  const { orderId, storeId } = params;
  const order = await getOrder(orderId.split("%20")[0]);

  if (!order) {
    return (
      <div className="flex items-center justify-center font-extrabold text-5xl min-h-[80vh]">
        Order not found
      </div>
    );
  }

  // Extract product IDs from the order
  const productIds = order.orderItems.map((item) => item.productId);

  // Fetch the products based on these IDs
  const products = await db.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  // Create a mapping of product ID to stock
  const productStockMap = products.reduce((map, product) => {
    map[product.id] = product.stock; // Assuming 'stock' is a field in your product model
    return map;
  }, {});

  // Create the array showing id, name, stock, and order quantity
  const productComparison = order.orderItems.map((item) => {
    const stock = productStockMap[item.productId];
    const canBeFulfilled = stock >= item.quantity;

    return {
      id: item.productId,
      name: item.product.name,
      stock: stock,
      price: item.price,
      quantityOrdered: item.quantity,
      canBeFulfilled: canBeFulfilled,
    };
  });

  return (
    <section className="py-14 relative min-h-[80vh]">
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
        <h2 className="font-manrope font-bold text-4xl leading-10 text-black text-center mb-5">
          Order Details
        </h2>

        <div className="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
            <div className="flex flex-col">
              <p className="font-semibold text-base leading-7 text-black">
                Order Id :{" "}
                <span className="text-indigo-600 font-medium">{order.id}</span>
              </p>
              <p className="font-semibold text-base leading-7 text-black mt-4">
                Order Date :{" "}
                <span className="text-gray-400 font-medium">
                  {convertTimestampToFormattedDate(order?.createdAt)}
                </span>
              </p>
              <div className=" flex font-semibold text-base leading-7 text-black mt-4">
                Payment : &nbsp; <ChangePaymentStatus order={order} />
              </div>
              <div className=" flex font-semibold text-base leading-7 text-black mt-4">
                Delivery status : &nbsp; <ChangeDeliveryStatus order={order} />
              </div>
            </div>
          </div>
          <div className="w-full px-3 min-[400px]:px-6">
            {order.orderItems.map((item) => (
              <div
                className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full"
                key={item.id}
              >
                <div className="relative h-24 w-24 rounded-md overflow-hidden ">
                  <Image
                    fill
                    src={item.product.images[0]}
                    alt=""
                    className="object-cover object-center"
                  />
                </div>
                <div className="flex flex-row items-center w-full ">
                  <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                    <div className="flex items-center">
                      <div className="">
                        <h2 className="font-semibold text-xl leading-8 text-black mb-3">
                          {item.product.name}
                        </h2>
                        <p className="font-normal text-lg leading-8 text-gray-500 mb-3 ">
                          Category: {item.product.category.name}
                        </p>
                        <p className="font-normal text-lg leading-8 text-gray-500 mb-3 ">
                          Brand: {item.product.brand.name}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3">
                      <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                        <div className="flex gap-3 lg:block">
                          <p className="font-medium text-sm leading-7 text-black">
                            price
                          </p>
                          <div className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">
                            <Currency value={item.price} />
                          </div>
                        </div>
                      </div>
                      <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                        <div className="flex gap-3 lg:block">
                          <p className="font-medium text-sm leading-7 text-black">
                            Quantity
                          </p>
                          <p className="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-emerald-50 text-emerald-600 text-center">
                            {item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
            <div className="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200">
              <button className="line-through flex outline-0 py-6 sm:pr-6  sm:border-r border-gray-200 whitespace-nowrap gap-2 items-center justify-center font-semibold group text-lg text-black bg-white transition-all duration-500 hover:text-indigo-600">
                <svg
                  className="stroke-black transition-all duration-500 group-hover:stroke-indigo-600"
                  xmlns="http://www.w3.org/2000/svg"
                  width={22}
                  height={22}
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    d="M5.5 5.5L16.5 16.5M16.5 5.5L5.5 16.5"
                    stroke=""
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
                Cancel Order
              </button>
              <p className="font-medium text-lg text-gray-900 pl-6 py-3 max-lg:text-center">
                Cash on Delivery
              </p>
            </div>
            <div className="flex font-semibold text-lg text-black py-6">
              Total Price : &nbsp;
              <span className="text-indigo-600">
                <Currency value={order.total} />
              </span>
            </div>
          </div>
        </div>
        {/* Process the order */}
        <div className="p-2 mt-8">
          <h3 className="text-lg font-semibold mb-4">
            Product Stock Comparison
          </h3>
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <ul>
              {productComparison.map(
                ({ id, name, stock, quantityOrdered, canBeFulfilled }) => (
                  <li key={id} className="flex justify-between mb-2">
                    <span className="font-medium">{name}</span>
                    <span
                      className={`text-gray-500 ${
                        canBeFulfilled ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      Stock: {stock} / Ordered: {quantityOrdered}
                      {canBeFulfilled
                        ? " (Can be fulfilled)"
                        : " (Cannot be fulfilled)"}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
          <OrderActions
            orderId={order.id}
            orderCommitted={order.clearedBy}
            storeId={storeId}
            productComparison={productComparison}
          />
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
