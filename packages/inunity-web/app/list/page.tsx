"use client";

import { useRouter } from "next/navigation";

import { MessageEventType } from "message-type/message-type";
import { Typography, UserProfile } from "ui/components";
import { useQuery } from "@tanstack/react-query";
import PostListItem from "ui/src/PostListItem";
import { Metadata } from "next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faEdit, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import { usePlatform } from "@/hooks/usePlatform";
import { useMessageManager } from "@/components/MessageContext";

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

export default function List() {
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
    <div>
      <meta name="theme-color" content="#000000"></meta>
      <div style={{ height: "100vh", overflow: "visible" }}>
        <div className={`flex bg-white w-full  text-black ${os =='ios'  && isWebView ? 'pt-[50px]' : ''} border-b border-b-divider`}>
          <div className="px-4 py-3 flex flex-1 flex-col justify-between">
            <div className="flex flex-row justify-between items-center">
              <div className="relative">
                <div className="absolute h-full flex items-center">
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  fontSize={24}
                />
                </div>
              </div>
              <div className="relative">
                <div className="flex flex-col justify-center items-center">
                  <Typography className="text-xs font-bold">
                    컴퓨터공학부
                  </Typography>
                  <Typography variant="HeadingNormalBold">공지사항</Typography>
                </div>
              </div>
              <div className="relative">
                <div className="flex gap-3 absolute right-0 h-full items-center">
                  <FontAwesomeIcon icon={faEdit} fontSize={24} />
                  <FontAwesomeIcon icon={faSearch} fontSize={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col bg-gray-50 gap-3 h-[calc(100%-110px)] overflow-scroll">
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
      </div>
    </div>
  );
}
