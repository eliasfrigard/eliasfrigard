import Image from 'next/image';
import Link from 'next/link';

interface PortfolioCardProps {
  title: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
}

export default function PortfolioCard({ title, href, imageSrc, imageAlt }: PortfolioCardProps) {
  return (
    <Link
      href={href}
      className="relative aspect-[3/2] rounded-xl overflow-hidden cursor-pointer transition-all duration-[400ms] ease-out shadow-lg hover:translate-y-[-12px] hover:shadow-2xl group will-change-transform"
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50 transition-all duration-400 group-hover:from-black/10 group-hover:to-black/40" />

      <div className="relative z-10 h-full flex items-end justify-between p-10">
        <h2 className="text-6xl text-white font-brettley decoration-[#ee8935] underline-offset-[10px] underline">
          {title}
        </h2>
        <div className="text-[42px] text-white transition-transform duration-400 group-hover:translate-x-2">
          →
        </div>
      </div>
    </Link>
  );
};
