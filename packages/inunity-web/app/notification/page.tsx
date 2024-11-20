import NotificationListContainer from "@/components/container/NotificationListContainer";
import NotificationItem from "@/components/NotificationItem";
import SafeAreaView from "@/components/SafeAreaView";
import SwipeableTabs from "@/components/SwipeableTabs";
import PostListItem from "ui/src/PostListItem";

export default function Page() {
  const boardNotiList = [
    {
        name: "김정아",
        department: "컴퓨터공학부",
        content: "ㄹㅁㄴㅇㄹ먼ㄹㄴㅁㅇ람ㄴㅇ럼니ㅏㅇ러리ㅏ",
        date: "2023-08-15",
        likes: 12,
        bookmarks: 5,
        postId: "2",
        isLiked: false,
        isBookmarked: false,
    }
  ];
  const notifications = [
    {
      id: 1,
      title: '새로운 메시지가 도착했습니다',
      content: '홍길동님이 새로운 메시지를 보냈습니다.',
      time: '방금 전',
      isRead: false,
      type: 'message'
    },
    {
      id: 2, 
      title: '시스템 업데이트 알림',
      content: '새로운 버전이 업데이트 되었습니다.',
      time: '1시간 전',
      isRead: true,
      type: 'system'
    },
    {
      id: 3,
      title: '새로운 팔로워',
      content: '김철수님이 회원님을 팔로우하기 시작했습니다.',
      time: '2시간 전',
      isRead: false,
      type: 'social'
    }
  ];

  return (
    <SafeAreaView>
      <NotificationListContainer boardNotiList={boardNotiList} systemNotiList={notifications}/>
    </SafeAreaView>
  );
}
