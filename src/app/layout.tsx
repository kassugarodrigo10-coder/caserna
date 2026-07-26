import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { AppStateProvider } from "@/context/AppStateContext";
import { AuthProvider } from "@/context/AuthProvider";
import Shell from "@/components/Shell";

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Caserna Kart Racing",
  description: "Campeonato Caserna Kart Racing — Painel, Classificação, Estatísticas e Camisa Branca.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${barlow.variable} ${inter.variable}`}>
      <body>
        <AuthProvider>
          <AppStateProvider>
            <Shell>{children}</Shell>
          </AppStateProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
