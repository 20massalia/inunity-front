export default function safeJsonParse<T>(json: string): T | null {
  if (typeof json !== 'string') {
    console.error("입력이 문자열이 아닙니다:", typeof json);
    return null;
  }
  try {
    const parsed = JSON.parse(json);
    if (typeof parsed === 'string') {
      console.log("파싱 결과가 여전히 문자열입니다. 중첩된 JSON 문자열일 수 있습니다.");
      return safeJsonParse<T>(parsed);
    }
    return parsed as T;
  } catch (error) {
    console.error("JSON 파싱 오류:", error);
    return null;
  }
}
