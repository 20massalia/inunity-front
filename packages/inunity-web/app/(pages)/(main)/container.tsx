"use client";

import { useQuery } from "@tanstack/react-query";
import OutlinedListItem from "ui/src/OutlinedListItem";
import { Card, ScrollView, Typography, useMenu } from "ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faEdit,
  faPerson,
  faSearch,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { useEffect } from "react";
import { useMessageManager } from "../../../shared/ui/MessageContext";
import { useNativeRouter } from "@/hooks/useNativeRouter";
import AppBar from "../../../widgets/AppBar";
import NoticeCard from "@/features/notice/ui/NoticeCard";
import useHomeViewModel from "../../../features/home/useHomeViewModel";
import ToggleLikeIcon from "@/features/board/ui/\bToggleLike/ToggleLikeIcon";
import ToggleBoomarkIcon from "@/features/board/ui/ToggleBookmark/ToggleBookmarkIcon";
import ArticleCard from "@/entities/article/ui/ArticleCard";
import Slider, { Settings } from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner from "@/app/testbanner.png";
import banner2 from "@/app/banner2.jpg";
import banner3 from "@/app/banner3.jpg";
import logo from "@/app/inunity.png";
import computer from "@/assets/image/computer.png";
import embedded from "@/assets/image/embedded.png";
import network from "@/assets/image/network.png";
import technology from "@/assets/image/technology.png";
import recruitment from "@/assets/image/recruitment.png";
import freeBoard from "@/assets/image/free-board.png";
import jobReview from "@/assets/image/job-review.png";
import qna from "@/assets/image/qna.png";
import { DropdownMenu } from "ui/src/DropdownMenu";
import ArticleListDropdownMenu from "@/features/board/ui/ArticleListMenu/ArticleListDropdownMenu";
import useCategories from "@/entities/category/hooks/useCategories";

export default function HomeContainer() {
  // ViewModel 이용
  const {
    articles,
    notices,
    notifications: { length },
  } = useHomeViewModel();
  const { messageManager } = useMessageManager();
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    arrows: false,
  };

  useEffect(() => {
    messageManager?.log("HomeContainer initialized!");
  }, [messageManager]);

  const router = useNativeRouter();
  const user = {
    userId: 1,
  };

  const categoryQuery = useCategories();

  return (
    <>
      <AppBar
        leftIcon={
          <div className="flex flex-row gap-2 items-center">
            <Image src={logo} alt="inunity" width={32} height={32}></Image>
            <Typography variant="HeadingNormalBold">INUnity</Typography>
          </div>
        }
        rightIcon={
          <div className="flex gap-3">
            <FontAwesomeIcon fontSize={24} icon={faSearch} />
            <div
              className="relative"
              onClick={() => router.push("/notification")}
            >
              <FontAwesomeIcon fontSize={24} icon={faBell} />
              {(length ?? 0) > 0 && (
                <div className=" absolute -bottom-2 -right-2 w-5 h-5 bg-red-600 rounded-full flex justify-center items-center ">
                  <Typography
                    className="text-white"
                    variant="ParagraphNormalBold"
                  >
                    {length}
                  </Typography>
                </div>
              )}
            </div>
            <FontAwesomeIcon fontSize={24} icon={faUser} />
          </div>
        }
      />
      <ScrollView className="bg-[#f8f8f8]  justify-start items-start flex ">
        <Slider {...settings} className="w-full mb-5">
          {[banner, banner2, banner3].map((banner, idx) => (
            <div key={idx} className="pt-5 px-2">
              <Image
                src={banner}
                alt=""
                className="rounded-xl object-cover h-[200px] w-full"
                height={200}
              ></Image>
            </div>
          ))}
        </Slider>
        <div className="flex flex-row flex-wrap p-3 justify-center items-center gap-1 gap-y-4">
          {[
            {
              label: "컴퓨터공학부",
              image: computer,
              link: "/article/1",
            },
            {
              label: "임베디드시스템공학과",
              image: embedded,
              link: "/article/2",
            },
            {
              label: "정보통신공학과",
              image: network,
              link: "/article/3",
            },
            {
              label: "정보기술대학",
              image: technology,
              link: "/article/4",
            },
            {
              label: "자유게시판",
              image: freeBoard,
              link: "/article/5",
            },
            {
              label: "모집게시판",
              image: recruitment,
              link: "/article/6",
            },
            {
              label: "질문게시판",
              image: qna,
              link: "/article/7",
            },
            {
              label: "취업후기",
              image: jobReview,
              link: "/article/8",
            },
          ].map((item) => (
            <div
              className="flex flex-col items-center justify-center text-center w-24 gap-4"
              key={item.label}
              onClick={() => router.push(item.link)}
            >
              <Image src={item.image} alt="link image" width={60} height={60} />
              {item.label}
            </div>
          ))}
        </div>
        <div className="self-stretch px-4 pt-6 pb-1 bg-[#f8f8f8] justify-between items-end inline-flex">
          <Typography variant="HeadingXLargeBold">학과 공지</Typography>
          <Typography variant="ParagraphNormalBold" className="text-primary">
            모두 보기
          </Typography>
        </div>
        <div className="text-pri p-4  w-full ">
          <div className=" justify-start items-start gap-4 flex overflow-x-scroll">
            {notices.data?.pages
              .flatMap((page) => page.content)
              .map((notice) => (
                <div key={notice.articleId} className="flex-none">
                  <NoticeCard {...notice} />
                </div>
              ))}
          </div>
        </div>
        <div className="self-stretch  flex-col justify-start items-start flex">
          <Typography variant="HeadingXLargeBold" className="px-4">
            인기 게시글
          </Typography>
          {articles.data?.content.map((article) => (
            <ArticleCard
              {...article}
              key={article.articleId}
              bottomFeatureSlot={
                <>
                  <ToggleLikeIcon article={article} />
                  <ToggleBoomarkIcon article={article} />
                </>
              }
              actions={<ArticleListDropdownMenu article={article} />}
            />
          ))}
        </div>
      </ScrollView>
    </>
  );
}
