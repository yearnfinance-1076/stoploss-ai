import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const SYSTEM_PROMPT = `너는 자영업자 식자재 구매 상담 AI다.
사용자의 업종(카페, 베이커리, 음식점, 디저트샵 등)에 맞춰
필요한 식자재를 추천하고,
가성비, 품질, 용량, 용도까지 고려해서 구매 상담을 해준다.
사용자가 '최저가', '합리적인 가격', '대체 상품'을 원하면 그 조건에 맞춰 추천한다.
답변은 실무적이고 간결하게 한다.`;

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY가 설정되지 않았습니다." },
        { status: 500 },
      );
    }

    let body: { message?: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "요청 본문이 올바른 JSON이 아닙니다." },
        { status: 400 },
      );
    }

    const message = body.message?.trim();
    if (!message) {
      return NextResponse.json(
        { error: "message는 필수입니다." },
        { status: 400 },
      );
    }

    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
      temperature: 0.7,
      max_tokens: 1024,
    });

    const response = completion.choices[0]?.message?.content?.trim();
    if (!response) {
      return NextResponse.json(
        { error: "AI 응답을 생성하지 못했습니다." },
        { status: 502 },
      );
    }

    return NextResponse.json({ response });
  } catch (error) {
    console.error("[/api/chat]", error);

    const message =
      error instanceof OpenAI.APIError
        ? error.message
        : error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
