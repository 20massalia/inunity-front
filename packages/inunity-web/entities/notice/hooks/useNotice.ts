import { useQuery } from "@tanstack/react-query";
import NoticeDto from "../model/NoticeDto";

export default function useNotice() {
  return useQuery<NoticeDto[]>({ queryKey: ['notices'] });
}