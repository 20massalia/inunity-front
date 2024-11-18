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
  const systemNotiList = [
    {
        id: 0,
        title: '공지사항',
        content: '(대충 메가폰을 들고) 공지사항입니다',
        date: '2024-11-18 12:41',
        read: false
    }
  ];
  return (
    <>
      <SwipeableTabs
        tabs={[
          {
            id: 0,
            title: "게시판",
            content: boardNotiList.map(noti => <PostListItem key={noti.name} {...noti}/>),
          },
          {
            id: 1,
            title: "시스템",
            content: systemNotiList.map(noti => <PostListItem key={noti.id} name="시스템" department="" content={`${noti.title}\n${noti.content}`} date={noti.date} postId={noti.id.toString()}/>),
          },
        
        ]}
      ></SwipeableTabs>
    </>
  );
}
