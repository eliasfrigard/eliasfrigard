import Image from "next/image"
import Link from "next/link"
import PortfolioCard from "./components/PortfolioCard"
import MusicPlayer from "./components/MusicPlayer"
import PhotoGallery from "./components/PhotoGallery"

const Banner = ({
  text,
  link
} : {
    text: string,
    link: string // Add link prop
  }) => {
  return (
    <Link href={link} passHref>
      <h2 className="text-7xl decoration-[#ee8935] underline-offset-8 underline font-brettley duration-150 opacity-80 hover:opacity-100 cursor-pointer text-center hover:scale-[1.03] transition-transform">
        {text}
      </h2>
    </Link>
  )
}

export default function Home() {
  return (
    <main className="w-screen min-h-screen">
      <div className="container m-auto py-16 flex flex-col gap-16">
        <div className="w-full aspect-video relative mx-auto rounded-xl shadow overflow-hidden">
          <Image
            src="/elias-3.jpg"
            alt="Elias Frigård"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
        </div>

        <div className="w-full h-[2px] bg-black opacity-10" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PortfolioCard
            title="Music"
            href="/music"
            imageSrc="/elias-3.jpg"
            imageAlt="Selected Projects"
          />
          <PortfolioCard
            title="Photography"
            href="/photography"
            imageSrc="/elias-3.jpg"
            imageAlt="Selected Projects"
          />
          <PortfolioCard
            title="Software"
            href="/software"
            imageSrc="/elias-3.jpg"
            imageAlt="Selected Projects"
          />
        </div>

        <MusicPlayer />
        <PhotoGallery preview={true} />
      </div>
    </main>
  )
}
