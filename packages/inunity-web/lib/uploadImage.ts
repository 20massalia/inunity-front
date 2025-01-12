import { CustomError, ResponseWrapper } from "./fetchExtended";

/**
 * @param {string} bucketName 이미지 버킷 이름
 * @param {File} file 업로드할 파일 객체
 * @returns {Promise<string>} url
 */
export default async function uploadImage(
  bucketName: string,
  file: File
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/minio/upload?bucket=${bucketName}`,
    {
      body: formData,
      method: "POST",
      credentials: "include",
    }
  );
  const result = (await res.json()) as ResponseWrapper<string>;
  if (res.status >= 300) throw new CustomError(res.status, result.message);
  return "https://image-server.squidjiny.com" + result.data;
}
