import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_KR({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "STOPLOSS AI — 원재료 발주·손익 분석 플랫폼",
  description:
    "카페·베이커리를 위한 B2B 원재료 소싱 및 원가 관리. AI 최저가 검색, 발주 기록, 월별 원가율·세전/세후 이익 분석.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSans.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
