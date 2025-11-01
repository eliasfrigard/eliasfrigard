import Image from 'next/image'

export default function About() {
  const images = [
    {
      href: '/maija-sellosali-2.jpg',
      thumbnailHref: '/maija-sellosali-2.jpg',
      width: 800,
      height: 600,
      alt: 'Image 1',
    },
    {
      href: '/maija-sellosali-2.jpg',
      thumbnailHref: '/maija-sellosali-2.jpg',
      width: 800,
      height: 600,
      alt: 'Image 2',
    },
    {
      href: '/maija-sellosali-2.jpg',
      thumbnailHref: '/maija-sellosali-2.jpg',
      width: 800,
      height: 600,
      alt: 'Image 3',
    },
  ]

  return (
    <main className='flex min-h-screen flex-col items-center gap-12 p-16 bg-neutral-900 text-white'>
      <div className='border-b border-white px-8 pb-8 border-opacity-20'>
        <h2 className='text-5xl tracking-wide font-bold uppercase'>
          Photography
        </h2>
      </div>

      <div className='container grid lg:grid-cols-3 gap-6'>
        {images.map((image, index) => (
          <div
            key={index}
            className='overflow-hidden bg-yellow-800 w-full aspect-square rounded-xl shadow-lg hover:scale-[1.05] duration-200 cursor-pointer'
          >
            <Image
              src={image.href}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className='rounded-xl'
              placeholder='blur'
              blurDataURL={image.thumbnailHref}
            />
          </div>
        ))}
      </div>

      <div className='container grid lg:grid-cols-3 gap-6'>
        <div className='bg-yellow-800 w-full aspect-square rounded-xl shadow-lg hover:scale-[1.05] duration-200' />
        <div className='bg-yellow-800 w-full aspect-square rounded-xl shadow-lg hover:scale-[1.05] duration-200' />
        <div className='bg-yellow-800 w-full aspect-square rounded-xl shadow-lg hover:scale-[1.05] duration-200' />
        <div className='bg-yellow-800 w-full aspect-square rounded-xl shadow-lg hover:scale-[1.05] duration-200' />
        <div className='bg-yellow-800 w-full aspect-square rounded-xl shadow-lg hover:scale-[1.05] duration-200' />
        <div className='bg-yellow-800 w-full aspect-square rounded-xl shadow-lg hover:scale-[1.05] duration-200' />
      </div>
    </main>
  )
}
