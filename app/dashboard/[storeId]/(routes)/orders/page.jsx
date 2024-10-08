import { format } from "date-fns";

import { rupeeFormatter } from "@/lib/utils";

import OrderClient from "./components/Client";
// import { getTotalRevenue } from "@/actions/get-total-revenue";
// import { getSalesCount } from "@/actions/get-sales-count";
// import { getStockCount } from "@/actions/get-stocks-count";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Heading from "@/components/ui/heading";

import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  BaggageClaim,
  ChevronRight,
  HelpCircle,
  IndianRupee,
} from "lucide-react";
import { getPendingAmount } from "@/actions/get-pending-amount";
import { db } from "@/lib/db";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { getSalesCount } from "@/actions/get-sales-count";

const OrdersPage = async ({ params }) => {
  const totalRevenue = await getTotalRevenue(params.storeId);
  const { numberOfUnpaidOrders, totalUnpaidAmount } = await getPendingAmount(
    params.storeId
  );
  const salesCount = await getSalesCount(params.storeId);

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

    phone: item.phone,
    address: item.address,
    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: rupeeFormatter.format(item.total),
    isPaid: item.isPaid,
    deliveryStatus: item.deliveryStatus,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-6 p-8 pt-6">
        <Heading title="Overview" description="Overview of your store" />
        <Separator />

        <div className="grid gap-4 md:grid-cols-3  ">
          <Card className="bg-[#146EB4] text-zinc-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-6">
              <CardTitle className="text-sm font-medium">
                Online Orders
              </CardTitle>

              <BaggageClaim className="text-zinc-100 h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{salesCount} orders</div>
            </CardContent>
            {/* <CardFooter className="flex flex-row items-center justify-between bg-[#0E4F82] p-2  ">
             <></>
            </CardFooter> */}
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-6">
              <CardTitle className="text-sm font-medium">
                Amount Processed
              </CardTitle>

              <IndianRupee className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {rupeeFormatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-6">
              <CardTitle className="text-sm font-medium">
                Amount Pending
              </CardTitle>

              <AlertCircle className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex justify-between">
              <div className="text-2xl font-bold ">
                {rupeeFormatter.format(totalUnpaidAmount)}
              </div>

              <div className="flex flex-row items-center space-x-2 text-blue-800 cursor-pointer">
                <div
                  className="h-3 w-3 rounded-full bg-red-500"
                  aria-hidden="true"
                />
                <span className="text-sm text-blue-800 text-muted-foreground border-b-2 border-blue-800 ">
                  {numberOfUnpaidOrders}{" "}
                  {numberOfUnpaidOrders > 1 ? "orders" : "order"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
