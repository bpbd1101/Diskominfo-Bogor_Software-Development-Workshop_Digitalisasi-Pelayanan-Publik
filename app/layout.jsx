import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin LOGIN AJA",
  description: "Sistem Layanan Publik BPBD Bogor",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="D:\Boilerplate Github\Diskominfo-Bogor_Software-Development-Workshop_Digitalisasi-Pelayanan-Publik\app\public\Lambang_Kabupaten_Bogor.ico" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
