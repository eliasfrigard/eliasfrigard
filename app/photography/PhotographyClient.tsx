// app/photography/PhotographyClient.tsx (or wherever you prefer placing this)

"use client";

import { useRef } from "react";
import LightGalleryComponent from "lightgallery/react";
import Image from "next/image";
import Masonry from "react-masonry-css";
import "lightgallery/css/lightgallery.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import "lightgallery/css/lg-thumbnail.css";
import lgZoom from "lightgallery/plugins/zoom";
import "lightgallery/css/lg-zoom.css";
import type { LightGallery } from "lightgallery/lightgallery"

type ImageEnhanced = {
  href: string;
  thumbnailHref: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataUrl: string;
};

export default function PhotographyClient({
  images,
}: {
  images: ImageEnhanced[];
}) {
  const lightbox = useRef<LightGallery | null>(null)

  console.log(images[0])

  return (
    <main className="flex space-x-12 min-h-screen items-center justify-between p-24 bg-neutral-900">
      <LightGalleryComponent
        onInit={(ref) => {
          if (ref) {
            lightbox.current = ref.instance;
          }
        }}
        plugins={[lgThumbnail, lgZoom]}
        dynamic
        dynamicEl={images.map((image) => ({
          src: image.href,
          thumb: image.thumbnailHref,
          width: image.width.toString(),
          alt: image.alt,
        }))}
      />

      <Masonry className="flex gap-4" columnClassName="bg-clip-padding">
        {images.map((image, idx) => (
          <Image
            key={image.src}
            className="hover:opacity-80 cursor-pointer my-4 rounded shadow"
            onClick={() => lightbox.current?.openGallery(idx)}
            src={image.href}
            alt={image.alt}
            width={image.width}
            height={image.height}
            placeholder="blur"
            blurDataURL={image.blurDataUrl}
          />
        ))}
      </Masonry>
    </main>
  );
}
