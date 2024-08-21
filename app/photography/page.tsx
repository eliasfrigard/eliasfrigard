// app/photography/page.tsx (or wherever your page is located)

import { Suspense } from "react";
import PhotographyClient from "./PhotographyClient";
import lqip from "lqip-modern";

export default async function PhotographyPage() {
  // Fetch and process images on the server side
  const images = await getImages();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PhotographyClient images={images} />
    </Suspense>
  );
}

async function getImages() {
  const imagePaths = [
    "https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_1280.jpg",
  ];
  const imagesWithMetadata = [];

  for (const path of imagePaths) {
    const url = new URL(path);
    const imageResponse = await fetch(url.href);
    const arrayBuffer = await imageResponse.arrayBuffer();

    const lqipData = await lqip(Buffer.from(arrayBuffer));

    const thumbnailUrl = new URL(path);
    thumbnailUrl.searchParams.set("w", "200");

    imagesWithMetadata.push({
      href: url.href,
      thumbnailHref: thumbnailUrl.href,
      src: url.pathname + url.search,
      alt: url.pathname,
      width: lqipData.metadata.originalWidth,
      height: lqipData.metadata.originalHeight,
      blurDataUrl: lqipData.metadata.dataURIBase64,
    });
  }

  return imagesWithMetadata;
}
