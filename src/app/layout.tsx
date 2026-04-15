import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Proyecto Villa Real — Lotes en Coronado, Panamá | terrenosenpanama.com",
  description:
    "Venta de lotes residenciales de 1,000 m² en Las Lajas de Coronado, Panamá Oeste. A 15 minutos de la playa, infraestructura completa, facilidades de pago.",
  keywords: "terrenos panama, lotes coronado, venta lotes panama, proyecto villa real, las lajas coronado",
  openGraph: {
    title: "Proyecto Villa Real — Lotes en Coronado, Panamá",
    description: "Lotes residenciales de 1,000 m² a 15 min de la playa. Infraestructura completa y facilidades de pago.",
    type: "website",
    locale: "es_PA",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
