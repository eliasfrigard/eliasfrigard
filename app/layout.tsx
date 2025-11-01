import type { Metadata } from "next";
import { Inter, Playpen_Sans } from "next/font/google";
import localFont from "next/font/local";
import './globals.css';
import Header from "./components/Header";

// Define fonts with subsets and weights
const inter = Inter({ subsets: ["latin"] });
const pacifico = Playpen_Sans({ weight: "400", subsets: ["latin"], variable: "--font-pacifico" });

const brettley = localFont({
  src: "../fonts/BrotherSignature-7BWnK.otf",
  variable: "--font-brettley",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${brettley.className}`}>
      <body className={`${inter.className} ${pacifico.variable} ${brettley.variable}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
