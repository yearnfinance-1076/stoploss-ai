export const NAV_ITEMS = [
  { label: "홈", href: "/" },
  { label: "AI 검색엔진", href: "/ai-search" },
  { label: "발주 캘린더", href: "/order-calendar" },
  { label: "마이페이지", href: "/mypage" },
  { label: "손익 계산기", href: "/profit-calculator" },
  { label: "커뮤니티", href: "/community" },
] as const;

export const FEATURE_CARDS = [
  {
    href: "/ai-search",
    title: "AI 검색엔진",
    description:
      "식자재명이나 조건을 입력하면 AI가 용도·가격·대체상품을 분석해 추천합니다.",
    badge: "핵심 기능",
    icon: "search",
  },
  {
    href: "/order-calendar",
    title: "발주 캘린더",
    description:
      "날짜별 발주 내역을 캘린더로 기록하고, 주문 내역을 한 번에 확인합니다.",
    badge: "발주 관리",
    icon: "calendar",
  },
  {
    href: "/mypage",
    title: "마이페이지",
    description:
      "구독 요금제, 크레딧, 검색 횟수, 결제 내역을 관리합니다.",
    badge: "계정",
    icon: "user",
  },
  {
    href: "/profit-calculator",
    title: "매출·순이익 계산기",
    description:
      "월 매출·식자재비·고정비로 예상 세전·세후 순이익과 원가율을 계산합니다.",
    badge: "손익 분석",
    icon: "chart",
  },
  {
    href: "/community",
    title: "사장님 커뮤니티",
    description:
      "식자재 시세, 거래처 후기, 원가 절감 팁을 사장님들과 공유합니다.",
    badge: "커뮤니티",
    icon: "community",
  },
] as const;
