// updateProductImages.js
const fs = require("fs");
const db = require("./lib/db");

async function runOnce() {
  console.log("Starting update...");

  // Load your JSON file
  const data = JSON.parse(fs.readFileSync("./dump/sanitaryware.json", "utf8"));

  let updatedCount = 0;
  let skippedCount = 0;

  for (const item of data) {
    const { name, sheet, image } = item;

    if (!name || !sheet || !image) {
      console.log("Skipping invalid entry:", item);
      continue;
    }

    try {
      // Match product by name + brand
      const product = await db.product.findFirst({
        where: {
          name: name.trim(),
        },
      });

      if (!product) {
        console.log(`❌ No match for: ${name} (${sheet})`);
        skippedCount++;
        continue;
      }

      // ----------------------------------------
      // 🔥 Remove all images starting with Cloudinary
      // ----------------------------------------
      const cleanedImages = (product.images || []).filter(
        (url) => !url.startsWith("https://res.cloudinary.com")
      );

      // Add new image (avoid duplicates)
      const newImages = [...new Set([image, ...cleanedImages])];

      // Update Prisma record
      await db.product.update({
        where: { id: product.id },
        data: { images: newImages },
      });

      console.log(`✅  ${updatedCount} -  Updated: ${name} (${sheet})`);
      updatedCount++;

    } catch (err) {
      console.error(`⚠ Error updating ${name} (${sheet}) →`, err);
    }
  }

  console.log("--------- DONE ---------");
  console.log("Updated:", updatedCount);
  console.log("Skipped:", skippedCount);

  await db.$disconnect();
}

// Run once
runOnce().catch((e) => {
  console.error(e);
  db.$disconnect();
});
