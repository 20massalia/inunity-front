"use client"

import { useQuery } from "@tanstack/react-query";
import PostListItem from "ui/src/PostListItem";
import useHomeViewModel from "../viewModel/HomeViewModel";
import OutlinedListItem from "ui/src/OutlinedListItem";
import { Typography } from "ui";
import Card from "ui/src/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faPerson, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";

import { useEffect } from "react";
import { useMessageManager } from "../MessageContext";
import { MessageEventType, NavigationEvent } from "message-type/message-type";



export default function HomeContainer() {
    // ViewModel 이용
    const { posts, schedules, likePost, bookmarkPost } = useHomeViewModel();
    const messageManager = useMessageManager()

    useEffect(() => {
        messageManager?.log('HomeContainer initialized!')
    }, [messageManager])

    return <div className="w-full bg-white flex-col justify-between items-start inline-flex">

        <div className="flex w-full flex-row justify-between p-5">
            title
            <div className="flex gap-3">
                <FontAwesomeIcon fontSize={24} icon={faSearch} />
                <FontAwesomeIcon fontSize={24} icon={faBell} />
                <FontAwesomeIcon fontSize={24} icon={faUser} />
            </div>
        </div>
        <div className="self-stretch grow shrink basis-0 bg-[#f8f8f8] flex-col justify-start items-start flex">
            <div className="self-stretch bg-[#f8f8f8] flex-col justify-start items-start flex">
                <div className="self-stretch  px-4 pt-6 pb-1 flex-col justify-start items-start gap-0.5 flex">
                    <div className="self-stretch text-black text-[28px] font-extrabold ">다가오는 일정</div>
                </div>
            </div>
            <div className="self-stretch pb-4 flex-col justify-start items-start gap-2 flex">
                <div className="self-stretch px-4 pt-4 justify-start items-start inline-flex">
                    <div className="grow shrink basis-0 text-black/50 text-[15px] font-extrabold  leading-tight">오늘 일정</div>
                </div>
                {
                    schedules.data?.map(schedule =>
                        <OutlinedListItem key={schedule.name} text={schedule.name} description={`${schedule.dateStart.toDateString()} - ${schedule.dateEnd?.toDateString()}`} />
                    )

                }

            </div>
            <div className="self-stretch  bg-white flex-col justify-start items-start flex">
                <div className="self-stretch px-4 pt-6 pb-1 bg-[#f8f8f8] justify-between items-end inline-flex">
                    <div className="grow shrink basis-0 text-black text-[28px] font-extrabold ">학과 공지</div>
                    <div className="justify-center items-center gap-1 flex">
                        <div className="text-right text-[#3a63ed] text-[15px] font-extrabold  leading-tight">모두 보기</div>
                    </div>
                </div>
            </div>

            <div className="self-stretch text-pri p-4 justify-start items-start gap-4 inline-flex">
                <Card />


            </div>
            <div className="self-stretch  flex-col justify-start items-start flex">
                <div className="self-stretch px-4 pt-6 pb-1 justify-between items-end inline-flex">
                    <div className="grow shrink basis-0 text-black text-[28px] font-extrabold ">인기 게시글</div>
                </div>
                {
                    posts.data?.map(post =>

                        <PostListItem
                        onClick={() => {
                            messageManager?.sendMessage(MessageEventType.Navigation, {path: '/detail'} as NavigationEvent)
                        }}
                        key={post.postId}
                            name={post.name}
                            department={post.department}
                            content={post.content}
                            date={post.date}
                            likes={post.likes}
                            bookmarks={post.bookmarks}
                            postId={post.postId}
                            toggleLike={function (postId: string): void {
                                likePost.mutate(postId)
                            }} toggleBookmark={function (postId: string): void {
                                bookmarkPost.mutate(postId)
                            }} isLiked={post.isLiked} isBookmarked={post.isBookmarked} />

                    )
                }
            </div>
        </div>
    </div>
}