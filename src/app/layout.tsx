import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono, Archivo_Black } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AuthorSignature } from "@/components/layout/AuthorSignature";
import { MeshBackground } from "@/components/ui/MeshBackground";
import { ProgressProvider } from "@/lib/progress";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: ["400"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Helios Aerodesign — Manual de Fabricación e Incorporación",
    template: "%s · Helios Aerodesign",
  },
  description:
    "Manual técnico interno de Helios Aerodesign: incorporación de nuevos integrantes y referencia completa de fabricación de aeromodelos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${archivoBlack.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-void text-ink">
        <MeshBackground className="fixed inset-0" />
        <AuthorSignature />
        <ProgressProvider>
          <div className="relative z-10 flex min-h-full flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ProgressProvider>
      </body>
    </html>
  );
}
