import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 1. Importamos os componentes da nossa aplicação
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";

// 2. Mantemos a configuração de fontes que o Next.js criou
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 3. Podemos customizar os metadados
export const metadata: Metadata = {
  title: "CanesGril",
  description: "Seu planejador de churrasco online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      {/* O body terá a cor de fundo mais escura de todas */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-900`}>
        <AuthProvider>
          <Header />
          {/* A tag <main> agora tem a cor de fundo principal definida no globals.css */}
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}