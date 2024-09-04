
// Services
import { exportInvoiceService } from "@/services/invoice/server/exportInvoiceService";

export async function POST(req) {
    const result = await exportInvoiceService(req);
    return result;
}
