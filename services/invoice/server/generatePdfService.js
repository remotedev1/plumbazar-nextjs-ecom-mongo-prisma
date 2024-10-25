import { NextRequest, NextResponse } from "next/server";

// Chromium
import chromium from "@sparticuz/chromium";

// Helpers
import { getInvoiceTemplate } from "@/lib/helpers";

// Variables
import { CHROMIUM_EXECUTABLE_PATH, ENV, TAILWIND_CDN } from "@/lib/variables";

// Types

/**
 * Generate a PDF document of an invoice based on the provided data.
 *
 * @async
 * @param {NextRequest} req - The Next.js request object.
 * @throws {Error} If there is an error during the PDF generation process.
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object containing the generated PDF.
 */
export async function generatePdfService(req) {
  const body = await req.json();
  let browser;

  try {
    const ReactDOMServer = (await import("react-dom/server")).default;
    const InvoiceTemplate = await getInvoiceTemplate(1);
    const htmlTemplate = ReactDOMServer.renderToStaticMarkup(
      InvoiceTemplate(body)
    );

    if (ENV === "production") {
      const puppeteer = await import("puppeteer-core");
      browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(CHROMIUM_EXECUTABLE_PATH),
        headless: true,
        ignoreHTTPSErrors: true,
      });
    } else if (ENV === "development") {
      const puppeteer = await import("puppeteer");
      browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        headless: "new",
      });
    }

    if (!browser) throw new Error("Failed to launch browser");

    const page = await browser.newPage();
    await page.setContent(htmlTemplate, {
      waitUntil: ["load", "networkidle0", "domcontentloaded"],
    });

    await page.addStyleTag({ url: TAILWIND_CDN });

    // Define Header and Footer templates
    const headerTemplate = `
      <div style="font-size: 10px; width: 100%; text-align: center; padding: 5px 0;">
        <span>Plumbazar - Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
      </div>
    `;

    const footerTemplate = `
      <div style="font-size: 10px; width: 100%; text-align: center; padding: 5px 0;">
        <span>Invoice generated on ${new Date().toLocaleDateString()}</span>
      </div>
    `;

    // Generate the PDF with header and footer
    const pdf = await page.pdf({
      format: "a4",
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate,
      footerTemplate,
      margin: {
        top: "50px", // Adjust as needed
        bottom: "50px", // Adjust as needed
        left: "20px",
        right: "20px",
      },
    });

    for (const page of await browser.pages()) {
      await page.close();
    }

    await browser.close();

    const pdfBlob = new Blob([pdf], { type: "application/pdf" });

    return new NextResponse(pdfBlob, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=invoice.pdf",
      },
      status: 200,
    });
  } catch (error) {
    return new NextResponse(`Error generating PDF: \n${error}`, {
      status: 500,
    });
  } finally {
    if (browser)
      await Promise.race([browser.close(), browser.close(), browser.close()]);
  }
}
