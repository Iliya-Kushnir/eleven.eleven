import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApolloProviderWrapper from "@/components/ApolloProviderWrapper/ApolloProviderWrapper";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

console.log("Shopify domain:", process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN);
console.log("Shopify token:", process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN?.substring(0,5) + "...");



export const metadata: Metadata = {
  title: {
    default: "eleven:eleven",
    template: "%s - Our Greate Brand"
  },
  icons: {
    icon: '/icon.png', // Путь к файлу в папке /public
  },
  description: "Стильный бренд одягу з України. Худі, футболки, штани та аксесуари у стилі streetwear. Нова колекція вже доступна — замовляй зараз!",
  twitter: {
    card: "summary_large_image"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <CartProvider>
          
            <ApolloProviderWrapper >
              <Header />
              {children}
              <ToastContainer position="top-right" autoClose={3000} />
              <Footer />
            </ApolloProviderWrapper>
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
