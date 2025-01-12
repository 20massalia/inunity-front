import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { code : string; message: string; } }) {
  redirect('/')
}