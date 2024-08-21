'use client'

import { useRef, useState, useEffect } from "react"
import type { LightGallery } from "lightgallery/lightgallery"
import Image, { ImageLoaderProps } from "next/image"
import Masonry from "react-masonry-css"

import LightGalleryComponent from "lightgallery/react"
import "lightgallery/css/lightgallery.css"
import lgThumbnail from "lightgallery/plugins/thumbnail"
import "lightgallery/css/lg-thumbnail.css"
import lgZoom from "lightgallery/plugins/zoom"
import "lightgallery/css/lg-zoom.css"

import lqip from 'lqip-modern'
import axios from "axios"

type ImageEnhanced = {
  href: string
  thumbnailHref: string
  src: string
  alt: string
  width: number
  height: number
  blurDataUrl: string
}

function normalizeUrl(src: string) {
  const MEDIA_URL = process.env['NEXT_PUBLIC_MEDIA_URL']

  if (src.slice(0, 4) === 'http') {
    return new URL(src)
  } else {
    return new URL(${MEDIA_URL}/${src[0] === '/' ? src.slice(1) : src})
  }
}

function imgixLoader({ src, width, quality }: ImageLoaderProps): string {
  const url = normalizeUrl(src)
  const params = url.searchParams

  params.set('auto', params.getAll('auto').join(',') || 'format')
  params.set('fit', params.get('fit') || 'max')
  params.set('w', params.get('w') || width.toString())

  if (quality) {
    params.set('q', quality.toString())
  }

  return url.href
}

const getImages = async (): Promise<ImageEnhanced[]> => {
  const imagePaths = ['https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_1280.jpg']
  const imagesWithMetadata: ImageEnhanced[] = []

  for (const path of imagePaths) {
    const url = normalizeUrl(path)

    const imageResponse = await axios(url.href, {
      responseType: 'arraybuffer',
    })

    const lqipData = await lqip(Buffer.from(imageResponse.data))

    const thumbnailUrl = normalizeUrl(path)
    thumbnailUrl.searchParams.set('w', '200')

    imagesWithMetadata.push({
      href: url.href,
      thumbnailHref: thumbnailUrl.href,
      src: url.pathname + url.search,
      alt: url.pathname,
      width: lqipData.metadata.originalWidth,
      height: lqipData.metadata.originalHeight,
      blurDataUrl: lqipData.metadata.dataURIBase64,
    })
  }

  return imagesWithMetadata
}

export default function Photography() {
  const lightbox = useRef<LightGallery | null>(null)
  const [images, setImages] = useState<ImageEnhanced[]>([])

  useEffect(() => {
    const fetchImages = async () => {
      const images = await getImages()
      setImages(images)
    }

    fetchImages()
  }, []) // Empty dependency array to run this effect only once

  return (
    <main className="flex space-x-12 min-h-screen items-center justify-between p-24 bg-neutral-900">
      <LightGalleryComponent
        onInit={(ref) => {
          if (ref) {
            lightbox.current = ref.instance
          }
        }}
        plugins={[lgThumbnail, lgZoom]}
        dynamic
        dynamicEl={images.map((image: ImageEnhanced) => ({
          src: image.href,
          thumb: image.thumbnailHref,
          width: image.width.toString(),
          alt: image.alt,
        }))}
      />

      <Masonry className="flex gap-2" columnClassName="bg-clip-padding">
        {images.map((image: ImageEnhanced, idx: number) => (
          <Image
            key={image.src}
            className="hover:opacity-80 cursor-pointer my-2"
            onClick={() => lightbox.current?.openGallery(idx)}
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            placeholder="blur"
            blurDataURL={image.blurDataUrl}
          />
        ))}
      </Masonry>
    </main>
  )
}
