import fs from "fs";
import path from "path";
import { NextResponse } from 'next/server';
import AWS from 'aws-sdk';
import sizeOf from "image-size";

const s3 = new AWS.S3({
  endpoint: 'https://s3.wasabisys.com',
  accessKeyId: process.env.WASABI_ACCESS_KEY,
  secretAccessKey: process.env.WASABI_SECRET_KEY,
  region: 'eu-central-1',
});

// export async function GET() {
//   try {
//     const res = await s3.listObjectsV2({ Bucket: 'photography-portfolio' }).promise();

//     const photos = res.Contents.map((file, index) => ({
//       id: index + 1,
//       src: `https://s3.wasabisys.com/photography-portfolio/${encodeURIComponent(file.Key)}`,
//       alt: file.Key,
//     }));

//     return NextResponse.json(photos);
//   } catch (err) {
//     console.error('🚨 Wasabi list error:', err);
//     return NextResponse.json({ error: 'Failed to load photos' }, { status: 500 });
//   }
// }

export async function GET() {
  const portfolioDir = path.join(process.cwd(), "public", "portfolio");

  const files = fs.readdirSync(portfolioDir).filter((file) =>
    /\.(png|jpe?g|gif|webp|avif)$/i.test(file)
  );

  const photos = files.map((file, index) => {
    const filePath = path.join(portfolioDir, file);

    let width = 800;
    let height = 600;
    let aspect = "4 / 3";

    try {
      // ✅ Read file manually as a Buffer
      const buffer = fs.readFileSync(filePath);
      const dimensions = sizeOf(buffer);

      if (dimensions?.width && dimensions?.height) {
        width = dimensions.width;
        height = dimensions.height;

        // simplify aspect ratio
        const gcd = (a, b) => (b ? gcd(b, a % b) : a);
        const divisor = gcd(width, height);
        const wRatio = Math.round(width / divisor);
        const hRatio = Math.round(height / divisor);

        aspect = `${wRatio} / ${hRatio}`;
      }
    } catch (err) {
      console.error(`Failed to read dimensions for ${file}:`, err);
    }

    return {
      id: index,
      src: `/portfolio/${file}`,
      alt: file.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
      width,
      height,
      aspect,
    };
  });

  return NextResponse.json(photos);
}