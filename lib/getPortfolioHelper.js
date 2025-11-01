import fs from "fs";
import path from "path";

export function getPortfolioImages() {
  const portfolioDir = path.join(process.cwd(), "public", "portfolio");

  // Read directory and only include image files
  const files = fs.readdirSync(portfolioDir).filter((file) =>
    /\.(png|jpe?g|gif|webp|avif|svg)$/i.test(file)
  );
  console.log('🚀 || getPortfolioImages || files:', files)

  // Return public URLs (Next.js serves public/ directly from root)
  return files.map((file) => `/portfolio/${file}`);
}
