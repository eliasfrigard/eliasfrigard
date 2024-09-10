import Image from "next/image"
import Link from "next/link"

const Banner = ({ 
  text, 
  image, 
  link 
} : { 
    text: string, 
    image: string,
    link: string // Add link prop
  }) => {
  return (
    <Link href={link} passHref>
      <div className="w-full h-full relative rounded-xl shadow-lg overflow-hidden flex justify-center items-end group cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
        <div className="w-full h-full overflow-hidden rounded-xl">
          <Image
            src={image}
            alt={text}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
        </div>
        {/* Gradient overlay appears on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300 ease-in-out"></div>
        {/* Text appears on hover */}
        <h2 className="text-center absolute bottom-8 text-2xl font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out tracking-wide border-b p-2">
          {text}
        </h2>
      </div>
    </Link>
  )
}

export default function Home() {
  return (
    <main className="w-screen min-h-screen bg-gradient-to-t from-gray-900 to-gray-800 flex flex-col py-16 gap-12">
      <h1 className="uppercase text-white text-6xl font-bold tracking-wide text-center">
        Elias Frigård
      </h1>

      <div className="container mx-auto w-2/3 h-[1px] rounded-full opacity-10 bg-white"></div>

      <div id="banners" className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow">
        <Banner
          text="Musician / Saxophonist"
          image="https://scontent-hel3-1.xx.fbcdn.net/v/t31.18172-8/15138344_10154377305443451_5118147056100221739_o.jpg?_nc_cat=105&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=SB7pQABFPNQQ7kNvgEoqxEM&_nc_ht=scontent-hel3-1.xx&_nc_gid=AZZKNgAySjy-odCTXhD5DLb&oh=00_AYDq-Y3ujvXGjH6cFCqbPTaYz-GbAf8nI1Vqul_cYrT17w&oe=6707AE75"
          link="/music" // Specify the link for this banner
        />
        <Banner
          text="Software Developer"
          image="https://www.starkcloud.com/hubfs/Futuro%20del%20Desarrollo%20de%20Software.webp"
          link="/software"
        />
        <Banner
          text="Photographer"
          image="https://sharedmoments.com.au/wp-content/uploads/2023/09/AdobeStock_146495302-scaled.jpeg"
          link="/photography" // Specify the link for this banner
        />
      </div>
    </main>
  )
}
