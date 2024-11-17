import AppBar from "@/components/AppBar";
import PostWriteContainer from "@/components/container/PostWriteContainer";
import Editor from "@/components/Editor";
import SafeAreaView from "@/components/SafeAreaView";
import { OutputData } from "@editorjs/editorjs";
import { faChevronLeft, faEdit, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { Typography } from "ui";

export default function Page({params}: {params: {categoryId: string}}) {
  return (
    <SafeAreaView>
      <div className="flex flex-col">
    
        <PostWriteContainer categoryId={params.categoryId}/>
      </div>
    </SafeAreaView>
  );
}
