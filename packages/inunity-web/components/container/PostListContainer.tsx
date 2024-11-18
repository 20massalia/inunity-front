"use client";

import { usePlatform } from "@/hooks/usePlatform";
import {
  faChevronLeft,
  faEdit,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { MessageEventType } from "message-type/message-type";
import router, { useRouter } from "next/navigation";
import { Typography } from "ui";
import PostListItem from "ui/src/PostListItem";
import { useMessageManager } from "../MessageContext";
import AppBar from "../AppBar";

export const fetchList = async () => {
  return [
    {
      author: "학과사무실",
      authorOrg: "컴퓨터공학부",
      isVerified: true,
      content:
        "2024학년도 2학기 수강신청 포기제도를 아래와 같이 안내하오니 기간 내에 신청하시기 바랍니다.",
      date: "2024. 10. 07",
      comments: 85,
      likes: 1279,
    },
    {
      author: "학과사무실",
      authorOrg: "컴퓨터공학부",
      isVerified: true,
      content:
        "2024학년도 2학기 수강신청 포기제도를 아래와 같이 안내하오니 기간 내에 신청하시기 바랍니다.",
      date: "2024. 10. 07",
      comments: 85,
      likes: 1279,
    },
    {
      author: "학과사무실",
      authorOrg: "컴퓨터공학부",
      isVerified: true,
      content:
        "2024학년도 2학기 수강신청 포기제도를 아래와 같이 안내하오니 기간 내에 신청하시기 바랍니다.",
      date: "2024. 10. 07",
      comments: 85,
      likes: 1279,
    },
    {
      author: "학과사무실",
      authorOrg: "컴퓨터공학부",
      isVerified: true,
      content:
        "2024학년도 2학기 수강신청 포기제도를 아래와 같이 안내하오니 기간 내에 신청하시기 바랍니다.",
      date: "2024. 10. 07",
      comments: 85,
      likes: 1279,
    },
    {
      author: "학과사무실",
      authorOrg: "컴퓨터공학부",
      isVerified: true,
      content:
        "2024학년도 2학기 수강신청 포기제도를 아래와 같이 안내하오니 기간 내에 신청하시기 바랍니다.",
      date: "2024. 10. 07",
      comments: 85,
      likes: 1279,
    },
    {
      author: "학과사무실",
      authorOrg: "컴퓨터공학부",
      isVerified: true,
      content:
        "2024학년도 2학기 수강신청 포기제도를 아래와 같이 안내하오니 기간 내에 신청하시기 바랍니다.",
      date: "2024. 10. 07",
      comments: 85,
      likes: 1279,
    },
    {
      author: "학과사무실",
      authorOrg: "컴퓨터공학부",
      isVerified: true,
      content:
        "2024학년도 2학기 수강신청 포기제도를 아래와 같이 안내하오니 기간 내에 신청하시기 바랍니다.",
      date: "2024. 10. 07",
      comments: 85,
      likes: 1279,
    },
  ];
};

type Post = {
  author: string;
  authorOrg: string;
  content: string;
  date: string;
  likes: number;
  comments: number;
};

export default function PostListContainer({categoryId}: {categoryId: string}) {
  const router = useRouter();

  const messageManager = useMessageManager();

  const { data, isLoading } = useQuery({
    queryKey: ["list"],
    queryFn: () =>
      fetchList().then(async (res) => {
        return (await res) as Post[];
      }),
  });
  const { isWebView, os } = usePlatform();

  return (
    <>
      <AppBar
        title={
          <>
            <Typography className="text-xs font-bold">컴퓨터공학부</Typography>
            <Typography variant="HeadingNormalBold">공지사항</Typography>
          </>
        }
        leftIcon={<FontAwesomeIcon icon={faChevronLeft} fontSize={24} onClick={router.back} />}
        rightIcon={
          <>
            <FontAwesomeIcon icon={faEdit} fontSize={24} onClick={() => router.push(`/post/${categoryId}/write`)}/>
            <FontAwesomeIcon icon={faSearch} fontSize={24} onClick={() => router.push(`/post/${categoryId}/search`)} />
          </>
        }
      />
      
      <div className="flex flex-col bg-gray-50 gap-3  overflow-scroll">
        {!isLoading &&
          data?.map((item) => (
            <div
              key={item.content}
              className=" "
              onClick={() => {
                if (isWebView)
                  messageManager?.messageManager?.sendMessage(
                    MessageEventType.Navigation,
                    { path: `/post/1/1` }
                  );
                else router.push("/post/1/1");
              }}
            >
              <PostListItem
                name={item.author}
                department={item.authorOrg}
                content={item.content}
                date={item.date}
                likes={item.likes}
                bookmarks={item.comments}
                postId={""}
                toggleLike={function (postId: string): void {
                  throw new Error("Function not implemented.");
                }}
                toggleBookmark={function (postId: string): void {
                  throw new Error("Function not implemented.");
                }}
                isLiked={false}
                isBookmarked={false}
              />
            </div>
          ))}
      </div>
    </>
  );
}
