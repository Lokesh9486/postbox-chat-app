"use client";
// import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "@/services/store";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      {/* <body className={inter.className}> */}
        <Providers>
        {children}
        </Providers>
      </body>
    </html>
  );
}
