import Image from "next/image"

const Banner = ({ 
  text, 
  image 
} : { 
    text: string, 
    image: string 
  }) => {
  return (
    <div className="w-full h-full relative rounded shadow-lg overflow-hidden flex justify-center items-end group cursor-pointer">
      <div className="w-full h-full overflow-hidden">
        <Image
          src={image}
          alt={text}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="transform transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="absolute w-full h-full bg-gradient-to-t from-gray-800"></div>
      <h2 className="text-center absolute text-3xl font-bold text-white mb-12">{text}</h2>
    </div>
  )
}

export default function Home() {
  return (
    <main className="w-screen min-h-screen bg-gray-800 flex flex-col">
      <h1 className="text-white text-6xl font-bold tracking-wide text-center p-12">
        Elias Frigård
      </h1>

      <div className="container mx-auto w-3/4 h-[1px] rounded-full opacity-20 bg-white"></div>

      <div id="banners" className="container mx-auto grid grid-cols-3 gap-6 py-12 flex-grow">
        <Banner
          text="Musician / Saxophonist"
          image="https://as2.ftcdn.net/v2/jpg/00/95/43/01/1000_F_95430179_SYiE496XZYuOAICbvtCWIpkv1CNAgYmz.jpg"
        />
        <Banner
          text="Software Developer"
          image="https://www.starkcloud.com/hubfs/Futuro%20del%20Desarrollo%20de%20Software.webp"
        />
        <Banner
          text="Photographer"
          image="https://sharedmoments.com.au/wp-content/uploads/2023/09/AdobeStock_146495302-scaled.jpeg"
        />
      </div>
    </main>
  )
}
