"use client";

import { useNativeRouter } from "@/hooks/useNativeRouter";
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faBell,
  faChartSimple,
  faChevronLeft,
  faChevronRight,
  faEdit,
  faEye,
  faLock,
  faMessage,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { ScrollView, Typography } from "ui";

export default function MyPageContainer() {
  const router = useNativeRouter();

  const stats = [
    {
      label: "작성글",
      value: "32",
      icon: <FontAwesomeIcon icon={faEdit} className="w-4 h-4" />,
      link: "/my/post",
    },
    {
      label: "댓글",
      value: "128",
      icon: <FontAwesomeIcon icon={faMessage} className="w-4 h-4" />,
      link: "/my/comment",
    },
    {
      label: "조회수",
      value: "1,234",
      icon: <FontAwesomeIcon icon={faEye} className="w-4 h-4" />,
    },
  ];

  return (
    <div className="w-full h-full">
      <ScrollView className="max-w-3xl mx-auto p-4 space-y-6">
        {/* 프로필 헤더 */}
        <button className="bg-white rounded-xl p-6 shadow-sm  hover:bg-gray-100 text-left" onClick={() => router.push('/profile/my')}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <div>
                <Typography variant="HeadingNormalBold">김정아</Typography>
                <Typography
                  variant="ParagraphSmallRegular"
                  className="text-gray-600"
                >
                  정보통신공학과
                </Typography>
              </div>
            </div>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </button>

        {/* 통계 */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white p-4 rounded-xl shadow-sm"
              onClick={
                stat.link
                  ? () => {
                      router.push(stat.link);
                    }
                  : undefined
              }
            >
              <div className="flex items-center space-x-2 text-gray-600 mb-2">
                {stat.icon}
                <Typography variant="LabelSmallRegular">
                  {stat.label}
                </Typography>
              </div>
              <Typography variant="HeadingLargeBold">{stat.value}</Typography>
            </div>
          ))}
        </div>

        {/* 최근 활동 */}
        <div className="bg-white rounded-xl shadow-sm">
          <div
            className="p-4 border-b"
            onClick={() => {
              router.push("/my/post");
            }}
          >
            <Typography
              variant="HeadingSmallBold"
              className="flex items-center"
            >
              <FontAwesomeIcon icon={faChartSimple} className="w-5 h-5 mr-2" />
              최근 활동
            </Typography>
          </div>
          <div className="divide-y">
            {[
              {
                articleId: 1,
                title: "React 상태관리 관련 질문입니다",
                boardName: "질문 게시판",
                updateDt: "2시간 전",
              },
            ].map((article) => (
              <div
                className="p-4 hover:bg-gray-50"
                onClick={() => router.push(`/article/1/${article.articleId}`)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <Typography variant="ParagraphNormalBold">
                      {article.title}
                    </Typography>
                    <Typography
                      variant="LabelSmallRegular"
                      className="text-gray-600"
                    >
                      {article.boardName}
                    </Typography>
                  </div>
                  <Typography
                    variant="LabelSmallRegular"
                    className="text-gray-500"
                  >
                    {article.updateDt}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 구독 중인 게시판 */}
        <div className="bg-white rounded-xl shadow-sm">
          <div
            className="p-4 border-b"
            onClick={() => router.push("/notification/setting")}
          >
            <Typography
              variant="HeadingSmallBold"
              className="flex items-center"
            >
              <FontAwesomeIcon icon={faBell} className="w-5 h-5 mr-2" />
              구독 중인 게시판
            </Typography>
          </div>
          <div className="divide-y">
            {[{ name: "학과 공지사항", id: 1 }].map((category) => (
              <div
                className="p-4 flex items-center justify-between hover:bg-gray-50"
                onClick={() => router.push(`/article/${category.id}`)}
              >
                <Typography variant="ParagraphNormalBold">
                  {category.name}
                </Typography>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="w-5 h-5 text-gray-400"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <button className="bg-white p-6 rounded-xl shadow-sm hover:bg-gray-50 flex items-center justify-between group">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200">
                <FontAwesomeIcon
                  icon={faLock}
                  className="w-6 h-6 text-purple-600"
                />
              </div>
              <div className="text-left">
                <Typography variant="HeadingSmallBold">
                  개인정보 설정
                </Typography>
                <Typography
                  variant="ParagraphSmallRegular"
                  className="text-gray-600"
                >
                  계정 보안, 비밀번호 변경
                </Typography>
              </div>
            </div>
            <FontAwesomeIcon
              icon={faChevronRight}
              className="w-5 h-5 text-gray-400"
            />
          </button>

          <button className="bg-white p-6 rounded-xl shadow-sm hover:bg-gray-50 flex items-center justify-between group">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200">
                <FontAwesomeIcon
                  icon={faUser}
                  className="w-6 h-6 text-green-600"
                />
              </div>
              <div className="text-left">
                <Typography variant="HeadingSmallBold">
                  프로필 공개 설정
                </Typography>
                <Typography
                  variant="ParagraphSmallRegular"
                  className="text-gray-600"
                >
                  프로필 공개 범위 및 정보 설정
                </Typography>
              </div>
            </div>
            <FontAwesomeIcon
              icon={faChevronRight}
              className="w-5 h-5 text-gray-400"
            />
          </button>
        </div>
      </ScrollView>
    </div>
  );
}
