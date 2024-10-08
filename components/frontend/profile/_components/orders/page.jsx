import { format } from "date-fns";

import { rupeeFormatter } from "@/lib/utils";

import OrderClient from "./components/Client";

import { db } from "@/lib/db";

const OrdersPage = async () => {
  // const totalRevenue = await getTotalRevenue(params.storeId);
  // const { numberOfUnpaidOrders, totalUnpaidAmount } = await getPendingAmount(
  //   params.storeId
  // );
  // const salesCount = await getSalesCount(params.storeId);

  const orders = await db.order.findMany({
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders = orders.map((item) => ({
    id: item.isPaid.valueOf() ? item.id : `${item.id} (Unpaid)`,
    deliveryStatus: item.deliveryStatus,
    phone: item.phone,
    address: item.address,
    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: rupeeFormatter.format(item.total),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <OrderClient
        data={formattedOrders.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )}
      />
    </div>
  );
};

export default OrdersPage;
