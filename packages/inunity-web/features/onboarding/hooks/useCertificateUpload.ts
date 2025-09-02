"use client";
import { useMutation } from "@tanstack/react-query";
import { uploadCertificate } from "../api/onboarding.api";

export default function useCertificateUpload(onSuccess?: () => void) {
  return useMutation({
    mutationFn: uploadCertificate,
    onSuccess: () => onSuccess?.(),
  });
}
