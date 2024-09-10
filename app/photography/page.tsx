// app/photography/page.tsx (or wherever your page is located)

import { Suspense } from "react";
import PhotographyClient from "./PhotographyClient";
import lqip from "lqip-modern";
import Image from "next/image";

export default async function PhotographyPage() {
  // Fetch and process images on the server side
  const images = await getImages();

  return (
    <main className="bg-neutral-900">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="container mx-auto my-16 gap-8 grid grid-cols-3">
          {
            images.map((image) => (
              <Image 
              key={image.href}
              src={image.href}
              alt={image.href}
              width={image.width}
              height={image.height}
              />
            ))
          }
        </div>
        {/* <PhotographyClient images={images} /> */}
      </Suspense>
    </main>
  );
}

async function getImages() {
  const imagePaths = [
    "https://cdn.pixabay.com/photo/2021/11/23/09/12/mountains-6818253_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_1280.jpg",
    "https://cdn.pixabay.com/photo/2023/09/04/17/48/flamingos-8233303_1280.jpg",
    "https://cdn.pixabay.com/photo/2024/02/15/14/31/donkey-8575524_1280.jpg",
    "https://cdn.pixabay.com/photo/2021/11/23/09/12/mountains-6818253_1280.jpg",
    "https://cdn.pixabay.com/photo/2024/01/04/21/54/volcano-8488486_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_1280.jpg",
    "https://cdn.pixabay.com/photo/2023/09/04/17/48/flamingos-8233303_1280.jpg",
    "https://cdn.pixabay.com/photo/2024/02/15/14/31/donkey-8575524_1280.jpg",
    "https://cdn.pixabay.com/photo/2024/01/04/21/54/volcano-8488486_1280.jpg",
  ];
  const images = [];

  for (const path of imagePaths) {
    const res = await fetch(path)
    const buffer = await res.arrayBuffer()

    const lqipData = await lqip(Buffer.from(buffer))

    const width = lqipData.metadata.originalWidth
    const height = lqipData.metadata.originalHeight

    images.push({
      href: path,
      width,
      height,
    })
  }

  // Sort images by height.
  images.sort((a, b) => a.height - b.height)

  // for (const path of imagePaths) {
  //   const url = new URL(path);
  // const imageResponse = await fetch(url.href);
  //   const arrayBuffer = await imageResponse.arrayBuffer();

  //   const lqipData = await lqip(Buffer.from(arrayBuffer));

  //   const thumbnailUrl = new URL(path);
  //   thumbnailUrl.searchParams.set("w", "200");

  //   images.push({
  //     href: url.href,
  //     thumbnailHref: thumbnailUrl.href,
  //     src: url.pathname + url.search,
  //     alt: url.pathname,
  //     width: lqipData.metadata.originalWidth,
  //     height: lqipData.metadata.originalHeight,
  //     blurDataUrl: lqipData.metadata.dataURIBase64,
  //   });
  // }

  return images;
}
