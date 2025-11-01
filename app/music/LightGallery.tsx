'use client'

import React from 'react'

import LightGalleryComponent from 'lightgallery/react'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'

export default function LightGallery({
  images,
}: {
  images: { href: string; thumbnailHref: string; width: number; alt: string }[]
}) {
  const lightbox = React.useRef<any | null>(null)

  return (
    <div className='flex min-h-screen items-center justify-between p-24 bg-neutral-900'>
      <LightGalleryComponent
        onInit={(ref) => {
          if (ref) {
            lightbox.current = ref.instance
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
    </div>
  )
}
