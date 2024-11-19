import AppBar from "@/components/AppBar";
import PostDetailContainer from "@/components/container/PostDetailContainer";
import SafeAreaView from "@/components/SafeAreaView";
import { faChevronLeft, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Typography, useMenu } from "ui";

export default function Page({ params }: { params: { categoryId: string, postId: string, } }) {

  return <SafeAreaView>
    <PostDetailContainer {...params}/>
  </SafeAreaView>
}