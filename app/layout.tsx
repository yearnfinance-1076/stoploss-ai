import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import AppBackground from "./components/layout/AppBackground";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import "./globals.css";

const notoSans = Noto_Sans_KR({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "STOPLOSS AI — 식자재 구매·원가·손익 관리",
  description:
    "자영업 식자재 구매·원가 관리 플랫폼. AI 검색, 발주 캘린더, 가격 알림, 매출·순이익 계산, 사장님 커뮤니티를 한 번에.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#06080f] text-[#f4f6fb]">
        <AppBackground />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
