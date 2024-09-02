
// Services
import { generatePdfService } from "@/services/invoice/server/generatePdfService";

export async function POST(req) {
    const result = await generatePdfService(req);
    return result;
}
