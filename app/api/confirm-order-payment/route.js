import { auth } from "@/auth";
import { db } from "@/lib/db";
import axios from "axios";
import sha256 from "crypto-js/sha256";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const data = await req.formData();
  const amount = data.get("amount");
  const transactionId = data.get("transactionId");
  const { searchParams } = new URL(req.url);
  const merchantTransactionId = searchParams.get("merchantTransactionId");
  if (!merchantTransactionId) {
    return NextResponse.json({ error: "merchantTransactionId is required" });
  }

  try {
    const st =
      `/pg/v1/status/${process.env.NEXT_PUBLIC_MERCHANT_ID}/${merchantTransactionId}` +
      process.env.NEXT_PUBLIC_SALT_KEY;
    const dataSha256 = sha256(st);

    const checksum = dataSha256 + "###" + process.env.NEXT_PUBLIC_SALT_INDEX;

    const options = {
      method: "GET",
      url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${process.env.NEXT_PUBLIC_MERCHANT_ID}/${merchantTransactionId}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": `${process.env.NEXT_PUBLIC_MERCHANT_ID}`,
      },
    };

    // CHECK PAYMENT STATUS
    const response = await axios.request(options);
    console.log(response.data.code == "PAYMENT_SUCCESS");

    const payments = await db.payment.create({
      data: {
        status: response.data.code == "PAYMENT_SUCCESS" && "COMPLETED",
        transactionId,
        amount: parseFloat(amount),
        method: "PHONEPE",
        Order: {
          connect: {
            id: merchantTransactionId,
          },
        },
      },
    });
    await db.order.update({
      where: {
        id: response.data.data.merchantTransactionId,
      },
      data: {
        isPaid: response.data.code == "PAYMENT_SUCCESS",
        payment: {
          connect: {
            id: payments.id,
          },
        },
      },
    });
    console.log(
      `http://${process.env.NEXT_PUBLIC_APP_URL}/order-summary/${response.data.data.merchantTransactionId}`
    );
    if (response.data.code == "PAYMENT_SUCCESS")
      return NextResponse.redirect(
        `http://${process.env.NEXT_PUBLIC_APP_URL}/order-summary/${response.data.data.merchantTransactionId}`,
        {
          status: 301,
        }
      );
    else
      return NextResponse.redirect("http://localhost:3000/failure", {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      });
  } catch (error) {
    console.error("Error creating order:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
