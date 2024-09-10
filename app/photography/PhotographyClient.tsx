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
import Gallery, { Photo } from "react-photo-gallery";

type ImageEnhanced = {
  href: string;
  thumbnailHref: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataUrl: string;
};

const myBreakpointsAndCols = {
  default: 3, // This is for desktop
  1100: 2,    // For screens wider than 1100px, but less than or equal to 1200px
  700: 1,     // For screens wider than 700px, but less than or equal to 1100px
  500: 1,     // For screens wider than 500px, but less than or equal to 700px
  0: 1        // For screens less than or equal to 500px
}

export default function PhotographyClient({
  images,
}: {
  images: ImageEnhanced[];
}) {
  const lightbox = useRef<LightGallery | null>(null)

  console.log(images[0])

  const photos = images.map((image) => ({
    src: image.href,
    width: image.width,
    height: image.height
  }))

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

<Gallery 
  photos={photos} 
  onClick={(event, { index }) => lightbox.current?.openGallery(index)} 
  renderImage={props => <Photo className="rounded-xl" {...props} />}
/>

      {/* <Masonry breakpointCols={myBreakpointsAndCols} className="flex gap-4" columnClassName="bg-clip-padding">
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
      </Masonry> */}
    </main>
  );
}
