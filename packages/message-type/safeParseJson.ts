
// 타입 안전한 JSON 파싱 함수
export default function safeJsonParse<T>(json: string): T | null {
  try {
    const parsed = JSON.parse(json);
    return parsed as T;
  } catch (error) {
    console.error("JSON 파싱 오류:", error);
    return null;
  }
}