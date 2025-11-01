import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const audioDir = path.join(process.cwd(), "public", "audio");

  if (!fs.existsSync(audioDir)) {
    return NextResponse.json([], { status: 200 });
  }

  const files = fs.readdirSync(audioDir).filter((file) =>
    /\.(mp3|wav|ogg|m4a)$/i.test(file)
  );

  const tracks = files.map((file, index) => ({
    id: index,
    title: file.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
    artist: "Unknown",
    url: `/audio/${file}`,
  }));

  return NextResponse.json(tracks);
}
