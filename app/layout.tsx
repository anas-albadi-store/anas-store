import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({ subsets: ["arabic", "latin"] });

export const metadata: Metadata = {
  title: "ANAS ALBADI STORE | متجر أنس البادي",
  description: "متجرك الأول للمنتجات الرقمية، الألعاب، والاشتراكات المميزة.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.className} bg-brand-dark text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
